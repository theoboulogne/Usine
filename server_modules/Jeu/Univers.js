const Joueur = require('./Joueur')

class Univers{
    constructor(n){
        this.Joueurs = new Object()
        this.Joueurs.nb = 0;
        this.NbJoueursMax = n // constante (nombre de joueurs par partie)
    }
    addJoueur(socketid){
        this.Joueurs.nb++;
        this.Joueurs[socketid] = new Object;
        this.Joueurs[socketid].joueur = (new Joueur(socketid))
        this.Joueurs[socketid].jouer = false;
    }
}
module.exports = Univers;