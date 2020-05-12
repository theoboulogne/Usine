const Joueur = require('./Joueur')
const Ventes = require('./Ventes')

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
                    ChoixRenvoyes.push(Evenements[i].choix);
                    //l'evenement génère un choix ponctuel dans choixRenvoyes
                }
                else{ //l'evenement affecte uniquement des variables
                    if(Evenements[i].panne != undefined){
                        //On génère x pourcentage de pannes
                        let nbMachine = this.Joueurs[idx].joueur.Lignes.lenght;
                        let panne = (Evenements[i].panne.min/Math.abs(Evenements[i].panne.min))*(Math.random() * (Math.abs(Evenements[i].panne.max) - Math.abs(Evenements[i].panne.min)) + Math.abs(Evenements[i].panne.min));
                        let nbPannes = nbMachine * panne / 100;
                        for(let j = 0; j<this.Joueurs[idx].joueur.Lignes.lenght; j++){
                            if(nbPannes>0){
                                this.Joueurs[idx].joueur.Lignes[j].boolpanne = true;
                                nbPannes--;
                            }
                        }
                    }
                    if(Evenements[i].penurieStock != undefined){
                        let ratio = (Evenements[i].penurieStock.ratio.min/Math.abs(Evenements[i].penurieStock.ratio.min))*(Math.random() * (Math.abs(Evenements[i].penurieStock.ratio.max) - Math.abs(Evenements[i].penurieStock.ratio.min)) + Math.abs(Evenements[i].penurieStock.ratio.min));
                        this.Joueurs[idx].joueur.Approvisionnement.Capacite = ratio * this.Joueurs[idx].joueur.Approvisionnement.CapaciteMax;
                        let duree = (Evenements[i].penurieStock.duree.min/Math.abs(Evenements[i].penurieStock.duree.min))*(Math.random() * (Math.abs(Evenements[i].penurieStock.duree.max) - Math.abs(Evenements[i].penurieStock.duree.min)) + Math.abs(Evenements[i].penurieStock.duree.min));
                        this.Joueurs[idx].joueur.Approvisionnement.Penurie = duree;
                    }
                    if(Evenements[i].crise != undefined){
                        //réduction du nombre de clients global
                        this.Vente.nbClientsTotal *= 0.7
                    }
                    if(Evenements[i].norme != undefined){
                        for(let j=0; j<Evenements[i].norme.lenght; j++){
                            let norme = (Evenements[i].norme[j].valeur.min/Math.abs(Evenements[i].norme[j].valeur.min))*(Math.random() * (Math.abs(Evenements[i].norme[j].valeur.max) - Math.abs(Evenements[i].norme[j].valeur.min)) + Math.abs(Evenements[i].norme[j].valeur.min));
                            this.Joueurs[idx].joueur.norme[Evenements[i].norme[j].nom] = norme;
                        }
                    }
                }
            }
        
        }
        return ChoixRenvoyes
    }
}
module.exports = Univers;