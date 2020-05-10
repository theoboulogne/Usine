class Repetition{
    constructor(){
        this.tableau = new Array();
    }
    add_Categorie(Categorie, NbTours){
        this.tableau.push({categorie:Categorie, tour:NbTours});
    }
    //A executer à chaque tour
    newTour(){
        let tableau_repetitionEnvoie = new Array();
        for(let i=0; i < this.tableau.length; i++){
            this.tableau[i].tour--;
            if(0 == this.tableau[i].tour){
                tableau_repetitionEnvoie.push(this.tableau[i].categorie);
            }
        }
        return tableau_repetitionEnvoie;
    }
    checkInit(init, tab){
        for(let i=0; i<init.length; i++){
            let bool = false;
            for(let j=0; j<this.tableau.length; j++){
                if(init[i] == this.tableau[j].categorie) bool = true;
            }
            if(!bool) tab.push(init[i]);
        }
        return tab;
    }
}
module.exports = Repetition;