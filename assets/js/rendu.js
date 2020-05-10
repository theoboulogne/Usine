
//////////////////////
// Variables globales
//////////////////////
let scene = null;
let renderer = null;
let camera = null;
let clock = null;
let mixers = [];
//////////////////////

/**
 * Boucle de rendu
 */
function animate() {

    requestAnimationFrame( animate );

    // Récupère le temps écoulé depuis le dernier affichage

    let mixerUpdateDelta = clock.getDelta();

    // Update toutes les animations

    for ( let i = 0; i < mixers.length; ++ i ) {

        mixers[ i ].update( mixerUpdateDelta );

    }
    
    renderer.render( scene, camera );

}


class Rendu{

    constructor(){

        //////////////////////////////
        // Initialisation de la scene
        //////////////////////////////

        // On initialise la scène ThreeJs
        scene = new THREE.Scene();

        // On initialise le rendu
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // On initialise la caméra
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //camera.up.set( 0, 0, 1 ); // pour que orbitcontrols 'suive' la caméra
        camera.position.x = 0
        camera.position.y = 3
        camera.position.z = 5;
        camera.rotation.y = ( 0* (Math.PI / 180)) 
        camera.rotation.z = ( 180* (Math.PI / 180)) 

        // Redimensionnement du jeu auto
        window.addEventListener( 'resize', function() {
            
            let width = window.innerWidth;
            let height = window.innerHeight;
            
            renderer.setSize( width, height );

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
        });
        
        //////////////////////////////
        // Utilisation des librairies
        //////////////////////////////

        // Caméra dynamique
        let controls = new THREE.OrbitControls( camera, renderer.domElement );
        // Loadeur des modèles
        this.gltfLoader = new THREE.GLTFLoader();
        // Initialisation de la clock pour l'enregistrement du temps entre les frames
        clock = new THREE.Clock();

        /////////////////////////////////////////
        // Génération du plateau et des lumières
        /////////////////////////////////////////
 
        this.GenerationBoard()

        this.GenerationLight()

        //////////////////////////////////////////
        // Informations sur les modèles à charger
        //////////////////////////////////////////
        
        //Ligne de Production
        let lineMODELS = [
            { name:"reactor" },
            { name:"generator" },
            { name:"line" },
            { name:"tube" },
            { name:"end" },
            //{ name:"robotArm" }
        ];
        //Modèles avec animation
        let characterMODELS = [
            { name: "Worker" },
            { name: "Robot" },
            { name: "armBot"}
        ];

        //Animation du rendu
        animate();
    

        /////////////////
        // Phase de test
        /////////////////
        
        //this.loadModels(characterMODELS, UNITS);

        let Ligne = {Composant:[{auto:true, nbEmployes:1, nbRobots:1}, {auto:false, nbEmployes:1, nbRobots:1}, {auto:false, nbEmployes:0, nbRobots:2}, {auto:false, nbEmployes:2, nbRobots:0}, {auto:false, nbEmployes:1, nbRobots:1}]}
        
        this.loadModels(lineMODELS, this.GenerationLigne(Ligne, 0));
        this.loadModels(characterMODELS, this.GenerationWorker(Ligne, 0));
        this.loadModels(lineMODELS, this.GenerationLigne(Ligne, 1));
        this.loadModels(characterMODELS, this.GenerationWorker(Ligne, 1));
        
        
    }
    
    /////////////////////////////////////////////////////////////////////////
    // Génération des unités avec leurs coordonnées selon les données du jeu
    /////////////////////////////////////////////////////////////////////////

    GenerationLigne(Ligne, Y){
        // utiliser "Ligne" pour vérifier la variable auto du composant et afficher un modèle différent en conséquence
        return [
           {
               modelName: "reactor", 
               position:{x: 2.05, y: 0.5, z:Y*2},
               scale: 0.005, 
               rotation:{x: (Math.PI/180)*90, y:(Math.PI/180)*0, z:(Math.PI/180)*-90},
           },
           {
               modelName: "generator", 
               position:{x: 1.36, y: 0.05, z:Y*2},
               scale: 0.0025,
               rotation:{x: (Math.PI/180)*90, y:(Math.PI/180)*0, z:(Math.PI/180)*0},
           },
           {
               modelName: "line", 
               position:{x: 0.95, y: 0.2, z:Y*2},
               scale: 0.003, 
               rotation:{x: (Math.PI/180)*0, y:(Math.PI/180)*0, z:(Math.PI/180)*90},
           },
           {
               modelName: "line", 
               position:{x: 0.39, y: 0.2, z:Y*2},
               scale: 0.003, 
               rotation:{x: (Math.PI/180)*0, y:(Math.PI/180)*0, z:(Math.PI/180)*90},
           },
           {
               modelName: "line", 
               position:{x: -0.17, y: 0.2, z:Y*2},
               scale: 0.003, 
               rotation:{x: (Math.PI/180)*0, y:(Math.PI/180)*0, z:(Math.PI/180)*90},
           },
           {
               modelName: "line", 
               position:{x: -0.75, y: 0.2, z:Y*2},
               scale: 0.003, 
               rotation:{x: (Math.PI/180)*0, y:(Math.PI/180)*0, z:(Math.PI/180)*90},
            },
            {
               modelName: "tube", 
               position:{x: -2, y: 0, z:Y*2},
               scale: 0.7, 
               rotation:{x: (Math.PI/180)*0, y:(Math.PI/180)*270, z:(Math.PI/180)*270},
            },
            {
               modelName: "end", 
               position:{x: -3, y:-0.05, z:(Y*2)+0.06},
               scale: 0.004, 
            },   
        ];
    }

    GenerationWorker(Ligne, Y) {
        /*
        (2%2 == 0)*180
        */
       let UNITES = []
       
       for(let i=0; i<Ligne.Composant.length; i++){
           //Si auto 
           if ( Ligne.Composant[i].auto ){

                let nb = 0;
                for(let j=0; j<1; j++){
                    UNITES.push({
                            modelName: "armBot",
                            meshName: "Character",
                            position: { x: -1.1 + 0.45*i, y: 0.25, z: (Y*2) + -0.4 + 0.81*nb },
                            scale: { x: 0.0007, y:0.0007, z:0.0007 },
                            rotation: {x: (Math.PI/180)*0, y:(Math.PI/180)*180*(nb%2), z:(Math.PI/180)*0},
                            animationName: "work"
                        })
                        nb++;
                    }
                }

           else{

                let nb = 0;
                for(let j=0; j<Ligne.Composant[i].nbEmployes; j++){
                    UNITES.push({
                            modelName: "Worker",
                            meshName: "Character",
                            position: { x: -1.1 + 0.45*i, y: 0.05, z: (Y*2) + -0.4 + 0.81*nb },
                            scale: { x: 0.3, y:0.3, z:0.3 },
                            rotation: {x: (Math.PI/180)*0, y:(Math.PI/180)*180*(nb%2), z:(Math.PI/180)*0},
                            animationName: "work"
                        })
                        nb++;
                }
                for(let j=0; j<Ligne.Composant[i].nbRobots; j++){
                        UNITES.push({
                            modelName: "Robot",
                            meshName: "Robot",
                            position: { x: -1.1 + 0.45*i, y: 0.15, z: (Y*2) + -0.4 + 0.81*nb },
                            scale: { x: 0.10, y:0.16, z:0.10 },
                            rotation: {x: (Math.PI/180)*0, y:(Math.PI/180)*180*(nb%2), z:(Math.PI/180)*0},
                            animationName: "work"
                        })
                        nb++;
                }
            }
       }

       return UNITES;
    }

    /////////////////////////////////////////
    // Génération du plateau et des lumières
    /////////////////////////////////////////
    
    GenerationBoard(){
        
        let boardTexture = new THREE.ImageUtils.loadTexture("../textures/ground2.png");
        boardTexture.repeat.set(10, 10);
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

        let geometry = new THREE.BoxGeometry( 10, 10, 1);

        let board = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(boardMaterials) );
        board.receiveShadow = true;
        board.rotation.x = - Math.PI / 2;
        board.position.y -= 0.45

        scene.add( board );

    }
    
    GenerationLight(){

        let light = new THREE.AmbientLight( 0x808080 ); // soft white light
        scene.add( light );

        let spotLight = new THREE.SpotLight( 0xcccccc );
        spotLight.position.set( 50, 250, 50 );
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        scene.add( spotLight );

    }

    ////////////////////
    // Gestion de l'Hud
    ////////////////////

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
    
    /////////////////////////////////////////////
    // Chargement des modèles de façon synchrone
    /////////////////////////////////////////////

    //Chargement des modèles 3D et instanciation
    loadModels(MODELS, UNITS) {
        let game = this;
        let numLoadedModels = 0
        for ( var i = 0; i < MODELS.length; ++ i ) {

            var m = MODELS[ i ];

            game.loadGltfModel( m, function () {

                ++ numLoadedModels;

                if ( numLoadedModels === MODELS.length ) {

                    console.log( "Modèles chargés, lancement de l'initialisation" );
                    game.instantiate(MODELS, UNITS);

                }

            } );

        }

    }

    //Instanciation des unités fournies
    instantiate(MODELS, UNITS) {

        let numSuccess = 0;

        for ( let i = 0; i < UNITS.length; ++ i ) {

            let u = UNITS[ i ];
            
            let model = this.getModelByName(MODELS, u.modelName );

            if ( model ) {

                let clonedScene;

                if ( u.meshName ) {

                    clonedScene = THREE.SkeletonUtils.clone( model.scene );

                    if ( clonedScene ) {

                        // On sélectionne la Mesh à animer
                        let clonedMesh = clonedScene.getObjectByName( u.meshName );

                        if ( clonedMesh ) {

                            let mixer = this.startAnimation( clonedMesh, model.animations, u.animationName );

                            // On rajoute l'animation dans le mixer pour la boucle de rendu
                            mixers.push( mixer );
                            numSuccess ++;
                        }

                        // On change les positions, tailles et rotations en fonction du modèle
                        scene.add( clonedScene );

                        if ( u.position ) {

                            clonedScene.position.set( u.position.x, u.position.y, u.position.z );

                        }

                        if ( u.scale ) {

                            clonedScene.scale.set( u.scale.x, u.scale.y, u.scale.z );

                        }

                        if ( u.rotation ) {

                            clonedScene.rotation.x = u.rotation.x;
                            clonedScene.rotation.y = u.rotation.y;
                            clonedScene.rotation.z = u.rotation.z;

                        }
                    }
                }
                else{
                    clonedScene = model.scene.clone();

                    if ( clonedScene ) {

                        // On change les positions, tailles et rotations en fonction du modèle
                        
                        clonedScene.traverse( function ( child ) {
                            if ( child.isMesh ) {
                                
                                child.material.metalness = 0.4;
                                child.material.roughness = 0.4;

                                
                                if ( u.position ) {
                                
                                    child.position.set(u.position.x, u.position.y, u.position.z);
                                }

                                if ( u.scale ) {
                                
                                    child.scale.set(u.scale, u.scale, u.scale);
                                
                                }
                                
                                if ( u.rotation ) {

                                    child.rotation.set(u.rotation.x, u.rotation.y, u.rotation.z);
                                }

                                scene.add( child );
                            }
                        } );
                    }
                }

            } else {

                console.error( "Modèle suivant introuvable : ", u.modelName );
            }
        }

        console.log( `Unités chargées` );
    }

    //Lancement de l'animation sélectionnée
    startAnimation( skinnedMesh, animations, animationName ) {

        let mixer = new THREE.AnimationMixer( skinnedMesh );
        let clip = THREE.AnimationClip.findByName( animations, animationName );

        if ( clip ) {

            let action = mixer.clipAction( clip );
            action.play();

        }

        return mixer;
    }

    //Récupération du modèle selon le nom
    getModelByName( models, name ) {

        for ( var i = 0; i < models.length; ++ i ) {

            if ( models[ i ].name === name ) {

                return models[ i ];

            }
        }

        return null;
    }

    //Chargement des modèles avec GLTFLoader
    loadGltfModel( model, onLoaded ) {

        if(Object.getOwnPropertyNames(model).length == 1){

            let modelName = "../models/" + model.name + ".gltf";

            this.gltfLoader.load( modelName, function ( gltf ) {

                let sceneModel = gltf.scene;

                model.animations = gltf.animations;
                model.scene = sceneModel;

                // On active les ombres

                gltf.scene.traverse( function ( object ) {

                    if ( object.isMesh ) {

                        object.castShadow = true;

                    }

                } );

                console.log( "Done loading model", model.name );

                onLoaded();
            } );
        }
        else onLoaded();
    }
    
}