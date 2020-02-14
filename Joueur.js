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