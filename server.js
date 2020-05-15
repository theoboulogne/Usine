//Serveur - CIRious Game

//Constantes
const port = 800;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io =  require('socket.io')(server);

//Import de classes
const Univers = require('./server_modules/Jeu/Univers');
//Import des modules
const Generate = require('./server_modules/Choix/Generate');
const Choix = require('./server_modules/Choix/Choix');

//Renvoi vers le fichier index client
app.use(express.static(__dirname + '/assets/'));
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/assets/views/menu.html')
});
app.get('/game', (request, response, next) => {
    Param = request.query // on récupère les paramètres

    if(this.Monde.NbJoueurs == 0){ // Si c'est le premier joueur on change les paramètres

        if(Param.nb != ""){ // Si le paramètre est définit
            if(Param.nb < 1) n = 1 // on met un minimum de 1
            else n = parseInt(Param.nb, 10); // sinon on prend la valeur donnée
        }

        if(Param.duree != ""){ // si paramètre définit
            if(Param.duree < 2) dureePartie = 2 // on définit une durée minimale de 2 tours
            else dureePartie = parseInt(Param.duree, 10)+1; // sinon on prend sa valeur
        }

        this.Monde.changeTaille(n) // On change la taille en fonction de n
    }
    response.sendFile(__dirname + '/assets/views/game.html') // On envoi ensuite le fichier html
});

//On enregistre nos Joueurs, on lance à n joueurs
let n = 1
//On enregistre la durée de la partie pour avoir une durée variable
let dureePartie = 25
// instanciation d'un "Univers" pour générer les infos des ventes et des evenements et stocker les joueurs
this.Monde = new Univers(n); 

io.sockets.on('connection',  (socket) =>{
    console.log('Debut Connection Client (coté serveur)')

    if(this.Monde.NbJoueurs >= this.Monde.NbJoueursMax) { // Si on a trop de joueurs déjà connectés
        console.log('send disconnect au joueur car trop de joueurs déjà connectés')
        socket.disconnect(); // on déconnecte le nouveau joueur
    }
    else {
        console.log('add joueur au monde') // sinon on ajoute le joueur au jeu
        this.Monde.addJoueur(socket.id);
        console.log(this.Monde);
        // on informe le client que la connection est effectuée
        socket.emit('repconnection')

        // on lance la partie si on a tout les joueurs de connecté
        if(this.Monde.NbJoueurs >= this.Monde.NbJoueursMax) io.emit('start');
    }

    //Evenement de passage de tour
    socket.on('endTurn', (Dossiers, Magasin)=> {
        console.log('------endTurn')
        if(this.Monde.Joueurs[socket.id].jouer == false && this.Monde.nbTour<dureePartie){ // si le joueur n'a pas deja joué et que la partie n'est pas terminée
            this.Monde.Joueurs[socket.id].jouer = true; // on définit le joueur comme ayant joué
            
            //Verification avec stockage cote serveur et application des dossiers correspondant
            for(let i=0; i<Dossiers.length; i++){
                for(let j=0; j<this.Monde.Joueurs[socket.id].choix.length; j++){
                    for(let k=0; k<this.Monde.Joueurs[socket.id].choix[j].length; k++){
                        //On vérifie que la catégorie est présente
                        if(this.Monde.Joueurs[socket.id].choix[j][k].categorie == Dossiers[i].categorie || (this.Monde.Joueurs[socket.id].choix[j][k].categorie == undefined && Dossiers[i].categorie=='evenement')){
                            //On vérifie qu'une amélioration avec ce nom est présente
                            let bool = false;
                            if(this.Monde.Joueurs[socket.id].choix[j][k].amelio == Dossiers[i].nom) bool = true;
                            else if(this.Monde.Joueurs[socket.id].choix[j][k].amelio == undefined){
                                if(this.Monde.Joueurs[socket.id].choix[j][k].nom == Dossiers[i].nom) bool = true;
                                else if(this.Monde.Joueurs[socket.id].choix[j][k].choix.nom == Dossiers[i].nom) bool = true;
                            }
                            if(bool){
                                // Si le choix est bien enregistré coté serveur on l'applique
                                Choix.apply(this.Monde.Joueurs[socket.id].choix[j][k].choix, this.Monde.Joueurs[socket.id].joueur, this.Monde.Vente)
                                switch(j){
                                    case 1://ponctuel - on retire la possibilite de ravoir ce choix
                                        this.Monde.Joueurs[socket.id].joueur.ponctuel.add(this.Monde.Joueurs[socket.id].choix[j][k].categorie, this.Monde.Joueurs[socket.id].choix[j][k].choix.nom)
                                    break;
                                    case 2://repetition - on ajoute le delai de repetition pour la categorie
                                        this.Monde.Joueurs[socket.id].joueur.repetition.add_Categorie(this.Monde.Joueurs[socket.id].choix[j][k].categorie, this.Monde.Joueurs[socket.id].choix[j][k].nbTour)
                                    break;
                                    case 3://amelioration - on vient lancer le delai de l'amelioration
                                        let nbtour = this.Monde.Joueurs[socket.id].choix[j][k].nbTour
                                        nbtour = nbtour.split(' ');
                                        nbtour = parseInt(nbtour[0], 10);
                                        this.Monde.Joueurs[socket.id].joueur.amelioration.lancer_Amelioration(this.Monde.Joueurs[socket.id].choix[j][k].categorie, nbtour, this.Monde.Joueurs[socket.id].choix[j][k].amelio)
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            //Validation et application des achats
            if(Magasin != []) this.Monde.Joueurs[socket.id].joueur.apresAchat(Magasin);

            //Vérification fin tour
            let finTour = true;
            for(let i in io.sockets.sockets) {
                if(!this.Monde.Joueurs[i].jouer) finTour = false;
            }

            if(finTour){//Si tout les joueurs ont joués
                console.log('Fin du Tour')

                //On augmente le nombre de tour
                this.Monde.nbTour++;
                //Génération des évenements (pour tout les joueurs en même temps)
                let evenements = Generate.Evenement(this.Monde.nbTour);
                let evenementsChoix = this.Monde.addEvenement(evenements, evenements.length);
                evenements = Generate.EvenementDisplay(evenements);

                for(let i in io.sockets.sockets) { // On vient mettre a jour les données de tout les joueurs sur le tour en fonction des données des evenements, des choix et des achats
                    this.Monde.Joueurs[i].jouer = false;
                    this.Monde.Joueurs[i].joueur.Update_Mois();
                }

                //On viens calculer la vente du joueur
                this.Monde.Vente.ventesJoueurs(this.Monde.Joueurs);

                for(let i in io.sockets.sockets) {
                    //On vide le tableau
                    this.Monde.Joueurs[i].choix.splice(0, this.Monde.Joueurs[i].choix.length); 

                    //On génère les nouveaux choix
                    let ameliorations = Generate.Amelioration(this.Monde.Joueurs[i].joueur.amelioration.checkInit(Generate.initAmelioration(),this.Monde.Joueurs[i].joueur.amelioration.newTour()), this.Monde.Joueurs[i].joueur.amelioration);
                    let repetitions = Generate.Repetition(this.Monde.Joueurs[i].joueur.repetition.checkInit(Generate.initRepetition(),this.Monde.Joueurs[i].joueur.repetition.newTour()), this.Monde.Joueurs[i].joueur.solde, this.Monde.Joueurs[i].joueur.amelioration);
                    let ponctuels = Generate.Ponctuel(this.Monde.Joueurs[i].joueur.ponctuel, this.Monde.Joueurs[i].joueur.solde, this.Monde.Joueurs[i].joueur.amelioration);
                    
                    //On les enregistre et convertit pour le client
                    this.Monde.Joueurs[i].choix = [evenementsChoix, ponctuels, repetitions, ameliorations];
                    let envoiChoix = [Generate.EvenementChoixDisplay(evenementsChoix), 
                        Generate.ChoixDisplay(ponctuels), 
                        Generate.ChoixDisplay(repetitions), 
                        Generate.AmeliorationDisplay(ameliorations)];

                    //On les envoi avec les différentes infos
                    io.sockets.sockets[i].emit('newTurn', evenements, envoiChoix, this.Monde.Joueurs[i].joueur.avantAchat(), this.Monde.Joueurs[i].joueur.verifSpam(), this.Monde.Joueurs[i].joueur.infosAfficher(), this.Monde.Joueurs[i].joueur.LignesDisplay());
                
                }
                if(this.Monde.nbTour == dureePartie) { // On génère les scores de fin
                    for(let i in io.sockets.sockets) this.Monde.Joueurs[i].joueur.Update_Mois();
                    let Scores = this.Monde.calculScore()
                    let Barres = []
                    for(let i=0; i<Scores.length; i++){
                        Barres.push(this.Monde.Joueurs[Scores[i][1]].joueur.verifSpam())
                    }
                    this.Monde.FIN = [Scores, Barres]
                }
            }
        }
        else{
            if(this.Monde.nbTour>=dureePartie){ // fin du jeu, on zappe le dernier envoi du joueur
                let Scores = this.Monde.FIN[0]; 
                let indiceJoueur;

                for(let i=0; i<Scores.length; i++){// on cherche son indice et on le renvoi pour l'affichage
                    if(Scores[i][1] == socket.id) indiceJoueur = i;
                }

                socket.emit('fin', this.Monde.FIN[0], this.Monde.FIN[1], indiceJoueur)
            }
        }
    });
    socket.on('disconnect', ()=>{ // on redirige sur le menu
        socket.emit('menu');

        let nombre = 0 // si il n'y a plus de joueurs connectés on reinitialise la partie
        for(let i in io.sockets.sockets) {
            nombre++;
        }
        if(nombre == 0){
            this.Monde = new Univers(n);
        }
    });

    console.log('Fin Connection Client (coté serveur)')
});

server.listen(port);
console.log('server connected');