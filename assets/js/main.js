(function () {
    let Game = this;
    //connection server
    const socket = io.connect('http://localhost:800');
    
    socket.on('repconnection', (Jeu) => {
        console.log('Event - repconnection')
        this.game = Jeu;
        //verif des infos a faire puis on reset si on a pas reçu les bonnes infos
        this.Graphique = new Rendu(this.game.Lignes)
    });
    socket.on('disconnect', () => {
        console.log('Event - disconnect')
        document.location.href = "./"
        // afficher une alerte puis retourner vers le menu
    });
    
    socket.on('start', () => {
        console.log('Event - start')

        this.Graphique.DropDown("boutique", "dropdown_boutique");
        
        //Ajouter un event on click sur les boutons dans chaque ligne du dropdown
        this.Dossiers = []
        this.Magasin = new Boutique();

        if(true){ // Lorsque le rendu 3D est chargé :

            document.getElementById("newTour").addEventListener("click", function(){
                console.log('Click - endTurn')

                //Compilation des Choix effectués et des modifications effectuées par l'interface(boutique,employes,voir+) a faire 
                //et mettre en arguement

                let choix = []

                for(let i=0; i<Game.Dossiers.length; i++){
                    if(Game.Dossiers[i].nom == Affichage.isValider(Game.Dossiers[i].categorie)){
                        let c = Game.Dossiers[i];
                        if(c.categorie != 'evenement'){
                            let categorie = c.categorie.split('_');
                            c.categorie = categorie[1];
                        }
                        choix.push(c);
                    }
                }

                for(let i=0; i<choix.length; i++){ // On met investissement dans la recherche a la fin pour influencer les améliorations de ce tour
                    if(choix[i].nom == "Investissement dans la Recherche "){
                        let choixTMP = choix[i]
                        choix.splice(i, 1);
                        choix.push(choixTMP);
                    }
                }

                console.log(choix)

                //Vérification et application des changements coté serveur a faire (faire une copie de Jeu pour comparaison ?)
                setTimeout(function(){
                    socket.emit('endTurn', choix, Magasin.boutique);
                }, 50) // Léger delai pour éviter de valider le tour suivant en même temps            
            });

            socket.emit('endTurn', [], []); // On demande les infos de départ

        }
    });

    socket.on('newTurn', (Events, Choix, Magasin, Barres, joueur) => {
        console.log('Event - newTurn')
        console.log(joueur)
        Affichage.removeSlick()

        console.log(Barres)

        this.Graphique.SetBarre("economie", Barres[0])
        this.Graphique.SetBarre("social", Barres[1])
        this.Graphique.SetBarre("ecologie", Barres[2])
        this.Graphique.SetBarre("production", Barres[3])

        this.Dossiers = []
        this.Magasin.avantAchat(Magasin);

        Affichage.removeSlick()
        for(let i=0; i<Choix.length; i++) {
            for(let j=0; j<Choix[i].length; j++){
                let choix = Choix[i][j]
                switch(i){
                    case 1:
                        choix.categorie = "ponctuel_"+choix.categorie;
                        break;
                    case 2:
                        choix.categorie = "repetition_"+choix.categorie;
                        break;
                    case 3:
                        choix.categorie = "amelioration_"+choix.categorie;
                        break;
                }
                this.Dossiers.push(choix);
                Affichage.addNewSlick(choix.nom, choix.nom, choix.desc, choix.cout, choix.categorie);
            }
        }
        Affichage.addSlick();
    });

    socket.on('menu', ()=>{
        window.href = './'
    })

})();

