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
let devlog_init_jeu = true;
let devlog_init_ligne = true;
let devlog_init_composant = true;
let devlog_update_jeu = true
let devlog_update_ligne = true;

//Jeu :
//fonction utile à phaser
function preload ()
{
    // TEST DE TILEMAP POUR L'USINE :
    // json fichier de config de la texture terre et eau
    this.load.json('map', 'tilemap/isometric-grass-and-water.json');
    // sprite fichier image terre et eau
    this.load.spritesheet('tiles', 'tilemap/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    // TEST D'AFFICHAGE DE LOGO + BARRE :
    this.load.image('argent', 'images/argent.png');
    this.load.image('ecologie', 'images/ecologie.png');
    this.load.image('machine', 'images/machine.png');
    this.load.image('progression', 'images/progression.png');
    this.load.image('salaires', 'images/salaires.png');
    this.load.image('salarie', 'images/salarie.png');
}
function create ()
{
    TEST = new Joueur(); // On essaye notre jeu
    TEST.Update_Mois();

    scene = this;

    //Test de tilemap pour l'usine
    buildMap();
    //Test d'icones + barre/texte
    var progression = new Icone('progression', 50,50)
    progression.barre_progression(1)
    var ecologie = new Icone('ecologie', 50, 90)
    ecologie.barre_progression(1)
    var argent = new Icone('argent', 50, 130)
    argent.barre_nombre(192000,'$')
    var salaires = new Icone('salaires', 50, 170)
    salaires.barre_nombre(8200,'/mois')
    var machine = new Icone('machine', 40, 250)
    machine.nombre(5);
    var salarie = new Icone('salarie', 125, 250)
    salarie.nombre(2);
    //Test de cadre pour l'interface
    var cadre_gauche = new Cadre(10,10,190,270, 50, 0 ,0 ,0 ,0.7); 
    var cadre_bureau = new Cadre(250,370,800,280, 50, 50 ,0 ,0 ,1);

}
function update ()
{
}