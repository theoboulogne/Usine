class Ponctuel{ // Classe permettant d'enregistrer les choix effectues
    constructor(){
        this.ChoixEffectue = new Array();
    }
    add(Categorie, Choix){
        this.ChoixEffectue.push({categorie:Categorie, choix:Choix});
    }
    //A executer à chaque tour
    check(Categorie, Choix){
        for(let i=0; i<this.ChoixEffectue.length; i++){
            if(this.ChoixEffectue[i].categorie == Categorie){
                if(this.ChoixEffectue[i].choix == Choix) return true;
            }
        }
        return false;
    }
}
module.exports = Ponctuel;