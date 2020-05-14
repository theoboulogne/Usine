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

    if(this.Monde.NbJoueurs == 0){
        n = Param.nb
        dureePartie = Param.duree

        if(Param.nb < 1) n = 1
        else n = Param.nb;

        if(Param.duree < 2) dureePartie = 2
        else dureePartie = Param.duree;

        this.Monde.changeTaille(n)
    }

    response.sendFile(__dirname + '/assets/views/game.html')
});

//On enregistre nos Joueurs, on lance à n joueurs
let n = 1
let dureePartie = 25

this.Monde = new Univers(n); // instanciation d'un "Univers" pour générer les infos des ventes et des evenements et stocker les joueurs

io.sockets.on('connection',  (socket) =>{
    console.log('Debut Connection Client (coté serveur)')

    if(this.Monde.NbJoueurs >= this.Monde.NbJoueursMax) {
        console.log('send disconnect au joueur car trop de joueurs déjà connectés')
        socket.disconnect(); 
    }
    else {
        console.log('add joueur au monde')
        this.Monde.addJoueur(socket.id);
        console.log(this.Monde);
        // on informe le client que la connection est effectuée
        socket.emit('repconnection')

        // on lance la partie si on a tout les joueurs de connecté
        if(this.Monde.NbJoueurs >= this.Monde.NbJoueursMax) io.emit('start');
    }


    socket.on('endTurn', (Dossiers, Magasin)=> {
        console.log('------endTurn')
        if(this.Monde.Joueurs[socket.id].jouer == false && this.Monde.nbTour<dureePartie){ // si le joueur n'a pas deja joué
            this.Monde.Joueurs[socket.id].jouer = true;
            
            //Verification avec stockage cote serveur et application des dossiers correspondant
            for(let i=0; i<Dossiers.length; i++){
                for(let j=0; j<this.Monde.Joueurs[socket.id].choix.length; j++){
                    for(let k=0; k<this.Monde.Joueurs[socket.id].choix[j].length; k++){
                        if(this.Monde.Joueurs[socket.id].choix[j][k].categorie == Dossiers[i].categorie || (this.Monde.Joueurs[socket.id].choix[j][k].categorie == undefined && Dossiers[i].categorie=='evenement')){
                            let bool = false;
                            if(this.Monde.Joueurs[socket.id].choix[j][k].amelio == Dossiers[i].nom) bool = true;
                            else if(this.Monde.Joueurs[socket.id].choix[j][k].amelio == undefined){
                                if(this.Monde.Joueurs[socket.id].choix[j][k].nom == Dossiers[i].nom) bool = true;
                                else if(this.Monde.Joueurs[socket.id].choix[j][k].choix.nom == Dossiers[i].nom) bool = true;
                            }
                            if(bool){
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

            //Validation Magasin :
            if(Magasin != []) this.Monde.Joueurs[socket.id].joueur.apresAchat(Magasin);

            //Vérification fin tour
            let finTour = true;
            for(let i in io.sockets.sockets) {
                if(!this.Monde.Joueurs[i].jouer) finTour = false;
            }

            if(finTour){

                //Global
                this.Monde.nbTour++;
                //Génération des évenements + Application
                let evenements = Generate.Evenement(this.Monde.nbTour);
                let evenementsChoix = this.Monde.addEvenement(evenements, evenements.length);
                evenements = Generate.EvenementDisplay(evenements);

                for(let i in io.sockets.sockets) {
                    this.Monde.Joueurs[i].jouer = false;
                    this.Monde.Joueurs[i].joueur.Update_Mois();
                }

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

                let Scores = this.Monde.FIN[0]; // on cherche son indice et on le renvoi
                let indiceJoueur;

                for(let i=0; i<Scores.length; i++){
                    if(Scores[i][1] == socket.id) indiceJoueur = i;
                }

                socket.emit('fin', this.Monde.FIN[0], this.Monde.FIN[1], indiceJoueur)
            }
        }
    });
    socket.on('disconnect', ()=>{
        socket.emit('menu');

        let nombre = 0
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



/*
-----------------------------------------------------------------------------------
                                To-DO List :
|------Légende:------|
| " - " = à faire    |
| " * " = implémenté |
|--------------------|

    Fonctionnalités principales :

/-/ Environnement :
*    Energie (methode calcul pollution)
*    Machines (pollution + dechets)
-   Respect des Normes (à définir avec les choix + Evenements randoms)
/-/ Vie Sociale :
*    Employe (qualTravail + avantages)
*    Securité (employe.accident + Energie.auxilliaire.securite?A VOIR? + choix)
/-/ Ventes : à définir
-   Stock de produits
-   Image de marque
-   Parts de marché
-   Pubs
-   Commerciaux (impact sur les ventes)
/-/ Production :
*    Nb(Employes + Robots)
*    cadence de travail(qualTravail - employe.accident + Stocks)
*    Machine(Nb, qualité)
*    uptimeGlobal
/-/ 'Magasin' :
-   nbEmployés / nbRobots
-   Production visée 
-   Prix de vente
-   Gestion de la vente : Commerciaux ou Pubs ou a voir

    Autre :

- créer class accident pour mieux gérer tout les accidents, les pannes et la sécurité
- Evaluer tout ce qui est améliorable ou non


-----------------------------------------------------------------------------------

        -///- Fonctionnement du jeu :
    
--------------------------------------------------

    -//- Initialisation des différentes classes :
    
--------------------------------------------------

----------------------------------------
 -/- Joueur :
-------------
uptimeMax = 30; Nombre de jours dans un mois, utilisé pour l'initialisation du courant etc..
solde = 1000000;
stock = 0; produits en stock

nbEmployes = 15; Nombre total d'ouvriers (Employes + Robots) 
nbRobots = 0;
nbEmployes_dispo = 15; Nombre d'ouvriers non assigné (Employes + Robots) :
nbRobots_dispo = 0;

Eco (empreinte écologique sur le tour)
Empreinte (empreinte écologique totale)
    avec empreinte écologique composée de : (dechet, pollution)
Courant (Gestion de la consommation de l'usine)
    avec un Fournisseur principal et auxilliaire chacun composé de : (pollution, prix, coupure)
Lignes (Gestion des Lignes de production) = [] 
    avec une Ligne au début
----------------------------------------

----------------------------------------
 -/- Ligne :
------------
coutReparation = 8000;  cout fixe, en cas de panne
accident = 0; nombres d'accidents au total sur cette ligne de production
boolaccident = false; accident sur la ligne de prod
boolpanne = false; panne sur la ligne de prod
Composant = []
    avec 5 Composant
----------------------------------------

----------------------------------------
 -/- Composant :
 ---------------
this.nbEmployes = 0; on Stocke le nombre d'ouvriers assignés, varie au cours d'une journée
this.nbRobots = 0;
carte=("");  Caractéristiques fixes au composant
auto = false; besoin d'un employé sur un composant pour faire marcher la machine ou non
consomationNRJ = 0.003;
dechets = 8;
pollution = 40;
production = 30;
this.accident = 0.02;
----------------------------------------

--------------------------------------------------

    -//- Fonctionnement d'un tour

--------------------------------------------------

- Calcul du temps de fonctionnement de l'énergie en jours en fonction 
  de la probabilité de panne des fournisseurs
- On lance l'update de chaque jour en fonction du nombre de jours calculés, 
  on y effectue sur les 24h :
    - à 6h et 14h :
        - on assigne les ouvriers(employés+robots) à chaque composant pour un maximum de 2 par composant
    - à 12h et 18h :
        - on retire les employés ( rajouter un système de régulation pour les robots.. )
    - à chaque heure :
        - on calcule la consommation énergetique en fonction des ouvriers assignés et des machines
        - On actualise chaque Ligne de production :
            - On vérifie qu'il y a assez d'ouvriers pour que la Ligne de production fonctionne
            - On remonte la production, les déchets et la pollution en fonction du nombre d'ouvriers assignés
            - On génère a chaque heure une probabilité :
                - d'accident (coupe la production sur l'heure à partir du composant avec l'accident) 
                - de panne (nécessite une réparation manuelle) 
        - On récupère/enregistre les infos écologiques
- On actualise le solde en fonction du cout de l'énergie et des salaires 
  (rajouter cout de production + cout fixe + etc)

-----------------------------------------------------------------------------------

*/