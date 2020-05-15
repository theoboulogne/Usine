class Fournisseur {
    constructor(){
        this.prix; // prix
        this.pollution; // pollution produite
        this.coupure; // taux de coupure
    }
    uptime(uptimeMax){// Nombre de jours actifs sur le mois
        return (1-this.coupure)*uptimeMax
    }
    uptime_Auxilliaire(uptimeMax, Principal){
        return (this.uptime(uptimeMax - Principal.uptime(uptimeMax)))
    }
}
module.exports = Fournisseur;