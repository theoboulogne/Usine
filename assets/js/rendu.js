/**
 * Created by justinmiller on 4/2/15.
 * Puis édité..
 */

class Rendu{
    constructor(Lignes, Salaries){
        // utiliser "Salaries" pour effectuer le rendu des employés travaillant
        let scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        let camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.x = 5
        camera.rotation.y = ( 60* (Math.PI / 180)) 
        camera.rotation.z = ( 90* (Math.PI / 180)) 
        camera.position.z = 3;
        this.objLoader = new THREE.OBJLoader();
        
        this.GenerationBoard(scene)
        this.GenerationLight(scene)
        for(let i=0; i<Lignes.length; i++) this.Affichage(this.GenerationLigne(Lignes[i], i), scene)

        function render() {
            requestAnimationFrame( render );
            renderer.render( scene, camera );
        }
        render();
    }

    SetBarre(id, pourcentage){
        document.getElementById(id).setAttribute("style","width:"+pourcentage.toString()+"%");
    }
    DropDown(idbouton, iddropdown){
        document.getElementById(idbouton).addEventListener("click", function(){ // on active le bouton
            document.getElementById(iddropdown).classList.toggle("show"); 
        });
        document.getElementById(iddropdown).addEventListener('click', function (event) {  // on laisse ouvert si click dans le dropdown
            event.stopPropagation(); 
        }); 
        window.onclick = function(event) { //on ferme si click en dehors du dropdown
            if (!document.getElementById(idbouton).contains(event.target)) { 
                if(document.getElementById(iddropdown).classList.contains('show')) { 
                    document.getElementById(iddropdown).classList.remove('show'); 
                }
            }
        }
    }
    
    Affichage(Models, game){
        for(let i=0; i<Models.length; i++){
            this.objLoader.load("../models/" + Models[i].name + ".obj", function(object) {
                object.traverse( function ( child ) {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshLambertMaterial({color: 0x555555});
                        child.position.set(-1.75 + (0.5 * Models[i].y),-1.75 + (0.5 * Models[i].x),0.5 + Models[i].z);
                        child.scale.set(Models[i].scale, Models[i].scale, Models[i].scale);
                        child.rotation.z = Models[i].rotation.z;
                        child.rotation.x = Models[i].rotation.x;
                        child.rotation.y = Models[i].rotation.y;
                        game.add(child);
                    }
                });
            });
        }
    }
    GenerationLigne(Ligne, y){ 
        // utiliser "Ligne" pour vérifier la variable auto du composant et afficher un modèle différent en conséquence
        return [
            {name: "Machinerie", x: 2, y: 1+y, z:0,scale:0.0025, rotation:{x:3.25, y:1.7, z:-.1}},
            {name: "Compresseur", x: 3.5, y: 1+y, z:0,scale:0.005, rotation:{x:1.6, y:1.7, z:-3.25}},
            {name: "Centrifugeuse", x: 3.9, y: 1+y, z:-.2,scale:0.003, rotation:{x:1.6, y:3.1, z:-.1}},
            {name: "Convoyeur", x: 5.35, y: 1+y, z:-.45, scale:0.005, rotation:{x:1.6, y:1.7, z:-.1}}
        ];
    }
    GenerationBoard(game){
        let boardTexture = new THREE.ImageUtils.loadTexture("../textures/board-pattern.png");
        boardTexture.repeat.set(6,6);
        boardTexture.wrapS = THREE.RepeatWrapping;
        boardTexture.wrapT = THREE.RepeatWrapping;
        let boardMaterials = [
            new THREE.MeshLambertMaterial({color: 0x555555}),
            new THREE.MeshLambertMaterial({color: 0x555555}),
            new THREE.MeshLambertMaterial({color: 0x555555}),
            new THREE.MeshLambertMaterial({color: 0x555555}),
            new THREE.MeshLambertMaterial({ map: boardTexture }),
            new THREE.MeshLambertMaterial({color: 0x555555})
        ];
        let geometry = new THREE.BoxGeometry( 6, 6, 0.01);
        let board = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(boardMaterials) );
        game.add( board );
    }
    GenerationLight(game){
        let light = new THREE.AmbientLight( 0x555555 ); // soft white light
        game.add( light );
        let spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 50, 100, 50 );
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        game.add( spotLight );
    }

}