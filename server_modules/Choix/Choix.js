let applyValeur = (valeur,  Joueur) => {
    if(valeur.type=="R&D"){
        Joueur.amelioration.reduire(valeur.val);
    }
    else{
        for(let j=0; j<valeur.valeurs.length; j++){ 
            emplacement = Joueur
            for(let i=0; i<valeur.valeurs[j].path.length; i++){
                emplacement = emplacement[valeur.valeurs[j].path[i]]
            }
            switch(valeur.valeurs[j].type){
                case "egal":
                    emplacement = valeur.valeurs[j].val;
                break;
                case "fois":
                    emplacement *= valeur.valeurs[j].val;
                break;
                case "plusegal":
                    emplacement += valeur.valeurs[j].val;
                break;
            }
        }
    }
}

module.exports = {
    apply : (choix, Joueur) =>{
        if(choix != undefined){
            for(let i=0; i<choix.valeurs; i++){
                applyValeur(choix.valeurs[i], Joueur);
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
