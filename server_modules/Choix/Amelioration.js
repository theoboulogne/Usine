// Classe permetant de gérer les améliorations afin de définir le delai avant réapparition ainsi que de savoir si l'amélioration est terminée pour l'apparition de nouveaux choix

class Amelioration{
    constructor(){
        this.tableau = new Array();
        this.tabAmelioration = new  Object();
    }
    lancer_Amelioration(Categorie, NbTours, amelioration){
        this.tableau.push({categorie:Categorie, tour:NbTours, amelioration: amelioration});
        if(this.tabAmelioration[Categorie] == undefined){
            this.tabAmelioration[Categorie] = new Array();
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
            this.tableau[i].tour--;
            if(0 == this.tableau[i].tour){
                renvois.push(i);
            }
        }
        for(let i=0; i<renvois.length; i++){
            tableau_repetitionEnvoie.push(this.tableau[renvois[i]].categorie);
            this.fin_Amelioration(renvois[i]);
        } 
        for(let i=0; i<renvois.length; i++) this.tableau.splice(renvois[i]-i, 1);
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
            if(this.tableau[i].tour<1) this.tableau[i].tour = 1;
        }
    }
    checkInit(init, tab){
        for(let i=0; i<init.length; i++){
            if(this.tabAmelioration[init[i]] == undefined) tab.push(init[i]);
            else{
                let bool = false;
                for(let j=0; j<this.tableau.length; j++){
                    if(this.tableau[j].categorie == init[i] && this.tableau[j].tour>0) bool = true;
                }
                for(let j=0; j<tab.length; j++){
                    if(tab[j] == init[i]) bool = true;
                }
                if(!bool) tab.push(init[i])
            }
        }
        return tab;
    }
}
module.exports = Amelioration;