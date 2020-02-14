class Fournisseur {
    constructor(){
        this.prix; // prix au KW/H
        this.pollution; // pollution produite par KW/H fournit
        this.coupure; // risques de coupure / possibilité de panne
    }
    uptime(uptimeMax){//Méthode de calcul de l'uptime sur le mois
        return (1-this.coupure)*uptimeMax
    }
    uptime_Auxilliaire(uptimeMax, Principal){
        return (this.uptime(uptimeMax - Principal.uptime(uptimeMax)))
    }
}