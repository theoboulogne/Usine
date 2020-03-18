# Usine

Le jeu est une simulation de direction d'une entreprise, dans laquelle le joueur sera amené à prendre des décisions pour changer son entreprise et essayer de la rendre moins poluante et et plus propice à un bonne environement de travail.
On s'est basé sur les caractéristique de l'usine du futur que nous avons trouvé sur le site "http://industriedufutur.fim.net/".
Dans notre jeu, nous proposons plusieurs type de choix, d'abord on offre l'accès à un store où le joueur pourra par exemple engager ou virer des employés, et il y aura des choix plus drastiques qui seront proposé pendant la partie par exemple passé sur des énergie renouvlable pour réduire son taux de polution, évidement chaque choix a des conséquences bonnes et mauvaises, c'est pourquoi il faudra faire attention à bien faire évoluer son entreprise tout en gardant une certaine harmonie entre les différents critères d'évaluations.


    Fonctionnalités principales :

## Environnement :
-    Energie 
-    Machines 
-   Respect des Normes 
## Vie Sociale :
-    Employe 
-    Securité 
## Ventes :
-   Stock de produits
-   Image de marque
-   Parts de marché
-   Pubs
-   Commerciaux 
## Production :
-    nbElement
-    cadence de travail
-    Machine
-    uptimeGlobal
## Magasin :
-   nbEmployés / nbRobots
-   Production visée 
-   Prix de vente
-   Gestion de la vente : Commerciaux ou Pubs ou a voir

## Autre :

- créer class accident pour mieux gérer tout les accidents, les pannes et la sécurité
- Evaluer tout ce qui est améliorable ou non



## Joueur :

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



## Ligne :

coutReparation = 8000;  cout fixe, en cas de panne
accident = 0; nombres d'accidents au total sur cette ligne de production
boolaccident = false; accident sur la ligne de prod
boolpanne = false; panne sur la ligne de prod
Composant = []
    avec 5 Composant



## Composant :

this.nbEmployes = 0; on Stocke le nombre d'ouvriers assignés, varie au cours d'une journée
this.nbRobots = 0;
carte=("");  Caractéristiques fixes au composant
auto = false; besoin d'un employé sur un composant pour faire marcher la machine ou non
consomationNRJ = 0.003;
dechets = 8;
pollution = 40;
production = 30;
this.accident = 0.02;


-----------------------

# Fonctionnement d'un tour



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
