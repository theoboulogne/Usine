let applyValeur = (valeur,  Joueur) => {
    if(valeur.type=="R&D"){
        Joueur.amelioration.reduire(valeur.val);
    }
    else{
        emplacement = Joueur
        for(let i=0; i<valeur.path.length; i++){
            emplacement = emplacement[valeur.path[i]]
        }
        switch(valeur.type){
            case "egal":
                emplacement = valeur.val;
            break;
            case "fois":
                emplacement *= valeur.val;
            break;
            case "plusegal":
                emplacement += valeur.val;
            break;
        }
    }
}

module.exports = {
    apply : (choix, Joueur) =>{
        for(let i=0; i<choix.valeurs; i++){
            applyValeur(choix.valeurs[i], Joueur);
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
