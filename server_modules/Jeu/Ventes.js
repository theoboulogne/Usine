class Ventes{
    constructor(n){
        //global
        this.prixVente = 5;
        this.nbClientsTotal=n*1400;
    }

    partDeMarche(tab/* tout les joueurs */){  // tout les calcul de cette fonction sont invente 
                                    //pour simuler des variations des indices d'images de marque et 
                                    //des parts de marche de chaque entreprise en fonction des 
                                    //valeurs qui nous semblais interessante pour ces paramtres
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let part = [];//tebleau de la meme taille que le nombre de joueur

        for(let i in tab){//parcourt des joueurs
            // on rassemble les couts de pub avec le budget pub global
            part.push((tab[i].joueur.pub + tab[i].joueur.Choix.solde) / 1000) * tab[i].joueur.pollution * tab[i].joueur.Choix.avantages;
            tab[i].joueur.pubPrec = tab[i].joueur.pub;
            tab[i].joueur.pub = 0;
        }

        let imageDeMarqueTotal = part.reduce(reducer);

        for(let i in part){//parcourt des joueurs
            part[i] = (part[i] * 100) / imageDeMarqueTotal
        }

        let partDeMarcheTotal = part.reduce(reducer);
        console.log("OUAIS C'EST LA");
        console.log(part);
        console.log(partDeMarcheTotal);

        for(let i in part){//parcourt des joueurs
            part[i] = part[i] / partDeMarcheTotal;
        }
        console.log("OUAIS C'EST LA");
        console.log(part);
        return part;
    }
    
    ventesJoueurs(tab){
        let part = this.partDeMarche(tab);
        let indice = 0;
        for (let i in tab){
            if(tab[i].joueur.stock < part[indice] * this.nbClientsTotal){
                tab[i].joueur.solde += tab[i].joueur.stock * this.prixVente;
                tab[i].joueur.PREstock = tab[i].joueur.stock;
                tab[i].joueur.stock = 0;
            }
            else {
                tab[i].joueur.solde += part[indice] * this.nbClientsTotal * this.prixVente;
                tab[i].joueur.PREstock = tab[i].joueur.stock;
                tab[i].joueur.stock -= (part[indice] * this.nbClientsTotal);
            }
            indice++;
        }
    }
}
module.exports = Ventes;