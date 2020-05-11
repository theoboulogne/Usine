//import composant + choix + var globales
const Composant = require('./Composant')

class Ligne {
    constructor(){
        //Gestion des Pannes / Accidents
        this.coutReparation = 8000; // cout de réparation fixe en cas de panne
        this.accident = 0;
        this.boolaccident = false;
        this.boolpanne = false; // possibilité de réparer par probabilité sinon fin de la machine

        
        //Composants de la machine
        this.Composant = [];
        for(let i=0; i<5; i++) this.Composant.push(new Composant());
        
    }
    
    Update(Choix){
        let tmp_accident = this.accident;
        this.marche = true;
        this.dechets=0;
        this.production=0; 
        this.pollution=0;


        for(let i=0; i<5; i++){
            if(this.boolaccident) this.production-=7;
            this.boolaccident = false;
            if(this.Composant[i].auto){
                if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i], Choix.securite);
                if(!this.boolpanne&&!this.boolaccident){ // on revérifie

                    this.production += this.Composant[i].production_auto();
                    this.dechets += this.Composant[i].dechets_auto();
                    this.pollution += this.Composant[i].pollution_auto();

                }
            }
            else{
                if(this.Composant[i].nbRobots+this.Composant[i].nbEmployes == 0) this.marche = false;
                else{
                    if(!this.boolpanne&&!this.boolaccident) this.accident_switch(this.Composant[i], Choix.securite);
                    if(!this.boolpanne&&!this.boolaccident){
                        let qualTravail = Math.pow(this.cadence_travail(this.Composant[i], Choix), this.Composant[i].nbEmployes) * Math.pow(3.3, this.Composant[i].nbRobots); // on recalcule si il y a eu de nouveaux accidents, rajouter d'autres modif par la suite en fonction des choix possibles
                        this.production += this.Composant[i].production_normal(qualTravail);//Composant[i].production*tmp_Uptime * (qualTravail^(Composant[i].nbEmployes)) * (3.5^(Composant[i].nbRobots))
                        this.dechets += this.Composant[i].dechets_normal(qualTravail);
                        this.pollution += this.Composant[i].pollution_normal(qualTravail);
                        
                        this.qualtravail = qualTravail;
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

    cadence_travail(composant, Choix){ //return 1 + (composant.accident_normal()/*0->2*/) + (avantages/*0->1*/); première formule utilisée
        return 2.9 + composant.accident_normal(Choix.securite) + (0.3*Choix.avantages);
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
    accident_switch(composant, secu){
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
            //else console.log("Error Add Composant Ligne"); return; // error pas d'emplacement trouver
        }
    }
}

module.exports = Ligne;