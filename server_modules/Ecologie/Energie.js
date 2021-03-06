//import fournisseur
const Fournisseur = require('./Fournisseur')

class Energie {
    constructor(){//Fournisseurs :
        this.Principal = new Fournisseur(); 
        this.Auxilliaire = new Fournisseur();
    }
    solde_NRJ1(uptimeMax){
        return (this.Principal.uptime(uptimeMax)*(100/uptimeMax)*this.Principal.prix);
    }
    solde_NRJ2(uptimeMax){
        return (this.Auxilliaire.uptime_Auxilliaire(uptimeMax, this.Principal)*(100/uptimeMax)*this.Auxilliaire.prix);
    }
}

module.exports = Energie;