(function(){
    let Game = this;
    $( document ).ready(function() {
        //connection server
        const socket = io.connect('http://localhost:800');
        
        socket.on('repconnection', () => { // générer une ligne pour l'envoi ?
            console.log('Event - repconnection')       
            
            //Tutoriel :
            Affichage.modal(["Bienvenue dans Modern Factory !</br></br> Tu es le patron de cette entreprise, ton objectif est de faire les choix qui permettront de la faire vivre afin d'explorer les différents enjeux liés à la thématique de l'Usine du Futur !", 
            "Chaque tour représente un mois, et chaque mois tu seras amené à faire des choix importants.</br> Tu auras plusieurs dossiers identifiables par des couleurs comportant chacun un ou plusieurs choix.</br> Tu ne pourra choisir qu'un seul choix par dossier ou ne pas en choisir.</br> Mais attention ! Chaque choix a un coût et des répercutions sur les indices de croissance, du social, de l'écologie et de la production, affichés dans les barres d'indices.",
            "Par le biais de ces choix tu as la possibilité de débloquer des améliorations te permettant de déverouiller de nouveaux choix.</br></br> Tu peux également cliquer sur les lignes de production et tes employés, cela te permettra d'afficher le menu permettant de modifier l'élément sélectionné."])
            //Génération du rendu
            Game.Graphique = new Rendu()
        });
        
        socket.on('start', () => {
            console.log('Event - start')
            
            Game.Dossiers = []
            Game.Magasin = new Boutique(); // On créer le stockage de la boutique
            Affichage.set_addEvent(Game.Magasin) // on ajoute les evenements dans le menu correspondant

            socket.emit('endTurn', [], []); // On demande les infos de départ

            let loadTest = setInterval(function() { // Lorsque le rendu 3D est chargé completement:
                if (Game.Graphique.loadCheck()) {
                    clearInterval(loadTest);

                    document.getElementById("newTour").addEventListener("click", function(){
                        console.log('Click - endTurn')
    
                        let choix = []
    
                        for(let i=0; i<Game.Dossiers.length; i++){ // On vient recuperer les choix selectionnes
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
    
                        setTimeout(function(){
                            socket.emit('endTurn', choix, Game.Magasin.boutique);
                        }, 50) // Léger delai pour éviter de valider le tour suivant en même temps            
                    });
                }
            }, 1000);
        });

        socket.on('newTurn', (Events, Choix, Magasin, Barres, Infos, Lignes, joueur) => {
            console.log('Event - newTurn')

            //On actualise le niveau des barres
            Affichage.SetBarre("economie", Barres[0])
            Affichage.SetBarre("social", Barres[1])
            Affichage.SetBarre("ecologie", Barres[2])
            Affichage.SetBarre("production", Barres[3])
            
            //On stocke et actualise les infos a gauche
            Game.Infos = Infos;
            Affichage.SetStock(Infos[0])
            Affichage.SetConso(Infos[1])
            Affichage.SetSalaires(Infos[2])
            Affichage.SetPub(Infos[3])

            //On actualise le rendu 3D
            Game.Graphique.GenerationUsine(Lignes);

            //On affiche les evenements générés si il y en a
            Affichage.modal(Events)

            Game.Dossiers = []
            Game.Magasin.avantAchat(Magasin); // On actualise les données du magasin
            Affichage.updateMagasin(Game.Magasin); // On les update dans le menu correspondant
            Affichage.SetSolde(Game.Magasin.boutique.solde) // On définit le solde en fonction de la boutique

            Affichage.removeSlick() //On affiche les choix
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
                    Game.Dossiers.push(choix);
                    Affichage.addNewSlick(choix.nom, choix.desc, choix.cout, choix.categorie);
                }
            }
            Affichage.addSlick();
        });

        socket.on('menu', ()=>{
            window.location.href = './'
        })
        socket.on('fin', (Scores, Barres, indiceJoueur)=>{ // On affiche le tableau des scores
            Affichage.createFin(Scores, Barres, indiceJoueur)
        })
    });
})()

