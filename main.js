var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#ababab',
    parent: 'phaser',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//var globales
var game = new Phaser.Game(config);

/*To-DO
- créer class accident pour gérer tout les accidents et les pannes
*/


class Cadre {
    constructor(x, y, width, height, topleft=0, topright=0, botleft=0, botright=0, alpha=0.8, depth=0){
        this.graphics = scene.add.graphics();
        this.graphics.setScrollFactor(0);
        this.graphics.depth = 990 + depth;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.nbIcones = 0
     
        this.graphics.lineStyle(2, 0xffff00, 1);
        this.graphics.fillStyle(0xC4C4C4, alpha)
     
        this.graphics.fillRoundedRect(x+5, y+5, width-10, height-10, { tl: topleft, tr: topright, bl: botleft, br: botright });
        this.graphics.strokeRoundedRect(x+5, y+5, width-10, height-10, { tl: topleft, tr: topright, bl: botleft, br: botright });
        

        //  Using an object to define a different radius per corner
    }
}
class Icone {
    constructor(img, positionx, positiony){
        this.image = scene.add.image(positionx,positiony, img);
        this.image.setScale(0.07)
        this.image.setScrollFactor(0);
        this.image.depth = 1000;
    }
    barre_progression(pourcentage){
        if(this.progressBar == undefined || this.progressBox == undefined){
            this.progressBar = scene.add.graphics();
            this.progressBox = scene.add.graphics();
            this.progressBar.setScrollFactor(0);
            this.progressBox.setScrollFactor(0);
            this.progressBar.depth = 1000;
            this.progressBox.depth = 1000;
            
            this.progressBox.lineStyle(2, 0xFFFAFA, 1);
            this.progressBox.strokeRect(this.image.x+30, this.image.y - 10, 100, 20);
        }
        if(pourcentage!=undefined){
            this.progressBar.clear();
            this.progressBar.fillStyle(0xFFFF00, 1);
            this.progressBar.fillRect(this.image.x+35, this.image.y - 5, 90 * pourcentage, 10);
        }
    }
    barre_nombre(nb, unite){
        if(this.numberBox == undefined){
            this.numberBox = scene.add.graphics();
            this.numberBox.depth = 1000;
            this.numberBox.setScrollFactor(0);
            
            this.numberBox.lineStyle(2, 0xFFFAFA, 1);
            this.numberBox.strokeRect(this.image.x+30, this.image.y - 10, 100, 20);
        }
        if(unite==undefined){
            this.texte = scene.add.text(this.image.x+35, this.image.y - 10, nb.toString(), { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
        }
        else {
            this.texte = scene.add.text(this.image.x+35, this.image.y - 10, nb.toString()+" "+unite, { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
        }
        this.texte.depth = 1000;
        this.texte.setScrollFactor(0);
    }
    nombre(nb, unite){
        if(unite==undefined){
            this.texte = scene.add.text(this.image.x+35, this.image.y - 15, nb.toString(), { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 30 });
        }
        else {
            this.texte = scene.add.text(this.image.x+35, this.image.y - 15, nb.toString()+" "+unite, { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 30 });
        }
        this.texte.setScrollFactor(0);
        this.texte.depth = 1000;
    }
}

//class Commercial {
//    constructor(){
//        this.commission // Commission sur la vente, augmentant les chances de vendre ( par client ? globalement ?)
//        this.prix // prix de vente de l'objet, impact de la commission sur le commercial définit par la relation:
                  // Salaire / (Commission * prix)  | avec Salaire = salaire d'un employé normal
//    }
    //Méthode de calcul de l'impact sur les ventes
//}
/* Variables globales non définies
 - Salaire d'un employé
 - this.avantages // avantages offerts par l'entreprise

    ...
Environnement :
    **Energie (methode calcul pollution)
    **Machines (pollution + dechets)
    Respect des Normes (à définir avec les choix + Evenements randoms)
Vie Sociale :
    **Employe (qualTravail + avantages)
    **Securité (employe.accident + Energie.auxilliaire.securite?A VOIR? + choix)
Ventes : Flou pour le moment..
    Stock de produits
    Image de marque
    Parts de marché
    Pubs
    Commerciaux (impact sur les ventes)
Production :
    Nb(Employes + Robots)
    cadence de travail(qualTravail - employe.accident + Stocks)
    Machine(Nb, qualité)
    uptimeGlobal

    */




//Barres Globales :
// - Environnement   = (pollutionMachine+NRJ) + déchets + Respect des Normes
// - Vie Sociale     = qualTravail + avantages + securite
// - Ventes          = Stock + Image de marque + Parts de marché + Pubs + Commerciaux
// - Production      = Nb(Employe+Robots) + cadence de travail + Machine(Nb+qualité+UptimeGlobal)

//Magasin : (+/-)
// - Employés / Robots
// - Commerciaux + commission ajustable
// - Prix de vente
// - Production visée

function preload ()
{
    
    // TEST DE TILEMAP POUR L'USINE :


    // json fichier de config de la texture terre et eau
    this.load.json('map', 'tilemap/isometric-grass-and-water.json');
    // sprite fichier image terre et eau
    this.load.spritesheet('tiles', 'tilemap/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });





    // sprite fichier image skelette
    /*
    this.load.spritesheet('skeleton', 'assets/tests/iso/skeleton8.png', { frameWidth: 128, frameHeight: 128 });
    // image de la maison
    this.load.image('house', 'assets/tests/iso/rem_0002.png');
    */
    this.load.image('argent', 'images/argent.png');
    this.load.image('ecologie', 'images/ecologie.png');
    this.load.image('machine', 'images/machine.png');
    this.load.image('progression', 'images/progression.png');
    this.load.image('salaires', 'images/salaires.png');
    this.load.image('salarie', 'images/salarie.png');
    

}

function create ()
{
    scene = this;
    
    // this => scene
    // var cursors = this.input.keyboard.createCursorKeys(); -> Récupérer fleches clavier
    //  on definit la taille de jeu
    
    //Changer les méthodes pour les réutiliser partout



    //Test de tilemap pour l'usine
    //buildMap();

    
        

    var cadre_gauche = new Cadre(10,10,190,270, 50, 0 ,0 ,0 ,0.7); // arrondi élevé en haut a gauche et léger en bas a gauche
    var cadre_bureau = new Cadre(250,370,800,280, 50, 50 ,0 ,0 ,1); // arrondi élevé en haut a gauche et léger en bas a gauche
    var cadre_test = new Cadre(200,10,190,270);
    var cadre_test1 = new Cadre(390,10,190,270);

    this.texte = scene.add.text(50, 20, "test", { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });

    // taille/position de la camera a gerer
    //this.cameras.main.setSize(1600, 600); 
   //this.cameras.main.setBounds(0, 0, 800, 400).setName('main');

    //game.state.add('load', load);
    
    //Créer l'interface
    //  On initialise l'interface puis on la fixe a la camera avec :
    //      elem.fixedToCamera = true;
    // ====> TROUVER AUTRE CHOSE..


    //  Align only works with multi-lined text.
    //this.add.text(200, 200, 'Case shrugged.\nThe girl to his right giggled and nudged him.', { color: '#00ff00', align: 'right' });
    


    //Créer l'Usine
    //  Créer Robots/Humains par défault
    //  Créer Machines, ajouter les effets spéciaux

}

// test de tilemap pour l'usine
function buildMap ()
{
    //  Parse the data out of the map
    var data = scene.cache.json.get('map'); // on récupère le fichier json

    var tilewidth = data.tilewidth; // on définit la taille d'une case
    var tileheight = data.tileheight;

    tileWidthHalf = tilewidth / 2; //initialisation des variables, *0.5 car scale de .5
    tileHeightHalf = tileheight / 2;

    var layer = data.layers[0].data; // on récupère la def de la map

    var mapwidth = data.layers[0].width; // taille de la carte en cases
    var mapheight = data.layers[0].height;

    var centerX = mapwidth * tileWidthHalf; // taille de la carte sur l'écran (pixels ?)
    var centerY = 16;

    var i = 0;

    for (var y = 0; y < mapheight; y++) // affichage de la carte
    {
        for (var x = 0; x < mapwidth; x++)
        {
            id = layer[i] - 1; // on récupère l'id de la case

            var tx = 400 + ((x - y) * tileWidthHalf); // on définit la position
            var ty = (x + y) * tileHeightHalf;

            var tile = scene.add.image(centerX + tx /* définit de la position de l'image */, centerY + ty, 'tiles' /*type ?*/, id/*id de l'animation*/); 
            //tile.setScale(.5)
            tile.depth = centerY + ty; //profondeur de l'image
            

            i++; // on passe a la texture suivante
        }
    }
}


function update ()
{
    d = true;
    //this.cameras.main.scrollX = 800;
    
    
}