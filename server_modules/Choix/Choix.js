let applyValeur = (valeur,  Joueur, Ventes) => {
    if(valeur.type=="R&D"){
        Joueur.amelioration.reduire(valeur.val);
    }
    else if(valeur.type=="upgrade"){
        for(let i=0; i<Joueur.Lignes.length; i++){
            Joueur.Lignes[i].Composant[valeur.val - 1].auto = true;
        }
    }
    else if(valeur.type == "nbClients"){
        Ventes.nbClientsTotal+=parseFloat(valeur.val)
    }
    else{
        let emplacement = Joueur
        let i;
        for(i=0; i<valeur.path.length-1; i++){
            emplacement = emplacement[valeur.path[i]]
        }
        switch(valeur.type){
            case "egal":
                emplacement[valeur.path[i]] =  parseFloat(valeur.val);
            break;
            case "fois":
                emplacement[valeur.path[i]] *=  parseFloat(valeur.val);
            break;
            case "plusegal":
                emplacement[valeur.path[i]] +=  parseFloat(valeur.val);
            break;
        }
    }
}

module.exports = {
    apply : (choix, Joueur, Ventes) =>{
        if(choix != undefined){
            for(let i=0; i<choix.valeurs.length; i++){
                applyValeur(choix.valeurs[i], Joueur, Ventes);
            }
        }
    }
}
    /*

        path : tab avec les valeurs depuis joueurs
        type d'ajout: 
            egal
            ou x
            +=

        R&D
        pub
        cout


    */
