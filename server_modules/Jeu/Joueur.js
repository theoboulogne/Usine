//import dossier ecologie + dossier ligne + dossier cartes + proba + var globales :
const Ecologie = require('../Ecologie/Ecologie')
const Energie = require('../Ecologie/Energie')
//const Fournisseur = require('./Ecologie/Fournisseur')

const Ligne = require('../Ligne/Ligne')
//const Composant = require('./Ligne/Composant')


//const utils = require('./utils')


class Joueur{
    constructor(socket){

        this.socketid = socket;
        //Nombre de jours dans un mois
        this.uptimeMax = 30;
        //faire varier +1 / -1 ? 
        // ou retirer des jours pour laisser les wk end off en fonction des choix ?

        this.Choix = new Object();
        this.Choix.salaire = 1500
        this.Choix.solde = 0 // taxe
        this.Choix.norme = new Object(); // limites
        this.Choix.norme.pollution = -1
        this.Choix.norme.dechets = -1
        this.Choix.norme.production = -1
        this.Choix.avantages = 0
        this.Choix.securite = new Object(); // 0.5 - 1.5
        this.Choix.securite.employes = 1
        this.Choix.securite.robots = 1


        this.Eco = new Ecologie(); // Initialisation de l'écologie
        this.Eco.pollution = 0;
        this.Eco.dechets = 0;
        this.Empreinte = new Ecologie();
        this.Empreinte.pollution = 0;
        this.Empreinte.dechets = 0;


        //Gérer les fournisseurs principaux coté serveur ?
        this.Courant = new Energie();// Initialisation de l'énergie
        this.Courant.Principal.prix = 2;
        this.Courant.Principal.pollution = 6;
        this.Courant.Principal.coupure = 0.5;
        this.Courant.Auxilliaire.prix = 8;
        this.Courant.Auxilliaire.pollution = 15;
        this.Courant.Auxilliaire.coupure = 0.2;


        this.solde = 1000000;// Initialisation des ventes


        this.nbEmployes = 15;// Initialisation de la production
        this.nbRobots = 0;
        this.nbEmployes_dispo = 15;
        this.nbRobots_dispo = 0;
        
        this.stock = 0 // produits en stock
        this.variationStock = -1

        this.Lignes = [];
        this.Lignes.push(new Ligne()); // une ligne par défault
        
        this.nbTour = -1
    }

    Update_Mois(){ // Fonctionnement d'un mois
        //Reset des variables de stockage des infos du mois + calcul du nombre de jours de fonctionnement
        this.consommationNRJ = 0;
        let uptimeNRJ = this.Courant.Principal.uptime(this.uptimeMax) + ((this.uptimeMax - this.Courant.Principal.uptime(this.uptimeMax))*(1-this.Courant.Auxilliaire.coupure));

        for(let i=0; i<uptimeNRJ; i++){ // On effectue notre mois
            this.Update_Jour()
        }
        //Calcul et facture de fin de mois


        this.solde += this.Choix.Solde()/* + Ventes .. */ - ((this.consommationNRJ * (this.Courant.solde_NRJ1(this.uptimeMax) + this.Courant.solde_NRJ2(this.uptimeMax))) + this.solde_salaires());
        

    }
    Update_Jour(){ // Fonctionnement d'une journée
        for(let i=0; i<24; i++){
            if(i==6||i==14){// | 6 : 00 h | 14 : 00 h | -> Rajoute employes + Robots

                this.add_ouvriers()

            }// definir la var marche de la machine a ce moment la pour retirer du traitement ?
            if(i==12||i==18){// | 12 : 00 h | 18 : 00 h | -> Retire les employes 

                this.retirer_employe() // ( on laisse les robots ils tournent 24/24 actuellement, a changer )
                
            } 

            this.consommation()


            this.Update_Lignes(); 


            this.empreinte()

        }
    }
    Update_Lignes(){ //Fait fonctionner les machines une heure
        let tmpChoix = new Object;
        tmpChoix.avantages = this.Choix.avantages
        tmpChoix.securite.employes = this.Choix.securite.employes
        tmpChoix.securite.robots = this.Choix.securite.robots

        for(let i=0; i<this.Lignes.length; i++) {
            this.Lignes[i].Update(tmpChoix);
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
        return Math.log((this.Choix.Salaire()/300) - (17*this.Choix.Avantages()))
    }
    solde_salaires(){ // modifier les salaires pour les week ends
        return (this.Choix.Salaire()*this.nbEmployes);
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

module.exports = Joueur;