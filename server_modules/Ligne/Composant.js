//import proba + Choix + var globale
const utils = require('../utils')

class Composant {

    constructor(){
        // a deplacer dans une fonction qui prend un json en entree si possible
    /* Variables Fixes par rapport au composant sélectionné */
        this.carte=(""); // nom et description a l'affichage
        this.auto = false; // besoin d'un employé pour fonctionner ?
        this.consomationNRJ = 0.003;// remonter la consomation par production
        this.dechets = 0.026;// remonter dechets de ce composant
        this.pollution = 0.09;// remonter pollution de ce composant
        this.production = 0.04;// remonter nbEmployes*production ou production + (nbEmployes*prod/employe) // si pas d'employés on bloque la machine
        this.accident = 0.002;// remonter accident * (nbEmployes + (2*nbRobots))
    /* Variables qui évoluent */
        this.nbEmployes = 0;//on Stocke le nombre d'assignés, varie
        this.nbRobots = 0;
    }
    accident_normal(securite){
        let securiteInfo = securite
        if(securite.employes < 0.5) securiteInfo.employes = 0.5;

        return ((1-this.accident)*securiteInfo.employes - 0.5)/10
    }
    production_normal(qualTravail){ 
        return this.production * qualTravail; // 8.5
    }
    dechets_normal(qualTravail){
        return this.dechets * ((12 - qualTravail)) * Math.pow(1.12, this.nbRobots);
    }
    pollution_normal(qualTravail){
        return this.pollution * ((12 - qualTravail)) * Math.pow(1.12, this.nbRobots);
    }

    production_auto(){ // 3.5 et 1.12 a mettre en variable en fonction d'un vars.Choix (efficacite robots)
        return (this.production) * (Math.pow(2.8,2)); //12
    }
    dechets_auto(){
        return this.dechets * 1.5;// on met pas la puissance pour dechets car la machine automatique est plus performante
    }
    pollution_auto(){
        return this.pollution * (Math.pow(3.5,2))/3;
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
    Accident(secu){ // génération d'une proba d'accident
        if(utils.proba(this.proba_Accident(secu))){
            if(utils.proba(this.proba_Accident(secu)/4)){
                return 2;
            }
            return 1;
        }
        return 0;
    }
    proba_Accident(securite){        
        if(this.auto){
            return this.accident * 2;
        }
        else {
            let securiteInfo = securite
            if(securite.employes < 0.5) securiteInfo.employes = 0.5;
            if(securite.robots < 0.5) securiteInfo.robots = 0.5;
            
            return (this.accident *((this.nbEmployes*(((securiteInfo.employes - 0.5) * 0.3) + 0.85 )) + (2*this.nbRobots*(((securiteInfo.robots - 0.5) * 0.3) + 0.80) )));
        }
    }
}
module.exports = Composant;