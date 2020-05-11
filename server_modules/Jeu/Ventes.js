class Ventes{
    constructor(){
        //global
        this.prixVente = 45;
        this.nbClientsTotal=10000;
    }

    partDeMarche(tab/* tout les joueurs */){  // tout les calcul de cette fonction sont invente 
                                    //pour simuler des variations des indices d'images de marque et 
                                    //des parts de marche de chaque entreprise en fonction des 
                                    //valeurs qui nous semblais interessante pour ces paramtres
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let part = [];//tebleau de la meme taille que le nombre de joueur

        for(let i in tab){//parcourt des joueurs
            tab[i].joueur.pub += tab[i].joueur.Choix.solde; // on rassemble les couts de pub avec le budget pub global
            part.push(tab[i].joueur.pub / 1000) * tab[i].joueur.pollution
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
        for (let i in tab){
            if(tab[i].joueur.stock < part[i] * this.nbClientsTotal){
                console.log(tab[i].joueur.stock * this.prixVente)
                tab[i].joueur.solde += tab[i].joueur.stock * this.prixVente
d
            }
            else {
                console.log(part[i] * this.nbClientsTotal * this.prixVente)
                tab[i].joueur.solde += part[i] * this.nbClientsTotal * this.prixVente;
            }
        }
    }
}
module.exports = Ventes;