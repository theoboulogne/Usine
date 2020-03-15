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
        return this.dechets * qualTravail * Math.pow(1.02, this.nbRobots);
    }
    pollution_normal(qualTravail){
        return this.pollution * (qualTravail/100);
    }

    production_auto(){ // 3.5 et 1.12 a mettre en variable en fonction d'un choix (efficacite robots)
        return (this.production-this.dechets) * (Math.pow(3.5,2));
    }
    dechets_auto(){
        return this.dechets ;// on met pas la puissance pour dechets car la machine automatique est plus performante
    }
    pollution_auto(){
        return this.pollution * (Math.pow(1.1,2));
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