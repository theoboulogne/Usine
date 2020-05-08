class Rendu{
    constructor(Lignes, Salaries){
        // utiliser "Salaries" pour effectuer le rendu des employés travaillant
        let game = this;
        game.scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        let camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.up.set( 0, 0, 1 ); // pour que orbitcontrols 'suive' la caméra

        camera.position.x = 5
        camera.rotation.y = ( 60* (Math.PI / 180)) 
        camera.rotation.z = ( 90* (Math.PI / 180)) 
        camera.position.z = 3;
        game.gltfLoader = new THREE.GLTFLoader();
        game.fbxLoader = new THREE.FBXLoader();
        game.controls = new THREE.OrbitControls( camera, renderer.domElement );
        game.clockAnim = new THREE.Clock();

        
        // Redimensionnement du jeu auto
        window.addEventListener( 'resize', function() {
            let width = window.innerWidth;
            let height = window.innerHeight;
            renderer.setSize( width, height );
            Rendu.camera.aspect = width / height;
            Rendu.camera.updateProjectionMatrix();
        });

        game.models = [ // définition des nom de modèles en dur
            {nom:"reactor", model:undefined},
            {nom:"generator", model:undefined},
            {nom:"box", model:undefined},
            {nom:"tube", model:undefined},
            {nom:"end", model:undefined},
            {nom:"robot", model:undefined}
        ];
        for(let i=0; i<game.models.length; i++){ 
            game.gltfLoader.load( "../models/"+ game.models[i].nom +".gltf", function ( gltf ) {
                game.models[i].model = gltf;
            });
        }

        game.lignes = [];

        let loadCheck = setInterval(function() { // On attend que toutes nos pièces soient 
            if (game.checkLoadModels()) {  // chargées avant de commencer à les afficher
                clearInterval(loadCheck);
                game.Affichage(game.GenerationLigne());
                
            }
        }, 300);

////////////////////////////////////////////////////////////////////////
        
        // load worker model/animation
        /*
        console.log("loader");
        game.fbxLoader.load( 'models/workerNoAnim.fbx', function ( object ) {

            mixer = new THREE.AnimationMixer( object );

            //var action = mixer.clipAction( object.animations[ 0 ] );
            //action.play();

            object.traverse( function ( child ) {

                if ( child.isMesh ) {

                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            scene.add( object );
        } );*/

        let mixers = [];
        game.fbxLoader.load( 'models/worker.fbx', addObj);
        function addObj(object) {
            object.mixer = new THREE.AnimationMixer( object );
            mixers.push( object.mixer );
            playerRun = object.mixer.clipAction( object.animations[ 0 ] );
            playerRun.play();
            scene.add( object );
        }
        
        function anim() {
            let deltaAnim = game.clockAnim.getDelta();
            if ( mixers.length > 0 ) {
                for ( let i = 0; i < mixers.length; i ++ ) {
                    mixers[ i ].update( deltaAnim );
                }
            }
        }
        anim();

        
        var model = game.scene;
        var mixer = new THREE.AnimationMixer( model );
        //var action = mixer.clipAction( game.animations[0] );

        // Play one animation
        //action.play();

        // Play all animations
        //game.animations.forEach( function ( clip ) {
        //    mixer.clipAction( clip ).play();
        //} );
        

/////////////////////////////////////////////////////////
        
        game.GenerationBoard(game.scene)
        game.GenerationLight(game.scene)

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
        let geometry = new THREE.BoxGeometry( 10, 10, 0.1);
        let board = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(boardMaterials) );
        //board.position.z -= 1;
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
            
            for(let j=0; j<game.models.length; j++){
                if(game.models[j].nom == Models[i].nom) {
                    object = game.models[j].model.scene.clone()
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
            {nom: "reactor", position:{x: 2.38, y: 0, z:0.35},scale:{x:0.004, y:0.004, z:0.004}, rotation:{x:0, y:0, z:0}},
            {nom: "generator", position:{x: 1.83, y: 0, z:0.07},scale:{x:0.002, y:0.003, z:0.002}, rotation:{x:3.14, y:0, z:-1.57}},
            {nom: "box", position:{x: 0.95, y: 0, z:0.17},scale:{x:0.003, y:0.003, z:0.003}, rotation:{x:0, y:4.71, z:0}},
            {nom: "box", position:{x: 0.39, y: 0, z:0.17},scale:{x:0.003, y:0.003, z:0.003}, rotation:{x:0, y:4.71, z:0}},
            {nom: "box", position:{x: -0.17, y: 0, z:0.17},scale:{x:0.003, y:0.003, z:0.003}, rotation:{x:0, y:4.71, z:0}},
            {nom: "box", position:{x: -0.75, y: 0, z:0.17},scale:{x:0.003, y:0.003, z:0.003}, rotation:{x:0, y:4.71, z:0}},
            {nom: "tube", position:{x: -1.4, y: 0, z:0.2},scale:{x:0.7, y:0.7, z:0.7}, rotation:{x:4.71, y:0, z:1.57}},
            {nom: "end", position:{x: -2.7, y:-0.05, z:0.05},scale:{x:0.004, y:0.004, z:0.004}, rotation:{x:1.56, y:0, z:0}},
            
        ];
    }
}