class Boutique {
    constructor(){
        this.boutique = new Object();
        this.infoBoutique = new Object();
    }

    avantAchat(infoBoutique){
        this.infoBoutique = infoBoutique;
        this.boutique = JSON.parse(JSON.stringify(infoBoutique));
    }
    boutonPlus(categorie /* "lignes" / "robots" / "employes" */){
        if(categorie != "lignes"  || this.boutique[categorie] < 5){
            if(categorie != "pannes"){
                if((this.boutique.prix[categorie] > 0 && this.boutique.solde - this.boutique.prix[categorie] > 0)||(this.boutique.prix[categorie] == 0)){
                    this.boutique[categorie]++;
                    this.boutique.solde -= this.boutique.prix[categorie];
                    Affichage.SetSolde(this.boutique.solde)
                }
            }
        }
    }
    boutonMoins(categorie){
        if((this.boutique.lignes != this.infoBoutique.lignes) || (categorie != "lignes")){
            if((categorie != "employes" && this.boutique[categorie] > 0) || this.boutique[categorie] > 1){
                if((this.boutique.prix[categorie] < 0 && this.boutique.solde + this.boutique.prix[categorie] > 0)||(this.boutique.prix[categorie] >= 0)){ // pour les pannes ( prix negatif )
                    this.boutique[categorie]--;
                    this.boutique.solde += this.boutique.prix[categorie];
                    Affichage.SetSolde(this.boutique.solde)
                }
            }
        }
    }
}