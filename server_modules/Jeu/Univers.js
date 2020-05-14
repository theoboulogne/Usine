const Joueur = require('./Joueur')
const Ventes = require('./Ventes')
const utils = require('../utils')

class Univers{
    constructor(n){
        this.Joueurs = new Object()
        this.Vente = new Ventes(n)
        this.NbJoueurs = 0;
        this.NbJoueursMax = n // constante (nombre de joueurs par partie)

        this.nbTour = 0;
    }
    addJoueur(socketid){
        this.NbJoueurs++; 
        this.Joueurs[socketid] = new Object;
        this.Joueurs[socketid].joueur = (new Joueur(socketid))
        this.Joueurs[socketid].jouer = false;
        this.Joueurs[socketid].choix = [];
    }
    addEvenement(Evenements, taille){
       let ChoixRenvoyes = [];
       for(let idx in this.Joueurs) {
            for(let i=0; i<taille; i++){
                if(Evenements[i].choix != undefined){
                    ChoixRenvoyes.push(Evenements[i]);
                    //l'evenement génère un choix ponctuel dans choixRenvoyes
                }
                else{ //l'evenement affecte uniquement des variables
                    if(Evenements[i].panne != undefined){
                        //On génère x pourcentage de pannes
                        let panne = (Evenements[i].panne.min/Math.abs(Evenements[i].panne.min))*(Math.random() * (Math.abs(Evenements[i].panne.max) - Math.abs(Evenements[i].panne.min)) + Math.abs(Evenements[i].panne.min));
                        for(let j = 0; j<this.Joueurs[idx].joueur.Lignes.length; j++){
                            if(utils.proba(panne)){
                                this.Joueurs[idx].joueur.Lignes[j].boolpanne = true;
                            }
                        }
                    }
                    if(Evenements[i].penurieStock != undefined){

                        let ratio = (Evenements[i].penurieStock.ratio.min/Math.abs(Evenements[i].penurieStock.ratio.min))*(Math.random() * (Math.abs(Evenements[i].penurieStock.ratio.max) - Math.abs(Evenements[i].penurieStock.ratio.min)) + Math.abs(Evenements[i].penurieStock.ratio.min));
                        this.Joueurs[idx].joueur.Approvisionnement.Capacite = ratio * this.Joueurs[idx].joueur.Approvisionnement.CapaciteMax;
                        let duree = (Evenements[i].penurieStock.duree.min/Math.abs(Evenements[i].penurieStock.duree.min))*(Math.random() * (Math.abs(Evenements[i].penurieStock.duree.max) - Math.abs(Evenements[i].penurieStock.duree.min)) + Math.abs(Evenements[i].penurieStock.duree.min));
                        this.Joueurs[idx].joueur.Approvisionnement.Penurie = Math.trunc(duree);
                    }
                    if(Evenements[i].crise != undefined){
                        //réduction du nombre de clients global
                        this.Vente.nbClientsTotal *= 0.5
                    }
                    if(Evenements[i].norme != undefined){
                        for(let j=0; j<Evenements[i].norme.length; j++){
                            let norme = (Evenements[i].norme[j].valeur.min/Math.abs(Evenements[i].norme[j].valeur.min))*(Math.random() * (Math.abs(Evenements[i].norme[j].valeur.max) - Math.abs(Evenements[i].norme[j].valeur.min)) + Math.abs(Evenements[i].norme[j].valeur.min));
                            this.Joueurs[idx].joueur.Choix.norme[Evenements[i].norme[j].nom] = norme;
                        }
                    }
                }
            }
        
        }
        return ChoixRenvoyes
    }

    calculScore(/* tout les joueurs */){
 
        const reducer = (accumulator, currentValue) => accumulator + currentValue; // pour calculer la somme d'un tableau
     
        let Score = [];  // pour stocker les scores de chaques joueur
     
        for (let i in this.Joueurs){
            let barres = this.Joueurs[i].joueur.barres(); // on ercupere les barres du joueur
     
            let score = barres.reduce(reducer); // on somme le tableau
     
            for (let j in barres){
                if(barres[j] < 10){ // si une barre est en dessou de 10% c'est perdu
                    score *= 0;
                }
                else{  // on multiplie par un coefficient proportionel au % de chaque barre
                    score *= ((barres[j] / 100) + 0.5);
                }
            }
     
            let Moula = Math.trunc(this.Joueurs[i].joueur.solde / 100000);  // on prend en compte l'argent du solde final
     
            if(Moula != 0){
                for(let j = 0; j < Math.abs(Moula); j++){  // on ajoute (ou retire) les points correspondants
                    score += ((Moula / Math.abs(Moula)) * 20);
                }
            }
     
            if(score < 0) score = 0;
     
            Score.push([Math.trunc(score), i]);
        }
        return Score;
    }

}
module.exports = Univers;