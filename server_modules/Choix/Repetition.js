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
        let renvois = new Array();
        for(let i=0; i < this.tableau.length; i++){
            if(0 == this.tableau[i].tour){
                renvois.push(i);
            }else{
                this.tableau[i].tour--;
            }
        }
        for(let i=0; i<renvois.length; i++) {
            tableau_repetitionEnvoie.push(this.tableau[renvois[i]].categorie);
            this.tableau.splice(renvois[i], 1);
        }
        return tableau_repetitionEnvoie;
    }
}
module.exports = Repetition;