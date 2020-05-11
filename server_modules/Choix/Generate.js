const utils = require('../utils')
const fs = require('fs');

//Chargement des données à partir des fichiers en mémoire en amount pour éviter les problèmes de latence :
let rawdata = fs.readFileSync(__dirname+'/json/Amelioration.json');
let ameliorations = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname+'/json/Evenement.json');
let evenement = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname+'/json/Repetition.json');
let repetition = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname+'/json/Ponctuel.json');
let ponctuel = JSON.parse(rawdata);

module.exports = {
    Amelioration : (categories, solde, amelioration) => {
        Amelio = []
        for(let i=0; i<categories.length; i++){
            for(let j=0; j<ameliorations[categories[i]].length; j++){
                if(!amelioration.check(categories[i], ameliorations[categories[i]][j].amelio)){ // si pas déja faite
                    if(ameliorations[categories[i]][j].prix < solde){
                        let ameliobool = true;
                        for(let k=0; k<ameliorations[categories[i]][j].amelioNecessaire.length; k++){
                            if(!amelioration.check(ameliorations[categories[i]][j].amelioNecessaire[k].categorie, ameliorations[categories[i]][j].amelioNecessaire[k].amelio)){
                                ameliobool = false;
                            }
                        }
                        if(ameliobool){
                            Amelio.push({categorie:categories[i], desc:ameliorations[categories[i]][j].desc, amelio:ameliorations[categories[i]][j].amelio, nbTour:ameliorations[categories[i]][j].nbTour});
                        }
                    }
                }
            }
        }
        return Amelio;
    },
    AmeliorationDisplay : (amelios) => {
        let display = []
        for(let i=0; i<amelios.length; i++){
            display.push({categorie:amelios[i].categorie, nom:amelios[i].amelio, desc:amelios[i].desc, cout:amelios[i].nbTour.toString()+" tours"})
        }
        return display;
    },
    Evenement : (tour) => {
        /*
        récup les infos a afficher pour le joueur a faire
        */
        Events = []
        if(tour%3 == 0 && tour>10){
            for(let i=0; i<evenement.length; i++){
                if(utils.proba(evenement[i].proba)){
                    Events.push(evenement[i].event);
                }
            }
        }
        return Events;
    },
    EvenementDisplay : (evenements) => {
        let display = []
        for(let i=0; i<evenements.length; i++){
            display.push(evenements.nom)
        }
        return display;
    },
    EvenementChoixDisplay : (evenements) => {
        let display = []
        for(let i=0; i<evenements.length; i++){
            display.push({categorie:"Evenement", nom:evenements[i].nom, desc:evenements[i].desc, cout:evenements[i].cout})
        }
        return display;
    },
    initRepetition : () => {
        /*
        à mettre dans generateRepetition à l'init
        */
        return Object.getOwnPropertyNames(repetition);
    },
    Repetition : (categories, solde, amelioration) => { // prend en entrée la sortie de répétition
        let Choix = [];
        for(let i=0; i<categories.length; i++){
            for(let j=0; j<repetition[categories[i]].length; j++){ // plusieurs if pour réduire le cout en mémoire quand le choix n'est pas possible
                if(repetition[categories[i]][j].prix == undefined || repetition[categories[i]][j].prix < solde){
                    let ameliorationbool = false;
                    if(repetition[categories[i]][j].amelioration == undefined) ameliorationbool = true;
                    else{
                        if(amelioration.check(categories[i], repetition[categories[i]][j].amelioration)) ameliorationbool = true;
                    }
                    if(ameliorationbool) if(utils.proba(repetition[categories[i]][j].proba)){
                        Choix.push({categorie:categories[i], nbTour:repetition[categories[i]][j].nbTour, choix:repetition[categories[i]][j].choix})
                    }
                }
            }
        }
        return Choix;
    },
    Ponctuel : (ponctuelFait, solde, amelioration) => {
        let Choix = [];
        for(let i=0; i<ponctuel.length; i++){
            if(utils.proba(ponctuel[i].proba)){ // plusieurs if pour réduire le cout en mémoire quand le choix n'est pas possible
                for(let j=0; j<ponctuel[i].variations.length; j++){
                    if(!ponctuelFait.check(ponctuel[i].nom, ponctuel[i].variations[j].nom)){ // Si pas déjà fait
                        if(ponctuel[i].variations[j].prix == undefined || ponctuel[i].variations[j].prix < solde){ // si assez d'argent
                            let ameliorationbool = false;
                            if(ponctuel[i].variations[j].amelioration == undefined) ameliorationbool = true;
                            else{
                                if(amelioration.check(ponctuel[i].nom, ponctuel[i].variations[j].amelioration)) ameliorationbool = true;
                            }
                            if(ameliorationbool) if(utils.proba(ponctuel[i].variations[j].proba)){ // si amélio nécessaire faite
                                Choix.push({categorie:ponctuel[i].nom, choix:ponctuel[i].variations[j].choix})
                            }
                        }
                    }
                }
            }
        }
        return Choix;
    },
    ChoixDisplay : (choix) => {
        let display = []
        for(let i=0; i<choix.length; i++){
            display.push({categorie:choix[i].categorie, nom:choix[i].choix.nom, desc:choix[i].choix.desc, cout:choix[i].choix.cout})
        }
        return display;
    }
};