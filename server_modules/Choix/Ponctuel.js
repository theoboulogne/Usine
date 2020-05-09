class Ponctuel{
    constructor(){
        this.ChoixEffectue = new Array();
    }
    add(Categorie, Choix){
        this.tableau.push({categorie:Categorie, choix:Choix});
    }
    //A executer à chaque tour
    check(Categorie, Choix){
        for(let i=0; i<this.ChoixEffectue.length; i++){
            if(this.tableau[i].categorie == Categorie){
                if(this.tableau[i].choix == Choix) return true;
            }
        }
        return false;
    }
}
module.exports = Ponctuel;