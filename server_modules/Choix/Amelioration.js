class Amelioration{
    constructor(){
        this.tableau = new Array();
        this.tabAmelioration = new  Object();
    }
    lancer_Amelioration(Categorie, NbTours, amelioration){
        this.tableau.push({categorie:Categorie, tour:NbTours, amelioration: amelioration});
        if(this.tabAmelioration[this.tableau.categorie] == undefined){
            this.tabAmelioration[this.tableau.categorie] = new Array();
        }
    }
    fin_Amelioration(indice){
        this.tabAmelioration[this.tableau[indice].categorie].push(this.tableau[indice].amelioration);
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
        for(let i=0; i<renvois.length; i++){
            tableau_repetitionEnvoie.push(this.tableau[renvois[i]].categorie);
            this.fin_Amelioration(renvois[i]);
            this.tableau.splice(renvois[i], 1);
        } 
        return tableau_repetitionEnvoie;
    }
    check(Categorie, amelioration){
        if(this.tabAmelioration[Categorie]!=undefined){
            for(let i=0; i < this.tabAmelioration[Categorie].length; i++){
                if(amelioration == this.tabAmelioration[Categorie][i]){
                    return true;
                }
            }
        }
        return false;
    }
    reduire(nb){
        for(let i=0; i < this.tableau.length; i++){
            this.tableau[i].tour-=nb;
            if(this.tableau[i].tour<0) this.tableau[i].tour = 0;
        }
    }
}
module.exports = Amelioration;