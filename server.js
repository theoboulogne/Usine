
//Serveur - CIRious Game

//Constantes

const port = 800;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io =  require('socket.io')(server);

//Import de classes
const Univers = require('./server_modules/Jeu/Univers');

//Renvoi vers le fichier index client
app.use(express.static(__dirname + '/assets/'));
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/assets/views/game.html') // on renvoi vers le jeu pour le moment, 
                                                        // -> renvoyer vers le menu et vers le jeu par la suite
});

//On enregistre nos Joueurs, on lance à n joueurs

let n = 1
this.Monde = new Univers(n); // instancier un "Univers" pour stocker les infos des ventes et générer les évents
// reste a modifier en conséquence

io.sockets.on('connection',  (socket) =>{
    console.log('Debut Connection Client (coté serveur)')

    console.log(this.Monde);

    if(this.Monde.Joueurs.nb >= this.Monde.NbJoueursMax) {
        console.log('send disconnect')
        socket.emit('disconnect'); 
        socket.disconnect();
    }
    else {
        console.log('add joueur au monde')
        this.Monde.addJoueur(socket.id);
        console.log(this.Monde);
        // on informe le client que la connection est effectuée
        console.log('send repconnection')
        
        socket.emit('repconnection', this.Monde.Joueurs[socket.id].joueur) // on envoi les données générées

        if(this.Monde.Joueurs.nb == this.Monde.NbJoueursMax) io.emit('start');
    }




    socket.on('endTurn', (socket, Tour)=> { // balancer les infos modifiées en argument aussi dans une classe "Tour" 
                                            // prennant tout ce qui est necessaire et l'appliquant si possible
        this.Monde.Joueurs[socket.id].jouer = true;

        let finTour = true;
        for(let i=0; i<io.sockets.length; i++) if(!this.Monde.Joueurs[io.sockets[i].id].jouer) finTour = false;

        if(finTour){
            for(let i=0; i<io.sockets.length; i++) this.Monde.Joueurs[io.sockets[i].id].jouer = false;
            for(let i=0; i<io.sockets; i++) this.Monde.Joueurs[io.sockets[i].id].Update_Mois(); // mettre l'univers en argument pour influencer ? 
                                                                    //faire une methode sur l'univers pour update les joueurs ??


            for(let i=0; i<io.sockets; i++) io.sockets[i].emit('newTurn', this.Monde.Joueurs[io.sockets[i].id].joueur);
        }
    });
    socket.on('disconnect', ()=>{
        io.emit('disconnect'); // changer ?
        
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