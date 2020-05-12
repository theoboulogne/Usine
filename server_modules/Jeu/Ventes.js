class Ventes{
    constructor(n){
        //global
        this.prixVente = 5;
        this.nbClientsTotal=n*8000;
    }

    partDeMarche(tab/* tout les joueurs */){  // tout les calcul de cette fonction sont invente 
                                    //pour simuler des variations des indices d'images de marque et 
                                    //des parts de marche de chaque entreprise en fonction des 
                                    //valeurs qui nous semblais interessante pour ces paramtres
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let part = [];//tebleau de la meme taille que le nombre de joueur

        for(let i in tab){//parcourt des joueurs
            // on rassemble les couts de pub avec le budget pub global
            part.push((tab[i].joueur.pub + tab[i].joueur.Choix.solde) / 1000) * tab[i].joueur.pollution
            tab[i].joueur.pubPrec = tab[i].joueur.pub;
            tab[i].joueur.pub = 0;
        }

        let imageDeMarqueTotal = part.reduce(reducer);

        for(let i in tab){//parcourt des joueurs
            part[i] = ((part[i] * 100) / imageDeMarqueTotal) * tab[i].joueur.Choix.avantages;
        }

        let partDeMarcheTotal = part.reduce(reducer);

        for(let i in tab){//parcourt des joueurs
            tab[i].joueur.pub = 0; // on remet le cout de pub a zero
            part[i] = (part[i]) / partDeMarcheTotal;
        }

        return part;
    }
    
    ventesJoueurs(tab){
        let part = this.partDeMarche(tab);
        let indice = 0;
        for (let i in tab){
            if(tab[i].joueur.stock < part[indice] * this.nbClientsTotal){
                tab[i].joueur.solde += tab[i].joueur.stock * this.prixVente
            }
            else {
                tab[i].joueur.solde += part[indice] * this.nbClientsTotal * this.prixVente;
            }
            indice++;
        }
    }
}
module.exports = Ventes;