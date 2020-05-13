//import dossier ecologie + dossier ligne + dossier cartes + proba + var globales :
const Ecologie = require('../Ecologie/Ecologie')
const Energie = require('../Ecologie/Energie')
//const Fournisseur = require('./Ecologie/Fournisseur')

const Ligne = require('../Ligne/Ligne')
//const Composant = require('./Ligne/Composant')


const Repetition = require('../Choix/Repetition')
const Ponctuel = require('../Choix/Ponctuel')
const Amelioration = require('../Choix/Amelioration')

//const utils = require('./utils')


class Joueur{
    constructor(socket){

        this.socketid = socket;
        this.repetition = new Repetition();
        this.amelioration = new Amelioration();
        this.ponctuel = new Ponctuel();
        //Nombre de jours dans un mois
        this.uptimeMax = 30;
        //faire varier +1 / -1 ? 
        // ou retirer des jours pour laisser les wk end off en fonction des choix ?

        this.Choix = new Object();
        this.Choix.salaire = 1500;
        this.Choix.solde = 5000; // paiement par mois
        this.Choix.norme = new Object(); // limites
        this.Choix.norme.pollution = -1
        this.Choix.norme.dechets = -1;
        this.Choix.norme.salaire = -1;
        this.Choix.avantages = 0;
        this.Choix.securite = new Object(); // 0.5 - 1.5
        this.Choix.securite.employes = 1;
        this.Choix.securite.robots = 1;

        this.pollution = 1;
        this.dechets = 1;
        this.Eco = new Ecologie(); // Initialisation de l'écologie
        this.Eco.pollution = 0;
        this.Eco.dechets = 0;
        this.Empreinte = new Ecologie();
        this.Empreinte.pollution = 0;
        this.Empreinte.dechets = 0;


        //Gérer les fournisseurs principaux coté serveur ?
        this.energie = 1;
        this.Courant = new Energie();// Initialisation de l'énergie
        this.Courant.Principal.prix = 15;
        this.Courant.Principal.pollution = 12;
        this.Courant.Principal.coupure = 0.4;
        this.Courant.Auxilliaire.prix = 10;
        this.Courant.Auxilliaire.pollution = 30;
        this.Courant.Auxilliaire.coupure = 0.5;

        this.Approvisionnement = new Object();
        this.Approvisionnement.Capacite = 2000;//Actuelle
        this.Approvisionnement.CapaciteMax = 2000;//Maximale
        this.Approvisionnement.Penurie = -1;

        this.solde = 1000000;// Initialisation des ventes
        this.soldePrec = 1000000;
        this.pub = 0;
        this.pubPrec = 0;

        this.production = 1;
        this.nbEmployes = 10;// Initialisation de la production
        this.nbRobots = 0;
        this.nbEmployes_dispo = 10;
        this.nbRobots_dispo = 0;
        
        this.stock = 0 // produits en stock

        this.Lignes = [];
        this.Lignes.push(new Ligne()); // une ligne par défault
    }

    Update_Approvisionnement(){
        if(this.Approvisionnement.Penurie > -1){
            if(this.Approvisionnement.Penurie == 0){
                this.Approvisionnement.Capacite = this.Approvisionnement.CapaciteMax;
            }
            this.Approvisionnement.Penurie--;
        }
    }

    Update_Mois(){ // Fonctionnement d'un mois
        //Reset des variables de stockage des infos du mois + calcul du nombre de jours de fonctionnement
        this.consommationNRJ = 0;
        let uptimeNRJ = this.Courant.Auxilliaire.uptime(this.uptimeMax) + ((this.uptimeMax - this.Courant.Auxilliaire.uptime(this.uptimeMax))*(1-this.Courant.Principal.coupure));

        this.Update_Approvisionnement();

        for(let i=0; i<uptimeNRJ; i++){ // On effectue notre mois
            this.Update_Jour()
        }

        //Calcul et facture de fin de mois
        this.solde -= this.Choix.solde/* paiement par mois */
        this.solde -= (this.consommationNRJ * (this.Courant.solde_NRJ1(this.uptimeMax)))
        this.solde -= (this.consommationNRJ * (this.Courant.solde_NRJ2(this.uptimeMax))) 
        this.solde -= this.solde_salaires();

    }
    Update_Jour(){ // Fonctionnement d'une journée
        for(let i=0; i<24; i++){
            if(i==6||i==14){// | 6 : 00 h | 14 : 00 h | -> Rajoute employes + Robots

                this.add_ouvriers()

            }// definir la var marche de la machine a ce moment la pour retirer du traitement ?
            if(i==12||i==22){// | 12 : 00 h | 18 : 00 h | -> Retire les employes 

                this.retirer_employe() // ( on laisse les robots ils tournent 24/24 actuellement, a changer )
                
            } 

            this.consommation()


            this.Update_Lignes(); 


            this.empreinte()

        }
    }
    Update_Lignes(){ //Fait fonctionner les machines une heure
        let tmpChoix = new Object;
        tmpChoix.securite = new Object();

        tmpChoix.avantages = this.Choix.avantages
        tmpChoix.securite.employes = this.Choix.securite.employes
        tmpChoix.securite.robots = this.Choix.securite.robots

        let production = 0;
        for(let i=0; i<this.Lignes.length; i++) {
            if(production < this.Approvisionnement.Capacite) this.Lignes[i].Update(tmpChoix);
            if(production+(this.production*this.Lignes[i].production) < this.Approvisionnement.Capacite) production += this.production*this.Lignes[i].production; 
        }
        this.stock += production;
        //Récupérer les infos ensuite
    }

    //Faire le même type de fonction pour tout ?
    consommation(){ // Récupère la consommation sur une heure

        for(let i=0; i<this.Lignes.length; i++) this.consommationNRJ += (this.energie * this.Lignes[i].energie());
    }
    empreinte(){ // Récupère les infos écologiques sur une heure
        this.Eco.pollution =  this.pollution * (1/5000) * ((this.Courant.Principal.pollution * (this.Courant.solde_NRJ1(this.uptimeMax)/this.Courant.Principal.prix)) + (this.Courant.Auxilliaire.pollution * (this.Courant.solde_NRJ2(this.uptimeMax)/this.Courant.Auxilliaire.prix)));
        this.Eco.dechets = 0;
        for(let i=0; i<this.Lignes.length; i++){
            this.Eco.pollution += (this.Lignes[i].pollution*this.pollution);
            this.Eco.dechets += (this.Lignes[i].dechets*this.dechets);
        }
        this.Empreinte.pollution += this.Eco.pollution;
        this.Empreinte.dechets += this.Eco.dechets;
    }

    avantages(){ // si salaire = 3300 -> = 1 | si salaire = 600 -> = 0
        return Math.log((this.Choix.salaire/300) - (17*this.Choix.avantages))
    }
    solde_salaires(){ // modifier les salaires pour les week ends
        return (this.Choix.salaire*this.nbEmployes);
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
            while(this.nbEmployes_dispo+this.nbRobots_dispo>0) { // On remplit les lignes une par une et on rempli au maximum la dernière si on peut pas en faire fonctionner une nouvelle
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

    
    avantAchat(){
        let infoBoutique = new Object();
        infoBoutique.employes = this.nbEmployes;
        infoBoutique.robots = this.nbRobots;
        infoBoutique.lignes = this.Lignes.length;
        infoBoutique.prix = new Object();
        infoBoutique.prix.robots = 35000;
        infoBoutique.prix.employes = 0;
        infoBoutique.prix.lignes = 500000;
        infoBoutique.solde = this.solde;
        return infoBoutique;
    }
    apresAchat(infoBoutique){
        let coeffRobots = infoBoutique.robots - this.nbRobots;
        let coeffLignes = infoBoutique.lignes - this.Lignes.length;
        let coeffSolde = this.solde - infoBoutique.solde
        if(coeffRobots * 35000 + coeffLignes * 500000 == coeffSolde){
            this.nbRobots = infoBoutique.robots;
            this.nbEmployes = infoBoutique.employes;
            this.solde = infoBoutique.solde;
            for(let i = 0; i < coeffLignes; i++){
                this.Lignes.push(new Ligne());
            }
        }
    }
    
    barres(nbTour){

        //////////////////////////////////////////////////////////////////////////////////////////////
        //avantages / securite / salaire / cadence prod
        //    0.3       0.2       0.3          0.2

        let Social_Avantages = 0.3 * this.avantages;
        if(Social_Avantages > 0.3) Social_Avantages = 0.3;
        if(Social_Avantages < 0) Social_Avantages = 0;

        let Social_Salaire = this.Choix.salaire;
        if(Social_Salaire < 1300) Social_Salaire = 1300;
        if(Social_Salaire > 1700) Social_Salaire = 1700;
        Social_Salaire = ((Social_Salaire - 1300) / 400 ) * 0.3

        let Social_Securite = (this.Choix.securite.employes-0.5) * 0.2
        if (Social_Securite > 0.2) Social_Securite = 0.2
        if (Social_Securite < 0) Social_Securite = 0

        let Social_Prod = this.production * 0.2
        if(Social_Prod > 0.2) Social_Prod = 0.2
        if(Social_Prod < 0) Social_Prod = 0

        let Social = Social_Avantages + Social_Salaire + Social_Securite + Social_Prod;

        //////////////////////////////////////////////////////////////////////////////////////////////
        // Courant / pollution / dechets / normes
        //   0.30      0.35       0.35

        let Ecologie_Courant = (1 - (this.Courant.Auxilliaire.uptime(this.uptimeMax) * this.Courant.Auxilliaire.pollution / 30 * this.uptimeMax) + ((this.uptimeMax - this.Courant.Auxilliaire.uptime(this.uptimeMax))*(1-this.Courant.Principal.coupure)) / this.uptimeMax )
        if(this.energie > 1.2) Ecologie_Courant *= 1.2
        else if(this.energie < 0.5) Ecologie_Courant *= 0.5
        else Ecologie_Courant *= this.energie
        if(Ecologie_Courant > 1) Ecologie_Courant = 1 
        if(Ecologie_Courant < 0) Ecologie_Courant = 0
        Ecologie_Courant *= 0.3

        let Ecologie_Pollution = 0.5;
        if(this.pollution > 1.5) Ecologie_Pollution /= 1.5
        else if(this.pollution < 0.6) Ecologie_Pollution /= 0.6
        else Ecologie_Pollution /= this.pollution
        Ecologie_Pollution = (Ecologie_Pollution - 0.3) / 0.6
        Ecologie_Pollution *= 0.35

        let Ecologie_Dechets = 0.5;
        if(this.dechets > 1.5) Ecologie_Dechets /= 1.5
        else if(this.dechets < 0.6) Ecologie_Dechets /= 0.6
        else Ecologie_Dechets /= this.dechets
        Ecologie_Dechets = (Ecologie_Dechets - 0.3) / 0.6
        Ecologie_Dechets *= 0.35

        if((Ecologie_Pollution / 0.35) < this.Choix.norme.pollution) {
            Ecologie_Pollution = 0
            Ecologie_Courant /= 2
            this.solde -= 10000
        }
        if((Ecologie_Dechets / 0.35) < this.Choix.norme.dechets) {
            Ecologie_Dechets = 0
            Ecologie_Courant /= 2
            this.solde -= 10000
        }

        let Ecologie = Ecologie_Courant + Ecologie_Pollution + Ecologie_Dechets;

        //////////////////////////////////////////////////////////////////////////////////////////////
        // Cadence prod / securite / employes inactifs / composants ameliores / nb de ligne
        //     0.35           0.1             0.1                  0.3                0.15

        let Production_Cadence = 0.5
        if(this.production > 2) Production_Cadence = 1;
        if(this.production < 0) Production_Cadence = 0;
        Production_Cadence *= this.production;
        Production_Cadence *= 0.35

        let Production_Securite = ((0.6*(this.Choix.securite.employes-0.5)) + (0.4*(this.Choix.securite.robots-0.5)))* 0.1
        if (Production_Securite > 0.1) Production_Securite = 0.1
        if (Production_Securite < 0) Production_Securite = 0

        let nb = this.nbEmployes+this.nbRobots
        let auto = 0
        let Production_Employes_inactifs;
        for(let i=0; i<this.Lignes.length; i++) for(let j=0; j<5; j++) if(this.Lignes[i].Composant[j].auto) auto++
        if(nb > (10 * this.Lignes.length) - auto) {
            Production_Employes_inactifs = 0;
        }
        else{
            Production_Employes_inactifs = 0.1;
        }
        
        let Production_Composant = (auto / (3 * this.Lignes.length)) * 0.3
        if (Production_Composant > 0.3) Production_Composant = 0.3
        if (Production_Composant < 0) Production_Composant = 0

        let Production_Ligne = (this.Lignes.length / 5) * 0.15


        let Production = Production_Cadence + Production_Composant + Production_Employes_inactifs + Production_Securite + Production_Ligne

        //////////////////////////////////////////////////////////////////////////////////////////////
        // Budget Pub / Barre production / par rapport au tour precedent
        //      0.35            0.15                0.50                                                                

        if(this.Choix.solde < 0) this.Choix.solde = 0

        let Croissance_Pub = this.Choix.solde / 13000
        if(Croissance_Pub < 0) Croissance_Pub = 0
        if(Croissance_Pub > 1) Croissance_Pub = 1
        Croissance_Pub *= 0.35
        if(this.pubPrec>1000) Croissance_Pub = 0.35

        let Croissance_Production = Production * 0.15

        let Croissance_Solde = Math.trunc(this.solde) / Math.trunc(this.soldePrec) - 0.56;
        if (Croissance_Solde > 0.6) Croissance_Solde = 0.6;
        if (Croissance_Solde < 0) Croissance_Solde = 0;
        Croissance_Solde /= 0.7;
        Croissance_Solde *= 0.5;

        this.soldePrec = this.solde;


        let Croissance = Croissance_Pub + Croissance_Production + Croissance_Solde;

        //////////////////////////////////////////////////////////////////////////////////////////////

        return [Croissance*100, Social*100, Ecologie*100, Production*100]

        //////////////////////////////////////////////////////////////////////////////////////////////
    }

    infosAfficher(){
        let solde = Math.trunc(this.solde)
        let soldeString = ""

        if(solde >= 1000000){
            soldeString += String(Math.floor(solde/1000000))
            soldeString += " Millions "
            solde -= Math.floor(solde/1000000) * 1000000
        }

        if(solde >= 1000){
            soldeString += String(Math.floor(solde/1000))
            soldeString += " Milles "
            solde -= Math.floor(solde/1000) * 1000
        }
        
        soldeString += String(solde)
        soldeString += " € "

        return [soldeString, String(this.Choix.salaire) + " € / mois ", String(this.Choix.solde) + " € / mois "];
    }
}

module.exports = Joueur;