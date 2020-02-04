var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#ababab',
    parent: 'phaser',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//var globales
var game = new Phaser.Game(config);

/*To-DO
- créer class accident pour gérer tout les accidents et les pannes
*/


class Cadre {
    constructor(x, y, width, height, topleft=0, topright=0, botleft=0, botright=0, alpha=0.8, depth=0){
        this.graphics = scene.add.graphics();
        this.graphics.setScrollFactor(0);
        this.graphics.depth = 990 + depth;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.nbIcones = 0
     
        this.graphics.lineStyle(2, 0xffff00, 1);
        this.graphics.fillStyle(0xC4C4C4, alpha)
     
        this.graphics.fillRoundedRect(x+5, y+5, width-10, height-10, { tl: topleft, tr: topright, bl: botleft, br: botright });
        this.graphics.strokeRoundedRect(x+5, y+5, width-10, height-10, { tl: topleft, tr: topright, bl: botleft, br: botright });
        

        //  Using an object to define a different radius per corner
    }
}
class Icone {
    constructor(img, positionx, positiony){
        this.image = scene.add.image(positionx,positiony, img);
        this.image.setScale(0.07)
        this.image.setScrollFactor(0);
        this.image.depth = 1000;
    }
    barre_progression(pourcentage){
        if(this.progressBar == undefined || this.progressBox == undefined){
            this.progressBar = scene.add.graphics();
            this.progressBox = scene.add.graphics();
            this.progressBar.setScrollFactor(0);
            this.progressBox.setScrollFactor(0);
            this.progressBar.depth = 1000;
            this.progressBox.depth = 1000;
            
            this.progressBox.lineStyle(2, 0xFFFAFA, 1);
            this.progressBox.strokeRect(this.image.x+30, this.image.y - 10, 100, 20);
        }
        if(pourcentage!=undefined){
            this.progressBar.clear();
            this.progressBar.fillStyle(0xFFFF00, 1);
            this.progressBar.fillRect(this.image.x+35, this.image.y - 5, 90 * pourcentage, 10);
        }
    }
    barre_nombre(nb, unite){
        if(this.numberBox == undefined){
            this.numberBox = scene.add.graphics();
            this.numberBox.depth = 1000;
            this.numberBox.setScrollFactor(0);
            
            this.numberBox.lineStyle(2, 0xFFFAFA, 1);
            this.numberBox.strokeRect(this.image.x+30, this.image.y - 10, 100, 20);
        }
        if(unite==undefined){
            this.texte = scene.add.text(this.image.x+35, this.image.y - 10, nb.toString(), { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
        }
        else {
            this.texte = scene.add.text(this.image.x+35, this.image.y - 10, nb.toString()+" "+unite, { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
        }
        this.texte.depth = 1000;
        this.texte.setScrollFactor(0);
    }
    nombre(nb, unite){
        if(unite==undefined){
            this.texte = scene.add.text(this.image.x+35, this.image.y - 15, nb.toString(), { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 30 });
        }
        else {
            this.texte = scene.add.text(this.image.x+35, this.image.y - 15, nb.toString()+" "+unite, { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 30 });
        }
        this.texte.setScrollFactor(0);
        this.texte.depth = 1000;
    }
}






function proba(probabi){
    if((rand()%101)<probabi*100){
        return 1;
    }
    else return 0;
}
class Jeu{
    constructor(){
        //affichage developpeur a faire

        this.uptimeMax = 30;//passer en constante ? faire varier +1 / -1 ?

        let Choix;
        Choix["solde"]=0; // taxes etc
        Choix["norme"].pollution = -1;
        Choix["norme"].dechets = -1;
        Choix["norme"].production = -1;
        Choix["avantages"] = 0;//0-1
        Choix["securite"].Employe = 1;//0.5-1.5
        Choix["securite"].Robot = 1;//0.5-1.5

        this.Eco = new Ecologie();
        this.Empreinte = new Ecologie();
        this.Eco.pollution = 0;
        this.Eco.dechets = 0;
        this.Empreinte.pollution = 0;
        this.Empreinte.dechets = 0;

        this.CentraleNucleaire = new Fournisseur();
        this.CentraleNucleaire.prix = 2;
        this.CentraleNucleaire.pollution = 6;
        this.CentraleNucleaire.coupure = 0.02;//retirer la variable ?
        this.CentraleNucleaire.uptime = (1-this.CentraleNucleaire.coupure)*uptimeMax; // en prenant 30 comme max uptimeNRJ
        //Uptime random a faire ..

        this.GenerateurPetrole = new Fournisseur();
        this.GenerateurPetrole.prix = 8;
        this.GenerateurPetrole.pollution = 15;
        this.GenerateurPetrole.coupure = 0.08;
        this.GenerateurPetrole.uptime = (1-this.GenerateurPetrole.coupure)*uptimeMax; // en prenant 30 comme max uptimeNRJ

        this.Courant = new Energie();
        this.Courant.Principal = this.CentraleNucleaire;
        this.Courant.Auxilliaire = this.GenerateurPetrole;

        let solde = 1000000;
        this.salaire = 1500;
        this.nbEmployes = 15;
        this.nbRobots = 0;

        this.Lignes = [];
        this.Lignes.push(new Ligne()); // une ligne par défault

        // a voir
        // Séparer la génération de l'uptime en 30 étapes de calcul proba ou multiplier le pourcentage par l'uptime max
    }

    Update_Jour(j){
        this.add_ouvriers(this.nbEmployes, this.nbRobots);
        this.retirer_employe();
        this.consommation();
        this.Update_Lignes();
        this.empreinte()
    }

    Update_Tour(){
    //Calcul uptimeNRJ, retirer uptime de fournisseur?
    uptimeNRJ = this.Courant.Principal.uptime + ((uptimeMax - this.Courant.Principal.uptime)*(1-this.Courant.Auxilliaire.coupure));
    

    solde += Choix["solde"]/* + Ventes .. */ - (this.solde_NRJ1() + this.solde_NRJ2() + this.solde_salaires());
    }

    add_ouvriers(nbEmployes, nbRobots){
        let tmp_Employe = nbEmployes;
        let tmp_Robots = nbRobots;
        if(this.Lignes.size()*5<nbEmployes+nbRobots) {
            while(tmp_Employe+tmp_Robots>0) for(let i=0; i<this.Lignes.size(); i++){
                this.add_ouvrier(tmp_Employe, tmp_Robots, this.Lignes[i]);
            }
        }
        else {
            let i = 0;
            while(tmp_Employe+tmp_Robots>0) {
                for(let j=0; j<5; j++) this.add_ouvrier(tmp_Employe, tmp_Robots, this.Lignes[i]);
                if(tmp_Employe+tmp_Robots>=5) i++;
                if(i==this.Lignes.size()) i=0; // on met une sécurité pour reboucler au cas ou
            }
        }        
    }
    add_ouvrier(tmp_Employe, tmp_Robots, l){
        if(tmp_Robots>0){
            tmp_Robots--;
            l.Add(0, 1);
        }else if(tmp_Employe>0){
            tmp_Employe--;
            l.Add(1, 0);
        }   
    }
    solde_salaires(){
        return (salaire*nbEmployes);
    }
    Update_Lignes(){
        for(let i=0; i<this.Lignes.size(); i++) this.Lignes.Update(uptimeNRJ);
    }
    consommation(){
        this.consommationNRJ = 0;
        for(let i=0; i<this.Lignes.size(); i++) this.consommationNRJ += Lignes[i].getEnergy();
    }
    solde_NRJ1(){
        return this.consomationNRJ * this.Courant.Principal.uptime*(100/this.uptimeMax)*this.Courant.Principal.prix;
    }
    solde_NRJ2(){
        return ((uptimeMax - this.Courant.Principal.uptime)*(100/this.uptimeMax)*this.consomationNRJ*(1-this.Courant.Auxilliaire.coupure)*this.Courant.Auxilliaire.prix);
    }
    empreinte(){
        this.Eco.pollution = 0;
        this.Eco.dechets = 0;
        for(let i=0; i<this.Lignes.size(); i++){
            this.Eco.pollution += this.Lignes[i].pollution;
            this.Eco.dechets += this.Lignes[i].dechets;
        }
        this.Empreinte.pollution += this.Eco.pollution;
        this.Empreinte.dechets += this.Eco.dechets;
    }
}
class Ligne {
    constructor(){
        //Composants de la machine
        uptimeNRJ = 30; // 30/30 jours
        this.Composant = [];
        this.Composant.push(new Composant());
        this.coutReparation = 8000; // cout de réparation fixe
        this.boolpanne = false; // possibilité de réparer par probabilité sinon fin de la machine
    }
        //consomation minimale possible par défault
        //this.consomationNRJ = this.Composant[i].consomationNRJ*5*uptimeNRJ// a mettre dans les updates getEnergyDemander(uptimeNRJ); // 0 par defaut, utiliser getenergy
        //this.Normes // Varie les limites de production par rapport aux déchets produits + pollution, var globale ?
        //this.uptimeNRJ //(Principal + Auxilliaire), varie la production et donc tout le reste

        //Apparition random fixe a la machine

        // On récupère les infos des composants et on rajoute les infos exterieures
        //this.dechets
        //this.production  
        //this.pollution  
        //this.accident // probabilité d'avoir un accident sur cette machine

        // probabilité d'avoir un accident a faire, varie avec les choix sécurité 
        // et par rapport au type de machine et directives

    //méthode de génération des (déchets + production + pollution) sur le tour prennant en compte 
    //l'uptime, les employés et leurs accidents et les normes
    //Utilisation de la probablité de panne pour générer la possibilité de réparer ou suppression

    getEnergy(){
        let tmpNRJ = 0;
        for(let i=0; i<5; i++) tmpNRJ += this.Composant[i].consomationNRJ * (this.Composant[i].nbEmployes + (2*this.Composant[i].nbRobots));
        return tmpNRJ;
    }
    Add(Employes, Robots){
        let tmp;
        let i=0;
        if(Employes==1) tmp = 0;
        if(Robots==1) tmp = 1;
        while(tmp!=-1){
            this.Add_switch(tmp, i);
            if(i<5) i++;
            else console.log("Error Add Composant Ligne"); return; // error pas d'emplacement trouver
        }
    }
    
    Update(uptimeNRJ){
        //On enregistre des valeurs en tmp
        let tmp_Uptime = uptimeNRJ;
        //let tmp_accident = this.accident; si besoin de rajouter des evenements en fonction du nombre d'accident par mois
        // On initialise les valeurs de stockage
        this.marche = true;
        this.boolaccident = false;
        this.accident=0;
        this.dechets=0;
        this.production=0;
        this.pollution=0;
            for(let i=0; i<5; i++){
                // Utilisation d'une fonction avec variables globales a faire
                if(Composant[i].auto){
                    tmp_Uptime = this.accident_switch(Composant[i], tmp_Uptime, Composant[i].accident * 4);
                    if(!boolpanne&&!boolaccident){
                        this.production += Composant[i].production_auto();
                        this.dechets += Composant[i].dechets_auto();
                        this.pollution += Composant[i].pollution_auto();
                    }else if(boolaccident) boolaccident = false;// on réactive la production après l'accident, 
                                                                 //demander une action humaine si auto ?                   }

                }
                else{
                    if(Composant[i].nbRobots+Composant[i].nbEmployes == 0) this.marche = false;
                    else{
                        tmp_Uptime = this.accident_switch(Composant[i], tmp_Uptime, (Composant[i].accident *(Composant[i].nbEmployes + (2*Composant[i].nbRobots))));
                        if(!boolpanne&&!boolaccident){
                            let qualTravail = this.cadence_travail(Composant[i]); // on recalcule si il y a eu de nouveaux accidents, rajouter d'autres modif par la suite en fonction des choix possibles
                            this.production += this.Composant[i].production_normal(qualTravail);//Composant[i].production*tmp_Uptime * (qualTravail^(Composant[i].nbEmployes)) * (3.5^(Composant[i].nbRobots))
                            this.dechets += this.Composant[i].dechets_normal(qualTravail);
                            this.pollution += this.Composant[i].pollution_normal(qualTravail);
                        }else if(boolaccident) boolaccident = false;// on réactive la production après l'accident, 
                    }
                }   
            }
        
        if(this.marche == false) reset_update(tmp_accident);// on reset si il manque un employé sur un composant
        else this.accident = tmp_accident; // on remet le bon nombre d'accidents pour l'algo de sécurité
    }
    reset_update(tmp_accident){
        this.accident = tmp_accident;
        this.production = 0;
        this.dechets = 0;
        this.pollution = 0;
    }
    jour_panne(Max, j){
        return (j + (rand()%(Max+1-j)));
    }
    cadence_travail(Composant){
        return 1 + (Composant.accident_normal()/*0->2*/) + (avantages/*0->1*/);
    }
    accident_switch(composant, tmp_Uptime, j, probaAccident){
        switch(composant.Accident(probaAccident)){
            case 2:
                this.boolpanne = true;
                tmp_Uptime = this.jour_panne(tmp_Uptime, j); // on définit un jour de panne, rajouter la possibilité de réparation immédiate avec un choix 
                break;
            case 1:
                this.accident+=1;
                if(tmp_Uptime>j&&this.accident%2==1) this.boolaccident = true; // un accident sur deux on retire un jour, gravité de l'accident "random"
                break;
        }
        return tmp_Uptime;
    }
}
class Composant {
    constructor(){
        // a deplacer dans une fonction qui prend un json en entree si possible
    /* Variables Fixes par rapport au composant sélectionné */
        this.carte=(""); // nom et description a l'affichage
        this.auto = false; // besoin d'un employé pour fonctionner ?
        this.consomationNRJ = 2;// remonter la consomation par production
        this.dechets = 8;// remonter dechets de ce composant
        this.pollution = 40;// remonter pollution de ce composant
        this.production = 30;// remonter nbEmployes*production ou production + (nbEmployes*prod/employe) // si pas d'employés on bloque la machine
        this.accident = 0.08;// remonter accident * (nbEmployes + (2*nbRobots))
    /* Variables qui évoluent */
        this.nbEmployes = 0;//on Stocke le nombre d'assignés, varie
        this.nbRobots = 0;
    }
    accident_normal(){
        let tmpAccident = 0;
        for(let j=0; j<this.nbEmployes; j++) tmpAccident += (1-this.accident)*Choix["securite"].Employe;
        for(let j=0; j<this.nbRobots; j++) tmpAccident += (2*(1-this.accident)*Choix["securite"].Robot);
        return tmpAccident;
    }
    production_normal(qualTravail){
        let tmpProduction = this.production*tmp_Uptime;
        for(let j=0; j<this.nbEmployes; j++) tmpProduction *= qualTravail;
        for(let j=0; j<this.nbRobots; j++) tmpProduction *= 3.5; //var a mettre
        return tmpProduction;
    }
    dechets_normal(qualTravail){
        let tmpEco = this.dechets*(production_normal(qualTravail)/this.production);
        for(let j=0; j<this.nbRobots; j++) tmpEco *= 1.12; //var a mettre
        return tmpEco;
    }
    pollution_normal(qualTravail){
        let tmpEco = this.pollution*(production_normal(qualTravail)/this.production);
        for(let j=0; j<this.nbRobots; j++) tmpEco *= 1.12;//var a mettre
        return tmpEco;
    }
    production_auto(){
        return (this.production-this.dechets)*tmp_Uptime * (Math.pow(3.5,2));
    }
    dechets_auto(){
        return this.dechets*tmp_Uptime ;// on met pas la puissance pour dechets car la machine automatique est plus performante
    }
    pollution_auto(){
        return this.pollution*tmp_Uptime * (Math.pow(3.5,2));
    }
    Vider(){
        this.nbEmployes = 0;
        this.nbRobots = 0;
    }
    Add_switch(tmp){
        switch(tmp){
            case 0:
                if(this.nbEmployes+this.nbRobots<2){
                    this.nbEmployes+=1;
                    return -1;
                } 
                break;
            case 1:
                if(this.nbEmployes+this.nbRobots<2){
                    this.nbRobots+=1;
                    return -1;
                } 
                break;
        }
        return tmp;
    }
    add_ouvriers(nbEmployes, nbRobots){
        let tmp_Employe = this.nbEmployes;
        let tmp_Robots = this.nbRobots;
        if(Lignes.size()*5< this.nbEmployes+ this.nbRobots) {
            while(tmp_Employe+tmp_Robots>0) for(let i=0; i<Lignes.size(); i++){
                this.add_ouvrier(tmp_Employe, tmp_Robots);
            }
        }
        else {
            let i = 0;
            while(tmp_Employe+tmp_Robots>0) {
                for(let j=0; j<5; j++) this.add_ouvrier(tmp_Employe, tmp_Robots);
                if(tmp_Employe+tmp_Robots>=5) i++;
                if(i==this.Lignes.size()) i=0; // on met une sécurité pour reboucler au cas ou
            }
        }        
    }
    add_ouvrier(tmp_Employe, tmp_Robots){
        if(tmp_Robots>0){
            tmp_Robots--;
            this.Add(0, 1);
        }else if(tmp_Employe>0){
            tmp_Employe--;
            this..Add(1, 0);
        }   
    }
    Upgrade(){//utiliser un tableau global en fonction du composant pour tout les parametres
        this.carte=("");// nom a mettre avec un switch et class a faire
        this.auto = true;
        this.consomationNRJ = 4;
        this.dechets = 6;
        this.pollution = 80;
        this.accident = 0.04;
        this.production = 50;
    }
    Accident(accident){ // génération d'une proba d'accident, sous module a faire par la suite
        if(proba(accident)){
            if(proba(accident/4)){
                return 2;
            }
            return 1;
        }
        return 0;
    }
}
class Ecologie {
    constructor(){
        this.dechets = 0;
        this.pollution = 0;
    }
}
class Energie {
    constructor(){
        //Fournisseurs :
        this.Principal; // Renvoi vers un fournisseur
        this.Auxilliaire;
    }
}
class Fournisseur {
    constructor(){
        this.prix; // prix au KW/H
        this.pollution; // pollution produite par KW/H fournit
        this.coupure; // risques de coupure / possibilité de panne
        this.uptime; // pourcentage d'uptime 
    }
    //Méthode de calcul de l'uptime sur le mois
}









//class Commercial {
//    constructor(){
//        this.commission // Commission sur la vente, augmentant les chances de vendre ( par client ? globalement ?)
//        this.prix // prix de vente de l'objet, impact de la commission sur le commercial définit par la relation:
                  // Salaire / (Commission * prix)  | avec Salaire = salaire d'un employé normal
//    }
    //Méthode de calcul de l'impact sur les ventes
//}
/* Variables globales non définies
 - Salaire d'un employé
 - this.avantages // avantages offerts par l'entreprise

    ...
Environnement :
    **Energie (methode calcul pollution)
    **Machines (pollution + dechets)
    Respect des Normes (à définir avec les choix + Evenements randoms)
Vie Sociale :
    **Employe (qualTravail + avantages)
    **Securité (employe.accident + Energie.auxilliaire.securite?A VOIR? + choix)
Ventes : Flou pour le moment..
    Stock de produits
    Image de marque
    Parts de marché
    Pubs
    Commerciaux (impact sur les ventes)
Production :
    Nb(Employes + Robots)
    cadence de travail(qualTravail - employe.accident + Stocks)
    Machine(Nb, qualité)
    uptimeGlobal

    */




//Barres Globales :
// - Environnement   = (pollutionMachine+NRJ) + déchets + Respect des Normes
// - Vie Sociale     = qualTravail + avantages + securite
// - Ventes          = Stock + Image de marque + Parts de marché + Pubs + Commerciaux
// - Production      = Nb(Employe+Robots) + cadence de travail + Machine(Nb+qualité+UptimeGlobal)

//Magasin : (+/-)
// - Employés / Robots
// - Commerciaux + commission ajustable
// - Prix de vente
// - Production visée

function preload ()
{
    
    // TEST DE TILEMAP POUR L'USINE :


    // json fichier de config de la texture terre et eau
    this.load.json('map', 'tilemap/isometric-grass-and-water.json');
    // sprite fichier image terre et eau
    this.load.spritesheet('tiles', 'tilemap/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });





    // sprite fichier image skelette
    /*
    this.load.spritesheet('skeleton', 'assets/tests/iso/skeleton8.png', { frameWidth: 128, frameHeight: 128 });
    // image de la maison
    this.load.image('house', 'assets/tests/iso/rem_0002.png');
    */
    this.load.image('argent', 'images/argent.png');
    this.load.image('ecologie', 'images/ecologie.png');
    this.load.image('machine', 'images/machine.png');
    this.load.image('progression', 'images/progression.png');
    this.load.image('salaires', 'images/salaires.png');
    this.load.image('salarie', 'images/salarie.png');
    

}

function create ()
{
    scene = this;
    
    // this => scene
    // var cursors = this.input.keyboard.createCursorKeys(); -> Récupérer fleches clavier
    //  on definit la taille de jeu
    
    //Changer les méthodes pour les réutiliser partout



    //Test de tilemap pour l'usine
    //buildMap();

    
        

    var cadre_gauche = new Cadre(10,10,190,270, 50, 0 ,0 ,0 ,0.7); // arrondi élevé en haut a gauche et léger en bas a gauche
    var cadre_bureau = new Cadre(250,370,800,280, 50, 50 ,0 ,0 ,1); // arrondi élevé en haut a gauche et léger en bas a gauche
    var cadre_test = new Cadre(200,10,190,270);
    var cadre_test1 = new Cadre(390,10,190,270);

    this.texte = scene.add.text(50, 20, "test", { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });

    // taille/position de la camera a gerer
    //this.cameras.main.setSize(1600, 600); 
   //this.cameras.main.setBounds(0, 0, 800, 400).setName('main');

    //game.state.add('load', load);
    
    //Créer l'interface
    //  On initialise l'interface puis on la fixe a la camera avec :
    //      elem.fixedToCamera = true;
    // ====> TROUVER AUTRE CHOSE..


    //  Align only works with multi-lined text.
    //this.add.text(200, 200, 'Case shrugged.\nThe girl to his right giggled and nudged him.', { color: '#00ff00', align: 'right' });
    


    //Créer l'Usine
    //  Créer Robots/Humains par défault
    //  Créer Machines, ajouter les effets spéciaux

}

// test de tilemap pour l'usine
function buildMap ()
{
    //  Parse the data out of the map
    var data = scene.cache.json.get('map'); // on récupère le fichier json

    var tilewidth = data.tilewidth; // on définit la taille d'une case
    var tileheight = data.tileheight;

    tileWidthHalf = tilewidth / 2; //initialisation des variables, *0.5 car scale de .5
    tileHeightHalf = tileheight / 2;

    var layer = data.layers[0].data; // on récupère la def de la map

    var mapwidth = data.layers[0].width; // taille de la carte en cases
    var mapheight = data.layers[0].height;

    var centerX = mapwidth * tileWidthHalf; // taille de la carte sur l'écran (pixels ?)
    var centerY = 16;

    var i = 0;

    for (var y = 0; y < mapheight; y++) // affichage de la carte
    {
        for (var x = 0; x < mapwidth; x++)
        {
            id = layer[i] - 1; // on récupère l'id de la case

            var tx = 400 + ((x - y) * tileWidthHalf); // on définit la position
            var ty = (x + y) * tileHeightHalf;

            var tile = scene.add.image(centerX + tx /* définit de la position de l'image */, centerY + ty, 'tiles' /*type ?*/, id/*id de l'animation*/); 
            //tile.setScale(.5)
            tile.depth = centerY + ty; //profondeur de l'image
            

            i++; // on passe a la texture suivante
        }
    }
}


function update ()
{
    d = true;
    //this.cameras.main.scrollX = 800;
    
    
}