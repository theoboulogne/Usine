class Rendu{
    constructor(Lignes, Salaries){
        // utiliser "Salaries" pour effectuer le rendu des employés travaillant
        let game = this;
        this.scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        let camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.up.set( 0, 0, 1 ); // pour que orbitcontrols 'suive' la caméra

        camera.position.x = 5
        camera.rotation.y = ( 60* (Math.PI / 180)) 
        camera.rotation.z = ( 90* (Math.PI / 180)) 
        camera.position.z = 3;
        this.gltfLoader = new THREE.GLTFLoader();
        this.fbxLoader = new THREE.FBXLoader();
        this.controls = new THREE.OrbitControls( camera, renderer.domElement );
        
        // Redimensionnement du jeu auto
        window.addEventListener( 'resize', function() {
            let width = window.innerWidth;
            let height = window.innerHeight;
            renderer.setSize( width, height );
            Rendu.camera.aspect = width / height;
            Rendu.camera.updateProjectionMatrix();
        });

        this.models = [ // définition des nom de modèles en dur
            {nom:"reactor", model:undefined},
            {nom:"generator", model:undefined},
            {nom:"line", model:undefined},
            {nom:"tube", model:undefined},
            {nom:"end", model:undefined},
            {nom:"robot", model:undefined}
        ];
        for(let i=0; i<this.models.length; i++){ 
            game.gltfLoader.load( "../models/"+ game.models[i].nom +".gltf", function ( gltf ) {
                game.models[i].model = gltf;
            });
        }

        this.lignes = [];

        let loadCheck = setInterval(function() { // On attend que toutes nos pièces soient 
            if (game.checkLoadModels()) {  // chargées avant de commencer à les afficher
                clearInterval(loadCheck);
                game.Affichage(game.GenerationLigne());
                
            }
        }, 300);

        
        this.GenerationBoard(this.scene)
        this.GenerationLight(this.scene)

        function render() {
            requestAnimationFrame( render );
            renderer.render( game.scene, camera );
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
        board.position.z -= 1;
        game.add( board );
    }
    GenerationLight(game){
        let light = new THREE.AmbientLight( 0xb8b8b8 ); // soft white light
        game.add( light );
        let spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 50, 150, 50 );
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        game.add( spotLight );
    }


    checkLoadModels(){ // fonction de vérification de l'état de chargement des modèles
        for(let i=0; i<this.models.length; i++) if(this.models[i].model == undefined) return false;
        return true;
    }

    Affichage(Models){
        let game = this;
        for(let i=0; i<Models.length; i++){
            let object;
            
            for(let j=0; j<this.models.length; j++){
                if(this.models[j].nom == Models[i].nom) {
                    object = this.models[j].model.scene.clone()
                }
            }
            object.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        
                        child.material.metalness = 0.4;
                        child.material.roughness = 0.4;
                        
                        child.position.set(Models[i].position.y, Models[i].position.x, Models[i].position.z);
                        child.scale.set(Models[i].scale.x, Models[i].scale.y, Models[i].scale.z);
                        child.rotation.set(Models[i].rotation.x, Models[i].rotation.y, Models[i].rotation.z);

                        game.scene.add( child );
                    }
                } );
                
                //render();
        }
    }
    GenerationLigne(Ligne){
        // utiliser "Ligne" pour vérifier la variable auto du composant et afficher un modèle différent en conséquence
        return [
            {nom: "reactor", position:{x: 0, y: 0, z:0},scale:{x:0.005, y:0.005, z:0.005}, rotation:{x:0, y:0, z:0}},
            //{nom: "generator", position:{x: 0, y: 0, z:0},scale:{x:0.005, y:0.005, z:0.005}, rotation:{x:0, y:0, z:0}},
            //{nom: "line", position:{x: 0, y: 0, z:0},scale:{x:1, y:1, z:1}, rotation:{x:0, y:0, z:0}},
            //{nom: "line", position:{x: 0, y: 0, z:0},scale:{x:1, y:1, z:1}, rotation:{x:0, y:0, z:0}},
            //{nom: "line", position:{x: 0, y: 0, z:0},scale:{x:1, y:1, z:1}, rotation:{x:0, y:0, z:0}},
            //{nom: "line", position:{x: 0, y: 0, z:0},scale:{x:1, y:1, z:1}, rotation:{x:0, y:0, z:0}},
            //{nom: "line", position:{x: 0, y: 0, z:0},scale:{x:1, y:1, z:1}, rotation:{x:0, y:0, z:0}},
            //{nom: "tube", position:{x: 0, y: 0, z:0},scale:{x:1, y:1, z:1}, rotation:{x:0, y:0, z:0}},
            //{nom: "end", position:{x: 0, y: 0, z:0},scale:{x:0.005, y:0.005, z:0.005}, rotation:{x:0, y:0, z:0}},
        ];
    }
}