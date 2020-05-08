/*
    TO-DO:
    - RAJOUTER pub dans joueur



*/

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
//const Generate = require('./server_modules/Choix/Generate');
//const Choix = require('./server_modules/Choix/Choix');

//Renvoi vers le fichier index client
app.use(express.static(__dirname + '/assets/'));
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/assets/views/menu.html')
});
app.get('/game', (request, response, next) => {
    response.sendFile(__dirname + '/assets/views/game.html')
});

//On enregistre nos Joueurs, on lance à n joueurs

let n = 1
this.Monde = new Univers(n); // instancier un "Univers" pour stocker les infos des ventes et générer les évents
// reste a modifier en conséquence

io.sockets.on('connection',  (socket) =>{
    console.log('Debut Connection Client (coté serveur)')

    console.log(this.Monde);

    if(this.Monde.NbJoueurs > this.Monde.NbJoueursMax) {
        console.log('send disconnect')
        socket.emit('disconnect'); 
        socket.disconnect();
    }
    else {
        //socket.join('jeu'); // systeme de room à instaurer par la suite
        console.log('add joueur au monde')
        this.Monde.addJoueur(socket.id);
        console.log(this.Monde);
        // on informe le client que la connection est effectuée
        console.log('send repconnection')
        console.log(this.Monde.NbJoueurs)
        
        socket.emit('repconnection', this.Monde.Joueurs[socket.id].joueur) // on envoi les données générées

        if(this.Monde.NbJoueurs >= this.Monde.NbJoueursMax) io.emit('start');
    }




    socket.on('endTurn', (/*Choix, Magasin*/)=> { 
            // Rajouter les méthodes dans Magasin
            
        console.log('------endTurn')
        this.Monde.Joueurs[socket.id].jouer = true;

        let finTour = true;
        for(let i in io.sockets.sockets) {
            if(!this.Monde.Joueurs[i].jouer) finTour = false;
        }
        console.log(finTour)

        if(finTour){


            //Global
            //Generation Evenement + apply à l'univers
            this.Monde.nbTour++;
            //let evenements = Generate.Evenement(this.Monde.nbTour);
            //let evenementsChoix = this.Monde.addEvenement(evenements);
            //let evenements = Generate.EvenementDisplay(evenements);

            for(let i in io.sockets.sockets) { // i -> socket.id
                this.Monde.Joueurs[i].jouer = false;
                this.Monde.Joueurs[i].joueur.Update_Mois();

                //let ameliorations = Generate.Amelioration(this.Monde.Joueurs[i].joueur.amelioration.newTour(), this.Monde.Joueurs[i].joueur.solde, this.Monde.Joueurs[i].joueur.amelioration);
                //let repetitions = Generate.Repetition(this.Monde.Joueurs[i].joueur.repetition.newTour(), this.Monde.Joueurs[i].joueur.solde, this.Monde.Joueurs[i].joueur.amelioration);
                //let ponctuels = Generate.Ponctuel(this.Monde.Joueurs[i].joueur.solde, this.Monde.Joueurs[i].joueur.amelioration);
                //let critiques =  // A CODER ENCORE
                //Générer les barres coté serveur ? Enregistrer les choix proposés par Joueur pour éviter les hacks

                //Envoyer Les choix : {ameliorations | repetitions | ponctuels | evenementsChoix} 
                //+ les messages : {evenements}
                io.sockets.sockets[i].emit('newTurn', this.Monde.Joueurs[i].joueur);
            }
        }
    });
    socket.on('disconnect', ()=>{
        io.emit('menu');
        this.Monde = new Univers(n);
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