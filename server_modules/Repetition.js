class Repetition{
    constructor(){
        this.tableau = new Array();
    }
    add_Categorie(Categorie, NbTours){
        this.tableau.push({categorie:Categorie, tour:NbTours});
    }
    //A executer à chaque tour
    repetition(){
        let tableau_repetitionEnvoie = new Array();
        let renvois = new Array();
        for(let i=0; i < this.tableau.length; i++){
            if(0 == this.tableau[i].tour){
                tableau_repetitionEnvoie.push(this.tableau[i].categorie);
                renvois.push(i);
            }else{
                this.tableau[i].tour--;
            }
        }
        for(let i=0; i<renvois.length; i++) this.tableau.splice(renvois[i], 1);
        return tableau_repetitionEnvoie;
    }
    check(Categorie){
        for(let i=0; i < this.tableau.length; i++){
            if(Categorie == this.tableau[i].categorie){
                return true;
            }
        }
        return false;
    }
}
module.exports = Repetition;


class Amelioration{
    constructor(){
        this.tableau = new Array();
        this.tabAmelioration = new  Object();
    }
    add_Amelioration(Categorie, NbTours, amelioration){
        this.tableau.push({categorie:Categorie, tour:NbTours, amelioration: amelioration});
        if(this.tabAmelioration[this.tableau.categorie] == undefined){
            this.tabAmelioration[this.tableau.categorie] = new Array();
        }
    }
    //A executer à chaque tour
    repetition(){
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
            tableau_repetitionEnvoie.push(this.tableau[i].categorie);
            this.tabAmelioration[this.tableau[i].categorie].push(this.tableau[i].amelioration);
            this.tableau.splice(renvois[i], 1);
        } 
        return tableau_repetitionEnvoie;
    }
    check(Categorie){
        for(let i=0; i < this.tableau.length; i++){
            if(Categorie == this.tableau[i].categorie){
                return true;
            }
        }
        return false;
    }
}
module.exports = Amelioration;