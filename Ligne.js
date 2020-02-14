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
                            // on recalcule si il y a eu de nouveaux accidents, rajouter d'autres modif par la suite en fonction des choix possibles
                            let qualTravail = this.cadence_travail(this.Composant[i])*(this.Composant[i].nbEmployes+this.Composant[i].nbRobots)
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