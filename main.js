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

<<<<<<< HEAD
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

=======
let devlog_init_jeu = false;
let devlog_init_ligne = false;
let devlog_init_composant = false;
let devlog_update_jeu = false;
let devlog_update_ligne = false;
>>>>>>> Theo

/*

<<<<<<< HEAD



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
            this.Add(1, 0);
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
=======
-----------------------------------------------------------------------------------
                                To-DO List :
|------Légende:------|
| " - " = à faire    |
| " * " = implémenté |
|--------------------|

    Fonctionnalités principales :

/-/ Environnement :
*    Energie (methode calcul pollution)
*    Machines (pollution + dechets)
-   Respect des Normes (à définir avec les choix + Evenements randoms)
/-/ Vie Sociale :
*    Employe (qualTravail + avantages)
*    Securité (employe.accident + Energie.auxilliaire.securite?A VOIR? + choix)
/-/ Ventes : à définir
-   Stock de produits
-   Image de marque
-   Parts de marché
-   Pubs
-   Commerciaux (impact sur les ventes)
/-/ Production :
*    Nb(Employes + Robots)
*    cadence de travail(qualTravail - employe.accident + Stocks)
*    Machine(Nb, qualité)
*    uptimeGlobal
/-/ 'Magasin' :
-   nbEmployés / nbRobots
-   Production visée 
-   Prix de vente
-   Gestion de la vente : Commerciaux ou Pubs ou a voir

    Autre :

- créer class accident pour mieux gérer tout les accidents, les pannes et la sécurité
- Evaluer tout ce qui est améliorable ou non


-----------------------------------------------------------------------------------

        -///- Fonctionnement du jeu :
>>>>>>> Theo
    
--------------------------------------------------

    -//- Initialisation des différentes classes :
    
--------------------------------------------------

----------------------------------------
 -/- Joueur :
-------------
uptimeMax = 30; Nombre de jours dans un mois, utilisé pour l'initialisation du courant etc..
solde = 1000000;
stock = 0; produits en stock

nbEmployes = 15; Nombre total d'ouvriers (Employes + Robots) 
nbRobots = 0;
nbEmployes_dispo = 15; Nombre d'ouvriers non assigné (Employes + Robots) :
nbRobots_dispo = 0;

Eco (empreinte écologique sur le tour)
Empreinte (empreinte écologique totale)
    avec empreinte écologique composée de : (dechet, pollution)
Courant (Gestion de la consommation de l'usine)
    avec un Fournisseur principal et auxilliaire chacun composé de : (pollution, prix, coupure)
Lignes (Gestion des Lignes de production) = [] 
    avec une Ligne au début
----------------------------------------

----------------------------------------
 -/- Ligne :
------------
coutReparation = 8000;  cout fixe, en cas de panne
accident = 0; nombres d'accidents au total sur cette ligne de production
boolaccident = false; accident sur la ligne de prod
boolpanne = false; panne sur la ligne de prod
Composant = []
    avec 5 Composant
----------------------------------------

----------------------------------------
 -/- Composant :
 ---------------
this.nbEmployes = 0; on Stocke le nombre d'ouvriers assignés, varie au cours d'une journée
this.nbRobots = 0;
carte=("");  Caractéristiques fixes au composant
auto = false; besoin d'un employé sur un composant pour faire marcher la machine ou non
consomationNRJ = 0.003;
dechets = 8;
pollution = 40;
production = 30;
this.accident = 0.02;
----------------------------------------

--------------------------------------------------

    -//- Fonctionnement d'un tour

--------------------------------------------------

- Calcul du temps de fonctionnement de l'énergie en jours en fonction 
  de la probabilité de panne des fournisseurs
- On lance l'update de chaque jour en fonction du nombre de jours calculés, 
  on y effectue sur les 24h :
    - à 6h et 14h :
        - on assigne les ouvriers(employés+robots) à chaque composant pour un maximum de 2 par composant
    - à 12h et 18h :
        - on retire les employés ( rajouter un système de régulation pour les robots.. )
    - à chaque heure :
        - on calcule la consommation énergetique en fonction des ouvriers assignés et des machines
        - On actualise chaque Ligne de production :
            - On vérifie qu'il y a assez d'ouvriers pour que la Ligne de production fonctionne
            - On remonte la production, les déchets et la pollution en fonction du nombre d'ouvriers assignés
            - On génère a chaque heure une probabilité :
                - d'accident (coupe la production sur l'heure à partir du composant avec l'accident) 
                - de panne (nécessite une réparation manuelle) 
        - On récupère/enregistre les infos écologiques
- On actualise le solde en fonction du cout de l'énergie et des salaires 
  (rajouter cout de production + cout fixe + etc)

-----------------------------------------------------------------------------------

*/


//Test pour l'interface :
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

//Jeu :

function proba(probabilite){
    if(Math.random()<probabilite){
        return 1;
    }
    else return 0;
}
var Choix = (function() {

<<<<<<< HEAD
function create ()
{
    scene = this;
    
    // this => scene
    // var cursors = this.input.keyboard.createCursorKeys(); -> Récupérer fleches clavier
    //  on definit la taille de jeu
    
    //Changer les méthodes pour les réutiliser partout



    //Test de tilemap pour l'usine
    //buildMap();
=======
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
            return securite.employes;
        },
        Securite_robot: function() {
            return securite.robots;
        },
    };

})();

class Joueur{
    constructor(){
        //Nombre de jours dans un mois
        this.uptimeMax = 30;
        //faire varier +1 / -1 ? 
        // ou retirer des jours pour laisser les wk end off en fonction des choix ?

        if(devlog_init_jeu) console.log("  * - * Initialisation Ecologie Jeu : Eco + Empreinte * - *  ")
        this.Eco = new Ecologie(); // Initialisation de l'écologie
        this.Eco.pollution = 0;
        this.Eco.dechets = 0;
        this.Empreinte = new Ecologie();
        this.Empreinte.pollution = 0;
        this.Empreinte.dechets = 0;

        if(devlog_init_jeu){
            console.log("this.Eco.pollution")
            console.log(this.Eco.pollution)
            console.log("this.Eco.dechets")
            console.log(this.Eco.dechets)
            console.log("this.Empreinte.pollution")
            console.log(this.Empreinte.pollution)
            console.log("this.Empreinte.dechets")
            console.log(this.Empreinte.dechets)
            console.log("  * - *                   --------                   * - *  ")
            console.log("")
        }

        //Gérer les fournisseurs principaux coté serveur ?
        if(devlog_init_jeu) console.log("  * - * Initialisation Courant Jeu : Principal + Auxilliaire * - *  ")
        this.Courant = new Energie();// Initialisation de l'énergie
        this.Courant.Principal.prix = 2;
        this.Courant.Principal.pollution = 6;
        this.Courant.Principal.coupure = 0.5;
        this.Courant.Auxilliaire.prix = 8;
        this.Courant.Auxilliaire.pollution = 15;
        this.Courant.Auxilliaire.coupure = 0.2;

        if(devlog_init_jeu){
            console.log("this.Courant.Principal.prix")
            console.log(this.Courant.Principal.prix)
            console.log("this.Courant.Principal.pollution")
            console.log(this.Courant.Principal.pollution)
            console.log("this.Courant.Principal.coupure")
            console.log(this.Courant.Principal.coupure)
            console.log("this.Courant.Principal.uptime(this.uptimeMax)")
            console.log(this.Courant.Principal.uptime(this.uptimeMax))
            console.log("this.Courant.Auxilliaire.prix")
            console.log(this.Courant.Auxilliaire.prix)
            console.log("this.Courant.Auxilliaire.pollution")
            console.log(this.Courant.Auxilliaire.pollution)
            console.log("this.Courant.Auxilliaire.coupure")
            console.log(this.Courant.Auxilliaire.coupure)
            console.log("this.Courant.Auxilliaire.uptime(this.uptimeMax)")
            console.log(this.Courant.Auxilliaire.uptime(this.uptimeMax))
            console.log("  * - *                       --------                      * - *  ")
            console.log("")
        }

        if(devlog_init_jeu) console.log("  * - * Initialisation Ventes Jeu : Variables * - *  ")
        this.solde = 1000000;// Initialisation des ventes

        if(devlog_init_jeu){
            console.log("this.solde")
            console.log(this.solde)
            console.log("  * - *                --------               * - *  ")
            console.log("")
        }


        if(devlog_init_jeu)console.log("  * - * Initialisation Production Jeu : Variables * - *  ")
        this.nbEmployes = 15;// Initialisation de la production
        this.nbRobots = 0;
        this.nbEmployes_dispo = 15;
        this.nbRobots_dispo = 0;
        this.stock = 0 // produits en stock

        if(devlog_init_jeu){
            console.log("this.nbEmployes")
            console.log(this.nbEmployes)
            console.log("this.nbRobots")
            console.log(this.nbRobots)
            console.log("this.nbEmployes_dispo")
            console.log(this.nbEmployes_dispo)
            console.log("this.nbRobots_dispo")
            console.log(this.nbRobots_dispo)
            console.log("this.stock")
            console.log(this.stock)
            console.log("  * - * Initialisation Production Jeu : Ligne 0 * - *  ")
        }
            this.Lignes = [];
            this.Lignes.push(new Ligne()); // une ligne par défault

        if(devlog_init_jeu){
            console.log("  * - *                 --------                * - *  ")
            console.log("")
        }
    }

    Update_Mois(){ // Fonctionnement d'un mois
        //Reset des variables de stockage des infos du mois + calcul du nombre de jours de fonctionnement
        if(devlog_update_jeu) console.log("  * - * Update Mois : Variables * - *  ")
        this.consommationNRJ = 0;
        let uptimeNRJ = this.Courant.Principal.uptime(this.uptimeMax) + ((this.uptimeMax - this.Courant.Principal.uptime(this.uptimeMax))*(1-this.Courant.Auxilliaire.coupure));
        if(devlog_update_jeu) {
            console.log("this.consommationNRJ")
            console.log(this.consommationNRJ)
            console.log("uptimeNRJ (let)")
            console.log(uptimeNRJ)
            console.log("  * - * Update Mois : Journées * - *  ")
        }
        for(let i=0; i<uptimeNRJ; i++){ // On effectue notre mois
            this.Update_Jour()
        }
        //Calcul et facture de fin de mois
        if(devlog_update_jeu){
            console.log("  * - * Update Mois : Traitement Fin de mois * - *  ")
            console.log(" -  - Argent -  - ")
            console.log("= Solde")
            console.log(this.solde)
            console.log(" -  -")
            console.log("+ Choix.Solde()")
            console.log(Choix.Solde())
            console.log("- this.consommationNRJ")
            console.log(this.consommationNRJ)
            console.log("- this.Courant.solde_NRJ1(this.uptimeMax)")
            console.log(this.Courant.solde_NRJ1(this.uptimeMax))
            console.log("- this.Courant.solde_NRJ2(this.uptimeMax)")
            console.log(this.Courant.solde_NRJ2(this.uptimeMax))
            console.log("- this.solde_salaires()")
            console.log(this.solde_salaires())
        }

        this.solde += Choix.Solde()/* + Ventes .. */ - ((this.consommationNRJ * (this.Courant.solde_NRJ1(this.uptimeMax) + this.Courant.solde_NRJ2(this.uptimeMax))) + this.solde_salaires());
        
        if(devlog_update_jeu){
            console.log("= Total")
            console.log(this.solde)
            console.log("  * - *             --------                * - *  ")
            console.log("")
        }
    }
    Update_Jour(){ // Fonctionnement d'une journée
    if(devlog_update_jeu) console.log(" -  - Update Jour : Debut -  - ")
        for(let i=0; i<24; i++){
            if(devlog_update_jeu){
                console.log(" - Update Jour Heure : " + (i).toString() + " - ")
                console.log(" - Update Jour  : Gestion des employes - ")
            }
            if(i==6||i==14){// | 6 : 00 h | 14 : 00 h | -> Rajoute employes + Robots
                if(devlog_update_jeu){
                    console.log(" - Ajout Ouvriers Debut - ")
                    console.log("this.nbEmployes_dispo")
                    console.log(this.nbEmployes_dispo)
                    console.log("this.nbRobots_dispo")
                    console.log(this.nbRobots_dispo)
                }

                this.add_ouvriers()

                if(devlog_update_jeu){
                    console.log(" - Ajout Ouvriers Fin - ")
                    console.log("this.nbEmployes_dispo")
                    console.log(this.nbEmployes_dispo)
                    console.log("this.nbRobots_dispo")
                    console.log(this.nbRobots_dispo)
                }
            }// definir la var marche de la machine a ce moment la pour retirer du traitement ?
            if(i==12||i==18){// | 12 : 00 h | 18 : 00 h | -> Retire les employes 
                if(devlog_update_jeu){
                    console.log(" - Retirer Employe Debut - ")
                    console.log("this.nbEmployes_dispo")
                    console.log(this.nbEmployes_dispo)
                }

                this.retirer_employe() // ( on laisse les robots ils tournent 24/24 actuellement, a changer )
                
                if(devlog_update_jeu){
                    console.log(" - Retirer Employe Fin - ")
                    console.log("this.nbEmployes_dispo")
                    console.log(this.nbEmployes_dispo)
                }
            } 
            if(devlog_update_jeu){
                console.log(" - Update Jour  : Consommation - ")
                console.log(" - Debut - ")
                console.log("this.consommationNRJ")
                console.log(this.consommationNRJ)
            }

            this.consommation()

            if(devlog_update_jeu){
                console.log(" - Fin - ")
                console.log("this.consommationNRJ")
                console.log(this.consommationNRJ)
                console.log(" - Update Jour  : Lignes - ")
                console.log(" - Debut - ")
                console.log("this.stock")
                console.log(this.stock)
            }

            this.Update_Lignes(); 

            if(devlog_update_jeu){
                console.log(" - Fin - ")
                console.log("this.stock")
                console.log(this.stock)
            }
            
            if(devlog_update_jeu){
                console.log(" - Update Jour  : Ecologie - ")
                console.log(" - Debut - ")
                console.log("this.Eco.pollution")
                console.log(this.Eco.pollution)
                console.log("this.Eco.dechets")
                console.log(this.Eco.dechets)
                console.log("this.Empreinte.pollution")
                console.log(this.Empreinte.pollution)
                console.log("this.Empreinte.dechets")
                console.log(this.Empreinte.dechets)
            }

            this.empreinte()

            if(devlog_update_jeu){
                console.log(" - Fin - ")
                console.log("this.Eco.pollution")
                console.log(this.Eco.pollution)
                console.log("this.Eco.dechets")
                console.log(this.Eco.dechets)
                console.log("this.Empreinte.pollution")
                console.log(this.Empreinte.pollution)
                console.log("this.Empreinte.dechets")
                console.log(this.Empreinte.dechets)
            }
        }
    }
    Update_Lignes(){ //Fait fonctionner les machines une heure
        for(let i=0; i<this.Lignes.length; i++) {
            this.Lignes[i].Update();
            this.stock += this.Lignes[i].production; 
        }
        //Récupérer les infos ensuite
    }

    //Faire le même type de fonction pour tout ?
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
    solde_salaires(){ // modifier les salaires pour les week ends
        return (Choix.Salaire()*this.nbEmployes);
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
        //Gestion des Pannes / Accidents
        this.coutReparation = 8000; // cout de réparation fixe en cas de panne
        this.accident = 0;
        this.boolaccident = false;
        this.boolpanne = false; // possibilité de réparer par probabilité sinon fin de la machine
        if(devlog_init_ligne){
            console.log(" -  - Initialisation Pannes / Accidents Ligne : Variables -  - ")
            console.log("this.coutReparation")
            console.log(this.coutReparation)
            console.log("this.accident")
            console.log(this.accident)
            console.log("this.boolaccident")
            console.log(this.boolaccident)
            console.log("this.boolpanne")
            console.log(this.boolpanne)
            console.log(" -  - Initialisation Production Ligne : 5 Composants -  - ")
        }
        
        //Composants de la machine
        this.Composant = [];
        for(let i=0; i<5; i++) this.Composant.push(new Composant());
        
        if(devlog_init_ligne) console.log(" -  -                  --  -  --                    -  - ")
    }
    
    Update(){
        if(devlog_update_ligne){
            console.log(" - Update Jour Ligne  - ")
            console.log(" - Initialisation - ")
        }
        let tmp_accident = this.accident;
        this.marche = true;
        this.boolaccident = false;
        this.dechets=0;
        this.production=0; 
        this.pollution=0;
        if(devlog_update_ligne){
            console.log("tmp_accident")
            console.log(tmp_accident)
            console.log("this.marche")
            console.log(this.marche)
            console.log("this.boolaccident")
            console.log(this.boolaccident)
            console.log("this.dechets")
            console.log(this.dechets)
            console.log("this.production")
            console.log(this.production)
            console.log("this.pollution")
            console.log(this.pollution)
        }
        for(let i=0; i<5; i++){
                if(this.Composant[i].auto){
                    if(devlog_update_ligne){
                        console.log(" - Auto : " + (i).toString() + " - ")
                        console.log(" - Debut accident - ")
                        console.log("this.boolpanne")
                        console.log(this.boolpanne)
                        console.log("this.boolaccident")
                        console.log(this.boolaccident)
                        console.log("tmp_accident")
                        console.log(tmp_accident)
                    }
                    if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i]);
                    if(devlog_update_ligne){
                        console.log(" - Fin accident - ")
                        console.log("this.boolpanne")
                        console.log(this.boolpanne)
                        console.log("this.boolaccident")
                        console.log(this.boolaccident)
                        console.log("tmp_accident")
                        console.log(tmp_accident)
                    }
                    if(!this.boolpanne&&!this.boolaccident){ // on revérifie
                        if(devlog_update_ligne){
                            console.log(" - Debut production - ")
                            console.log("this.dechets")
                            console.log(this.dechets)
                            console.log("this.production")
                            console.log(this.production)
                            console.log("this.pollution")
                            console.log(this.pollution)
                            console.log(" - Add - ")
                            console.log("+ this.Composant[i].production_auto()")
                            console.log(this.Composant[i].production_auto())
                            console.log("+ this.Composant[i].dechets_auto()")
                            console.log(this.Composant[i].dechets_auto())
                            console.log("+ this.Composant[i].pollution_auto()")
                            console.log(this.Composant[i].pollution_auto())
                        }

                        this.production += this.Composant[i].production_auto();
                        this.dechets += this.Composant[i].dechets_auto();
                        this.pollution += this.Composant[i].pollution_auto();

                        if(devlog_update_ligne){
                            console.log(" - Fin production - ")
                            console.log("this.dechets")
                            console.log(this.dechets)
                            console.log("this.production")
                            console.log(this.production)
                            console.log("this.pollution")
                            console.log(this.pollution)
                        }
                    }
                }
                else{
                    if(devlog_update_ligne) console.log(" - Normal : " + (i).toString() + " - ")
                    if(this.Composant[i].nbRobots+this.Composant[i].nbEmployes == 0) this.marche = false;
                    else{
                        if(devlog_update_ligne){
                            console.log(" - Debut accident - ")
                            console.log("this.boolpanne")
                            console.log(this.boolpanne)
                            console.log("this.boolaccident")
                            console.log(this.boolaccident)
                            console.log("tmp_accident")
                            console.log(tmp_accident)
                        }
                        if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i]);
                        if(devlog_update_ligne){
                            console.log(" - Fin accident - ")
                            console.log("this.boolpanne")
                            console.log(this.boolpanne)
                            console.log("this.boolaccident")
                            console.log(this.boolaccident)
                            console.log("tmp_accident")
                            console.log(tmp_accident)
                        }
                        if(!this.boolpanne&&!this.boolaccident){
                            if(devlog_update_ligne){
                                console.log(" - Debut production - ")
                                console.log("this.dechets")
                                console.log(this.dechets)
                                console.log("this.production")
                                console.log(this.production)
                                console.log("this.pollution")
                                console.log(this.pollution)
                            }
                            let qualTravail = Math.pow(this.cadence_travail(this.Composant[i]), this.Composant[i].nbEmployes) * Math.pow(3.5, this.Composant[i].nbRobots); // on recalcule si il y a eu de nouveaux accidents, rajouter d'autres modif par la suite en fonction des choix possibles
                            this.production += this.Composant[i].production_normal(qualTravail);//Composant[i].production*tmp_Uptime * (qualTravail^(Composant[i].nbEmployes)) * (3.5^(Composant[i].nbRobots))
                            this.dechets += this.Composant[i].dechets_normal(qualTravail);
                            this.pollution += this.Composant[i].pollution_normal(qualTravail);
                            
                            if(devlog_update_ligne){
                                console.log('QualTravail:')
                                console.log('cadence')
                                console.log(this.cadence_travail(this.Composant[i]))
                                console.log('nbemploye')
                                console.log(this.Composant[i].nbEmployes)
                                console.log('cadence^nbemploye')
                                console.log(Math.pow(this.cadence_travail(this.Composant[i]), this.Composant[i].nbEmployes))
                                console.log('nbrobot')
                                console.log(this.Composant[i].nbRobots)
                                console.log('3.5^nbRobots')
                                console.log(Math.pow(3.5, this.Composant[i].nbRobots))
                                
                                console.log(" - Fin production - ")
                                console.log("qualTravail")
                                console.log(qualTravail);
                                console.log("this.dechets")
                                console.log(this.dechets)
                                console.log("this.production")
                                console.log(this.production)
                                console.log("this.pollution")
                                console.log(this.pollution)
                            }
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

    cadence_travail(composant){ //return 1 + (composant.accident_normal()/*0->2*/) + (avantages/*0->1*/); première formule utilisée
        return (((2-composant.accident_normal())+(2*Choix.Avantages()))/4)
    }
    energie(){
        let tmpNRJ = 0;
        for(let i=0; i<5; i++) {
            if(this.Composant[i].auto){
                let m=true;
                for(let j=0; j<5; j++) {
                    if(!this.Composant[j].auto&&((this.Composant[j].nbEmployes+this.Composant[j].nbRobots)==0)) m = false;
                }
                if(m){
                    tmpNRJ += this.Composant[i].consomationNRJ;
                }
            }
            tmpNRJ += this.Composant[i].consomationNRJ * (this.Composant[i].nbEmployes + (2*this.Composant[i].nbRobots));
        }
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
        this.accident = 0.02;// remonter accident * (nbEmployes + (2*nbRobots))
    /* Variables qui évoluent */
        this.nbEmployes = 0;//on Stocke le nombre d'assignés, varie
        this.nbRobots = 0;

        if(devlog_init_composant){
            console.log(" - Initialisation Composant : Variables - ")
            console.log("this.carte")
            console.log(this.carte)
            console.log("this.auto")
            console.log(this.auto)
            console.log("this.consomationNRJ")
            console.log(this.consomationNRJ)
            console.log("this.dechets")
            console.log(this.dechets)
            console.log("this.pollution")
            console.log(this.pollution)
            console.log("this.production")
            console.log(this.production)
            console.log("this.accident")
            console.log(this.accident)
            console.log("this.nbEmployes")
            console.log(this.nbEmployes)
            console.log("this.nbRobots")
            console.log(this.nbRobots)
            console.log(" -              -    -    -             - ")
        }
    }
    accident_normal(){ // ARROW FUNCTION A FAIRE ? 
        return ((this.nbEmployes * (1-this.accident)*Choix.Securite_employes()) + (this.nbRobots * 2*(1-this.accident)*Choix.Securite_robot()));
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
    constructor(){//Fournisseurs :
        this.Principal = new Fournisseur(); // Renvoi vers un fournisseur
        this.Auxilliaire = new Fournisseur();
    }
    solde_NRJ1(uptimeMax){
        return (this.Principal.uptime(uptimeMax)*(100/uptimeMax)*this.Principal.prix);
    }
    solde_NRJ2(uptimeMax){
        return (this.Auxilliaire.uptime_Auxilliaire(uptimeMax, this.Principal)*(100/uptimeMax)*this.Auxilliaire.prix);
    }
}
class Fournisseur {
    constructor(){
        this.prix; // prix au KW/H
        this.pollution; // pollution produite par KW/H fournit
        this.coupure; // risques de coupure / possibilité de panne
    }
    uptime(uptimeMax){//Méthode de calcul de l'uptime sur le mois
        return (1-this.coupure)*uptimeMax
    }
    uptime_Auxilliaire(uptimeMax, Principal){
        return (this.uptime(uptimeMax - Principal.uptime(uptimeMax)))
    }
}

>>>>>>> Theo

    
        

<<<<<<< HEAD
    var cadre_gauche = new Cadre(10,10,620,270, 50, 0 ,0 ,0 ,0.7); // arrondi élevé en haut a gauche et léger en bas a gauche
    var cadre_bureau = new Cadre(250,370,800,280, 50, 50 ,0 ,0 ,1); // arrondi élevé en haut a gauche et léger en bas a gauche
    //var cadre_test = new Cadre(240,10,190,270);
    //var cadre_test1 = new Cadre(460,10,190,270);

    this.texte = scene.add.text(100, 15, "NRJ", { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });

    var pollutionPricipale = "pollutionPricipale";
    var dechetsPrincipale = "dechetsPrincipale";
    var empreintePollutionPricipale = "empreintePollutionPricipale";
    var empreinteDechetsPrincipale = "empreinteDechetsPrincipale";
    
    this.texte = scene.add.text(30, 45, pollutionPricipale + " / " + dechetsPrincipale , { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
    this.texte = scene.add.text(30, 65, empreintePollutionPricipale + " / " + empreinteDechetsPrincipale , { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });


    // taille/position de la camera a gerer
    //this.cameras.main.setSize(1600, 600); 
   //this.cameras.main.setBounds(0, 0, 800, 400).setName('main');

    //game.state.add('load', load);
    
    //Créer l'interface
    //  On initialise l'interface puis on la fixe a la camera avec :
    //      elem.fixedToCamera = true;
    // ====> TROUVER AUTRE CHOSE..

=======

function preload ()
{
    // TEST DE TILEMAP POUR L'USINE :
    // json fichier de config de la texture terre et eau
    this.load.json('map', 'tilemap/isometric-grass-and-water.json');
    // sprite fichier image terre et eau
    this.load.spritesheet('tiles', 'tilemap/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    // TEST D'AFFICHAGE DE LOGO + BARRE :
    this.load.image('argent', 'images/argent.png');
    this.load.image('ecologie', 'images/ecologie.png');
    this.load.image('machine', 'images/machine.png');
    this.load.image('progression', 'images/progression.png');
    this.load.image('salaires', 'images/salaires.png');
    this.load.image('salarie', 'images/salarie.png');
}

function create ()
{
    TEST = new Joueur(); // On essaye notre jeu
    TEST.Update_Mois();

    scene = this;

    //Test de tilemap pour l'usine
    buildMap();
    //Test d'icones + barre/texte
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
    //Test de cadre pour l'interface
    var cadre_gauche = new Cadre(10,10,190,270, 50, 0 ,0 ,0 ,0.7); 
    var cadre_bureau = new Cadre(250,370,800,280, 50, 50 ,0 ,0 ,1);

}
>>>>>>> Theo

function update ()
{
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
<<<<<<< HEAD
}


function update ()
{
    d = true;
    //this.cameras.main.scrollX = 800;
    
    
=======
>>>>>>> Theo
}