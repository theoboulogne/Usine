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