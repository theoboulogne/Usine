//import composants
const Composant = require('./Composant')

class Ligne {
    constructor(){
        //Gestion des Pannes / Accidents
        this.accident = 0;
        this.boolaccident = false; // variable de gestion
        this.boolpanne = false; // possibilité de réparer
        
        //Composants de la machine
        this.Composant = [];
        for(let i=0; i<5; i++) this.Composant.push(new Composant());
    }
    
    Update(Choix){
        let tmp_accident = this.accident; // On enregistre le nombre d'accident
        this.marche = true;
        this.dechets=0;
        this.production=0;
        this.pollution=0;

        for(let i=0; i<5; i++){
            if(this.boolaccident) this.production-=7; // On reduit la production en cas d'accident
            this.boolaccident = false;
            if(this.Composant[i].auto){ // Si le composant est mécanisé
                if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i], Choix.securite); // on calcule si il y a un accident
                if(!this.boolpanne&&!this.boolaccident){ // on revérifie et on calcule la production, les dechets et la pollution

                    this.production += this.Composant[i].production_auto();
                    this.dechets += this.Composant[i].dechets_auto();
                    this.pollution += this.Composant[i].pollution_auto();
                }
            }
            else{
                if(this.Composant[i].nbRobots+this.Composant[i].nbEmployes == 0) this.marche = false; // Si il n'y a pas assez de composant on désactive la ligne de production
                else{
                    if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i], Choix.securite); // on calcule si il y a un accident
                    if(!this.boolpanne&&!this.boolaccident){
                        let qualTravail = Math.pow(this.cadence_travail(this.Composant[i], Choix), this.Composant[i].nbEmployes) * Math.pow(3, this.Composant[i].nbRobots); // on calcule la cadence de travail en fonction des choix et du ration employé/robots
                        this.production += this.Composant[i].production_normal(qualTravail); // on calcule avec ça la production, la pollution et les dechets
                        this.dechets += this.Composant[i].dechets_normal(qualTravail);
                        this.pollution += this.Composant[i].pollution_normal(qualTravail);
                    }
                }
            }   
        }
        if(this.boolaccident) this.boolaccident = false //on désactive la variable de traitement
        if(!this.marche) this.reset_update(tmp_accident);// on reset si il manque un employé sur un composant
    }
    reset_update(tmp_accident){ // on reset la production
        this.accident = tmp_accident;
        this.production = 0;
        this.dechets = 0;
        this.pollution = 0;
    }

    cadence_travail(composant, Choix){// on calcule la cadence de travail en fonction des choix
        return 2.9 + composant.accident_normal(Choix.securite) + (0.3*Choix.avantages);
    }
    energie(){ // on calcule l'energie consommée par la ligne
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
    accident_switch(composant, secu){ // on définit l'accident ou la panne en fonction du renvoi du composant
        switch(composant.Accident(secu)){
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
        }
    }
}

module.exports = Ligne;