class Ventes{
    constructor(){

        // / joueur

        let partsMarche
        this.imageMarque = 1;

/*
        this.imageTourPrec = 0;
        this.influenceSurImage = 1;

        this.partsMarcheTourPrec=0;
        this.influenceSurParts = 1;
        this.influenceSurPartsTourPrec = 1;

        this.pubsTourPrec = 0;

        this.commerciaux = 0;
        this.commissionsCommerciaux = 0;

        this.nbVentesTourPrec = 0;
        this.prixUnitaireTourPrec=0;

        this.influenceSurNbClients = 0;
*/
        this.pub = 0;
        //global
        this.nbClientsTotal=10000;
        //this.nbClientsTotalTourPrec=10000;

    }


    partDeMarche(/* tout les joueurs */){  // tout les calcul de cette fonction sont invente 
                                    //pour simuler des variations des indices d'images de marque et 
                                    //des parts de marche de chaque entreprise en fonction des 
                                    //valeurs qui nous semblais interessante pour ces paramtres
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let part = [];//tebleau de la meme taille que le nombre de joueur

        for(let i = 0; i < 1; i++){//parcourt des joueurs
            joueur[i].pub += joueur[i].Choix.solde; // on rassemble les couts de pub avec le budget pub global
            part.push(joueur[i].pub / 1000) * joueur[i].pollution
        }

        let imageDeMarqueTotal = part.reduce(reducer);

        for(let i = 0; i < 1; i++){//parcourt des joueurs
            part[i] = ((part[i] * 100) / imageDeMarqueTotal) * joueur[i].Choix.avantages;
        }

        let partDeMarcheTotal = part.reduce(reducer);

        for(let i = 0; i < 1; i++){//parcourt des joueurs
            joueur[i].pub = 0; // on remet le cout de pub a zero
            part[i] = (part[i] * 100) / partDeMarcheTotal;
        }

        return part;
    }
 
   
 /*   influenceDuPrix(prixUnitaire){
        if(prixUnitaire<this.prixUnitaireTourPrec){
            for(let i=0; this.prixUnitaireTourPrec - prixUnitaire>(0.25*i*this.prixUnitaireTourPrec)&&i<3; i++) this.partsMarche*=1.05;
        }
        if(prixUnitaire>this.prixUnitaireTourPrec){
            for(let i=0; this.prixUnitaireTourPrec - prixUnitaire>(0.15*i*prixUnitaire)&&i<4; i++) this.partsMarche*=0.95;
        }
        this.prixUnitaireTourPrec = prixUnitaire;
    }
    influenceDuStock(stockProduits){
        if(this.stockProduitsTourPrec >= nbVentesTourPrec){
            for(let i=1; this.stockProduitsTourPrec >= nbVentesTourPrec*i && i<3; i+=0.5) this.influenceSurImage*=0.8;
        }
        if(stockProduits < nbVentesTourPrec){
            for(let i=1; stockProduits*i < nbVentesTourPrec && i<3; i+=0.5) this.influenceSurImage*=1.1;
        }
        this.stockProduitsTourPrec = stockProduits;
    }
    influenceDesPubs(pubs){
        if(pubs<this.pubsTourPrec){ //Baisse de la Pub
            for(let i=0; this.pubsTourPrec-pubs>(0.2*i*pubs)&&i<3; i++) this.influenceSurImage *= (0.9 - (0.05*i))
        }
        if(pubs == this.pubsTourPrec){  //La Pub reste pareille
            this.influenceSurImage *= 1.05
        }
        if(pubs>this.pubsTourPrec){  //Augmentation de la Pub
            for(let i=0; pubs-this.pubsTourPrec>(0.2*i*this.pubsTourPrec)&&i<3; i++) {
                this.influenceSurImage *= 1.1
                this.nbClientsTotal *= 1.15
            }
        }
        this.pubsTourPrec=pubs;
        this.imageMarque*=this.influenceSurImage
    
        this.influenceDeImageMarque();
        }
        influenceDeImageMarque(){
            if(this.imageMarque<=this.imageTourPrec){ //Baisse de l'image
                for(let i=0; this.imageTourPrec-this.imageMarque>(0.05*i)&&i<3; i++) this.influenceSurParts *= 0.9;
            }
            if(this.imageMarque == this.imageTourPrec){  //L'image reste pareille
                this.influenceSurParts = this.influenceSurPartsTourPrec*1.05
            }
            if(this.imageMarque>=this.imageTourPrec){  //Augmentation de l'image
                for(let i=0; this.imageMarque-this.imageTourPrec>(0.2*i)&&i<3; i++) this.influenceSurParts *= 1.1;
            }
            this.imageTourPrec=this.imageMarque;
            this.partsMarche*=this.influenceSurParts
        }





    calculNbClients(nbClientsTotal,partsMarche){
        
 
    }
    calculDesVentes(){
       
    }*/
 
 
}