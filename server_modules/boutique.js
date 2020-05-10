class Boutique {
    constructor(){
        this.boutique = new Object();
        this.boutique.employes = 0;
        this.boutique.robots = 0;
        this.boutique.lignes = 0;
        this.boutique.prix = new Object();
        this.boutique.prix.robots = 0;
        this.boutique.prix.employes = 0;
        this.boutique.prix.lignes = 0;
        this.boutique.solde = 0;
    }

    avantAchat(infoBoutique){
        this.boutique = infoBoutique;
    }
    boutonPlus(infoBoutique,categorie /* "lignes" / "robots" / "employes" */){
        infoBoutique[categorie]++;
        boutique.solde -= infoBoutique["prix"][categorie];
    }
    boutonMoins(infoBoutique,categorie){
        if((this.boutique.lignes =! infoBoutique.lignes) || (categorie =! "lignes")){
            infoBoutique[categorie]--;
            infoBoutique.solde += infoBoutique["prix"][categorie];
        }
    }
}