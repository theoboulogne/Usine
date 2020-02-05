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

- Revoir entièrement la partie accident, panne, securite
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
    //constructor(img, cadre){
    //    cadre.nbIcones+=1
    //    this.image = scene.add.image(cadre.x + 40,cadre.y + (cadre.nbIcones*40), img);
    //    this.image.setScale(0.07) // taille variable a faire
    //    this.image.setScrollFactor(0);
    //    this.image.depth = 1000;
    
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
    if(Math.random()<probabi){
        return 1;
    }
    else return 0;
}

var Choix = (function() {

    let salaire = 1500
    let solde = 0 // taxes etc
    let norme = new Object(); // Limites ?
    norme.pollution = -1
    norme.dechets = -1
    norme.production = -1
    let avantages = 0
    let securite = new Object();
    securite.employes = 1 // 0.5 - 1.5
    securite.robots = 1 // 0.5 - 1.5

    return {
        Solde: function() {
            return solde;
        },
        Norme_pollution: function() {
            return norme.pollution;
        },
        Norme_dechets: function() {
            return norme.dechets;
        },
        Norme_production: function() {
            return norme.production;
        },
        Avantages: function() {
            return Math.log((salaire/300) - (17*avantages));
        },
        Salaire: function() {
            return salaire;
        },
        Securite_employes: function() {
            return securite.smployes;
        },
        Securite_robot: function() {
            return securite.robots;
        },
    };

})();

class Jeu{
    constructor(){
        //affichage developpeur a faire

        this.uptimeMax = 30;//passer en constante ? faire varier +1 / -1 ? retirer des jours pour laisser les wk end off ?

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
        //this.CentraleNucleaire.uptime = (1-this.CentraleNucleaire.coupure)*uptimeMax; // en prenant 30 comme max uptimeNRJ
        //Uptime random a faire ..
        
        this.GenerateurPetrole = new Fournisseur();
        this.GenerateurPetrole.prix = 8;
        this.GenerateurPetrole.pollution = 15;
        this.GenerateurPetrole.coupure = 0.08;
        //this.GenerateurPetrole.uptime = (1-this.GenerateurPetrole.coupure)*uptimeMax; // en prenant 30 comme max uptimeNRJ

        this.Courant = new Energie();
        this.Courant.Principal = this.CentraleNucleaire;
        this.Courant.Auxilliaire = this.GenerateurPetrole;

        this.solde = 1000000;
        this.nbEmployes = 15;
        this.nbRobots = 0;
        this.nbEmployes_dispo = 15;
        this.nbRobots_dispo = 0;
        this.stock = 0 // production en stock

        this.Lignes = [];
        this.Lignes.push(new Ligne()); // une ligne par défault

        // a voir
        // Séparer la génération de l'uptime en 30 étapes de calcul proba ou multiplier le pourcentage par l'uptime max
    }

    Update_Mois(){ // Fonctionnement d'un mois
        //Reset des variables de stockage des infos du mois + calcul du nombre de jours de fonctionnement
        this.consommationNRJ = 0;
        let uptimeNRJ = this.Courant.Principal.uptime(this.uptimeMax) + ((this.uptimeMax - this.Courant.Principal.uptime(this.uptimeMax))*(1-this.Courant.Auxilliaire.coupure));
        for(let i=0; i<uptimeNRJ; i++){ // On effectue notre mois
            this.Update_Jour()
        }
        //Calcul et facture de fin de mois
        this.solde += Choix.Solde()/* + Ventes .. */ - ((this.consommationNRJ * (this.solde_NRJ1() + this.solde_NRJ2())) + this.solde_salaires());
    }

    Update_Jour(){ // Fonctionnement d'une journée
        for(let i=0; i<24; i++){
            if(i==6||i==14){// 6 : 00 - Remplis machines | 14 : 00 - Rajoute employes
                this.add_ouvriers()// definir la marche de la marchine a ce moment la ?
            }
            if(i==12||i==18){// 12 : 00 - Retire les employes | 18 : 00 - Retire les employes
                this.retirer_employe() // faire que la fonction augmente nbEmployes
            } // rajouter retirer_robot aussi
            this.consommation()
            this.Update_Lignes(); 
            this.empreinte()
        }
    }
    Update_Lignes(){ //Fait fonctionner les machines une heure
        for(let i=0; i<this.Lignes.length; i++) {
            this.Lignes[i].Update();
            this.stock += this.Lignes[i].production; 
        }
        //Récupérer les infos ensuite
    }

    consommation(){ // Récupère la consommation sur une heure
        for(let i=0; i<this.Lignes.length; i++) this.consommationNRJ += this.Lignes[i].energie();
    }
    empreinte(){ // Récupère les infos écologiques sur une heure
        this.Eco.pollution = 0;
        this.Eco.dechets = 0;
        for(let i=0; i<this.Lignes.length; i++){
            this.Eco.pollution += this.Lignes[i].pollution;
            this.Eco.dechets += this.Lignes[i].dechets;
        }
        this.Empreinte.pollution += this.Eco.pollution;
        this.Empreinte.dechets += this.Eco.dechets;
    }
    avantages(){ // si salaire = 3300 -> = 1 | si salaire = 600 -> = 0
        return Math.log((Choix.Salaire()/300) - (17*Choix.Avantages()))
    }

    solde_salaires(){
        return (Choix.Salaire()*this.nbEmployes);
    }
    solde_NRJ1(){
        return (this.Courant.Principal.uptime(this.uptimeMax)*(100/this.uptimeMax)*this.Courant.Principal.prix);
    }
    solde_NRJ2(){
        return (this.Courant.Auxilliaire.uptime(this.Courant.Principal.uptime(this.uptimeMax))*(100/this.uptimeMax)*this.Courant.Auxilliaire.prix);
    }

    
    //RAJOUTER UNE SECURITE VERIFIANT QU'IL N'Y A PAS PLUS D'EMPLOYES QUE DE PLACE DANS LES BOUCLES +
    // CHANGER LES METHODES COMPOSANT&LIGNE POUR OUVRIER
    add_ouvriers(){
        if(this.Lignes.length*5<this.nbEmployes_dispo+this.nbRobots_dispo) { //on ajoute un dans chaque ligne jusqu'à tant qu'il y en ai plus
            while(this.nbEmployes_dispo+this.nbRobots_dispo>0) for(let i=0; i<this.Lignes.length; i++){
                this.Add(this.Lignes[i]);
            }
        }
        else {
            let i = 0;
            while(this.nbEmployes_dispo+this.nbRobots>0) { // On remplit les lignes une par une et on rempli au maximum la dernière si on peut pas en faire fonctionner une nouvelle
                for(let j=0; j<5; j++) this.Add(this.Lignes[i]);
                if(this.nbEmployes_dispo+this.nbRobots_dispo>=5) i++;
                if(i==this.Lignes.length) i=0; // on met une sécurité pour reboucler au cas ou
            }
        }
    }
    Add(ligne){
        if(this.nbRobots_dispo>0){
            this.nbRobots_dispo--;
            ligne.Add(1); // 1 pour robot
        }else if(this.nbEmployes_dispo>0){
            this.nbEmployes_dispo--;
            ligne.Add(0); // 0 pour employe
        }   
    }
    retirer_employe(){
        for(let i=0; i<this.Lignes.length; i++){
            this.Vider(this.Lignes[i]);
        }
    }
    Vider(ligne){
        for(let i=0; i<5; i++){
            this.nbEmployes_dispo += ligne.Composant[i].nbEmployes;
            ligne.Composant[i].nbEmployes = 0;
        }
    }
}
class Ligne {
    constructor(){
        //Composants de la machine
        this.Composant = [];
        for(let i=0; i<5; i++) this.Composant.push(new Composant());

        //Gestion des Pannes / Accidents
        this.coutReparation = 8000; // cout de réparation fixe en cas de panne
        this.boolaccident = false;
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

    
    Update(){
        //On enregistre des valeurs en tmp
        let tmp_accident = this.accident;
        //let tmp_accident = this.accident; si besoin de rajouter des evenements en fonction du nombre d'accident par mois
        // On initialise les valeurs de stockage
        this.marche = true;
        this.boolaccident = false;
        this.dechets=0;
        this.production=0; 
        this.pollution=0;
        for(let i=0; i<5; i++){
                // Utilisation d'une fonction avec variables globales a faire
                if(this.Composant[i].auto){
                    if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i]);
                    if(!this.boolpanne&&!this.boolaccident){ // on revérifie
                        this.production += this.Composant[i].production_auto();
                        this.dechets += this.Composant[i].dechets_auto();
                        this.pollution += this.Composant[i].pollution_auto();
                    }
                }
                else{
                    if(this.Composant[i].nbRobots+this.Composant[i].nbEmployes == 0) this.marche = false;
                    else{
                        if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i]);
                        if(!this.boolpanne&&!this.boolaccident){
                            let qualTravail = Math.pow(this.cadence_travail(this.Composant[i]), this.Composant[i].nbEmployes) * Math.pow(3.5, this.Composant[i].nbRobots); // on recalcule si il y a eu de nouveaux accidents, rajouter d'autres modif par la suite en fonction des choix possibles
                            
                            this.production += this.Composant[i].production_normal(qualTravail);//Composant[i].production*tmp_Uptime * (qualTravail^(Composant[i].nbEmployes)) * (3.5^(Composant[i].nbRobots))
                            this.dechets += this.Composant[i].dechets_normal(qualTravail);
                            this.pollution += this.Composant[i].pollution_normal(qualTravail);
                        }
                    }
                }   
        }
        if(this.boolaccident) this.boolaccident = false//demander une action humaine  pour reactiver production si auto ?  
        if(!this.marche) this.reset_update(tmp_accident);// on reset si il manque un employé sur un composant
    }
    reset_update(tmp_accident){
        this.accident = tmp_accident;
        this.production = 0;
        this.dechets = 0;
        this.pollution = 0;
    }

    cadence_travail(composant){ // a changer avec le boulot de thomas..
        //return 1 + (composant.accident_normal()/*0->2*/) + (avantages/*0->1*/); première formule utilisée
        return (2-composant.accident_normal()+(2*Choix.Avantages()))/4
    }
    energie(){
        let tmpNRJ = 0;
        for(let i=0; i<5; i++) tmpNRJ += this.Composant[i].consomationNRJ * (this.Composant[i].nbEmployes + (2*this.Composant[i].nbRobots));
        return tmpNRJ;
    }
    accident_switch(composant){
        switch(composant.Accident()){
            case 2:
                this.boolpanne = true;
                break;
            case 1:
                this.accident+=1;
                this.boolaccident = true;
                break;
        }
    }


    Add(type){ // Ajoute un employe ou robot sur une machine
        let i=0;
        let fonctionnement = false;
        while(i<10){ // On fait 2 boucles max
            if(!this.Composant[i%5].auto){
                if(!fonctionnement){
                    if(this.Composant[i%5].nbEmployes+this.Composant[i%5].nbRobots<1){ // Si pas d'employe on en met un
                        if(this.Composant[i%5].Add(type)) return;
                    }
                }
                else{
                    if(this.Composant[i%5].nbEmployes+this.Composant[i%5].nbRobots<2){ // si de la place on en met un
                        if(this.Composant[i%5].Add(type)) return;
                    }
                }
            }
            i++;
            if(i==5) fonctionnement = true;
            //else console.log("Error Add Composant Ligne"); return; // error pas d'emplacement trouver
        }
    }
}
class Composant {

    constructor(){
        // a deplacer dans une fonction qui prend un json en entree si possible
    /* Variables Fixes par rapport au composant sélectionné */
        this.carte=(""); // nom et description a l'affichage
        this.auto = false; // besoin d'un employé pour fonctionner ?
        this.consomationNRJ = 0.003;// remonter la consomation par production
        this.dechets = 8;// remonter dechets de ce composant
        this.pollution = 40;// remonter pollution de ce composant
        this.production = 30;// remonter nbEmployes*production ou production + (nbEmployes*prod/employe) // si pas d'employés on bloque la machine
        this.accident = 0.08;// remonter accident * (nbEmployes + (2*nbRobots))
    /* Variables qui évoluent */
        this.nbEmployes = 0;//on Stocke le nombre d'assignés, varie
        this.nbRobots = 0;
    }
    accident_normal(){ // ARROW FUNCTION A FAIRE ? 
        return (this.nbEmployes * (1-this.accident)*Choix.Securite_employes()) + (this.nbRobots * 2*(1-this.accident)*Choix.Securite_robot());
    }
    production_normal(qualTravail){ 
        return this.production * qualTravail;
    }
    dechets_normal(qualTravail){
        return this.dechets * qualTravail * Math.pow(1.12, this.nbRobots);
    }
    pollution_normal(qualTravail){
        return this.pollution * qualTravail * Math.pow(1.12, this.nbRobots);
    }

    production_auto(){ // 3.5 et 1.12 a mettre en variable en fonction d'un choix (efficacite robots)
        return (this.production-this.dechets) * (Math.pow(3.5,2));
    }
    dechets_auto(){
        return this.dechets ;// on met pas la puissance pour dechets car la machine automatique est plus performante
    }
    pollution_auto(){
        return this.pollution * (Math.pow(3.5,2));
    }
    Vider(){
        this.nbEmployes = 0;
        this.nbRobots = 0;
    }
    Add(type){
        switch(type){
            case 0:
                this.nbEmployes+=1;
                return true;
            case 1:
                this.nbRobots+=1;
                return true;
        }
        return false;
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
    Accident(){ // génération d'une proba d'accident
        if(proba(this.proba_Accident())){
            if(proba(this.proba_Accident()/4)){
                return 2;
            }
            return 1;
        }
        return 0;
    }
    proba_Accident(){
        if(this.auto){
            return this.accident * 4;
        }
        else {
            return (this.accident *(this.nbEmployes + (2*this.nbRobots)));
        }
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
        //this.uptime; // pourcentage d'uptime  retirer uptime ?? en faire une méthode simplement ?
    }
    //Méthode de calcul de l'uptime sur le mois
    uptime(uptimeMax){
        return (1-this.coupure)*uptimeMax
    }
}
//class Employe { // Repenser le système d'assignement avec differents postes par machine, +/- accidents/qualité de travail ?
//    constructor(){
//        this.Composant
//    }
    // Méthode d'ajout d'avantages ? ou gérer ça avec une union de proba
//}
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
    Energie (methode calcul pollution)
    Machines (pollution + dechets)
    Respect des Normes (à définir avec les choix + Evenements randoms)
Vie Sociale :
    Employe (qualTravail + avantages)
    Securité (employe.accident + Energie.auxilliaire.securite?A VOIR? + choix)
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
    TEST = new Jeu();
    TEST.Update_Mois();
    scene = this;
    
    // this => scene
    // var cursors = this.input.keyboard.createCursorKeys(); -> Récupérer fleches clavier
    //  on definit la taille de jeu
    
    //Changer les méthodes pour les réutiliser partout



    //Test de tilemap pour l'usine
    buildMap();


    var progression = new Icone('progression', 50,50)
    progression.barre_progression(1)
    var ecologie = new Icone('ecologie', 50, 90)
    ecologie.barre_progression(1)
    var argent = new Icone('argent', 50, 130)
    argent.barre_nombre(192000,'$')
    var salaires = new Icone('salaires', 50, 170)
    salaires.barre_nombre(8200,'/mois')


    var machine = new Icone('machine', 40, 250)
    machine.nombre(5);
    var salarie = new Icone('salarie', 125, 250)
    salarie.nombre(2);

    var cadre_gauche = new Cadre(10,10,190,270, 50, 0 ,0 ,0 ,0.7); // arrondi élevé en haut a gauche et léger en bas a gauche
    var cadre_bureau = new Cadre(250,370,800,280, 50, 50 ,0 ,0 ,1); // arrondi élevé en haut a gauche et léger en bas a gauche

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
    
    /*if (d) // si déplacement = 1 on va a gauche
    {
        this.cameras.main.scrollX -= 0.5;

        if (this.cameras.main.scrollX <= 0) //  on bascule dans l'autre sens au bout
        {
            d = 0;
        }
    }
    else //sinon a droite
    {
        this.cameras.main.scrollX += 0.5;

        if (this.cameras.main.scrollX >= 800)
        {
            d = 1;
        }
    }*/
}