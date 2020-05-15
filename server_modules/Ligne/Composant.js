//import proba + Choix + var globale
const utils = require('../utils')

class Composant {

    constructor(){
    /* Variables Fixes par rapport au composant sélectionné */
        this.carte=(""); // nom et description a l'affichage
        this.auto = false;
        this.consomationNRJ = 0.003;
        this.dechets = 0.026;
        this.pollution = 0.09;
        this.production = 0.04;
        this.accident = 0.002;
    /* Variables qui évoluent */
        this.nbEmployes = 0;//on Stocke le nombre d'ouvriers assignés, varie
        this.nbRobots = 0;
    }
    accident_normal(securite){
        let securiteInfo = securite
        if(securite.employes < 0.5) securiteInfo.employes = 0.5;

        return ((1-this.accident)*securiteInfo.employes - 0.5)/10
    }
    production_normal(qualTravail){ 
        return this.production * qualTravail;
    }
    dechets_normal(qualTravail){
        return this.dechets * ((12 - qualTravail)) * Math.pow(1.12, this.nbRobots);
    }
    pollution_normal(qualTravail){
        return this.pollution * ((12 - qualTravail)) * Math.pow(1.12, this.nbRobots);
    }

    production_auto(){
        return (this.production) * (Math.pow(2.8,2));
    }
    dechets_auto(){
        return this.dechets * 1.5;
    }
    pollution_auto(){
        return this.pollution * (Math.pow(3.5,2))/3;
    }
    Vider(){
        this.nbEmployes = 0;
        this.nbRobots = 0;
    }
    Add(type){
        if(!this.auto){
            switch(type){
                case 0:
                    this.nbEmployes+=1;
                    return true;
                case 1:
                    this.nbRobots+=1;
                    return true;
            }
        }
        return false;
    }
    Accident(secu){ // génération d'une proba d'accident et si il y a accident on regarde si il y a une panne
        if(utils.proba(this.proba_Accident(secu))){
            if(utils.proba(this.proba_Accident(secu)/2)){
                return 2;
            }
            return 1;
        }
        return 0;
    }
    proba_Accident(securite){ // on calcule la proba d'accident pour la générer ensuite
        if(this.auto){
            return this.accident * 2;
        }
        else { // on calcule en fonction des choix pour les ouvriers
            let securiteInfo = securite
            if(securite.employes < 0.5) securiteInfo.employes = 0.5;
            if(securite.robots < 0.5) securiteInfo.robots = 0.5;
            
            return (this.accident *((this.nbEmployes*(((securiteInfo.employes - 0.5) * 0.3) + 0.85 )) + (2*this.nbRobots*(((securiteInfo.robots - 0.5) * 0.3) + 0.80) )));
        }
    }
}
module.exports = Composant;