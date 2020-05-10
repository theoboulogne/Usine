class Boutique {
    constructor(){
        this.boutique = new Object();
        this.infoBoutique = new Object();
    }

    avantAchat(infoBoutique){
        this.infoBoutique = infoBoutique;
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