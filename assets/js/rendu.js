
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
        renderer = new THREE.WebGLRenderer({
            alpha: true,
          });
        renderer.setSize( window.innerWidth, window.innerHeight );

        let onClick = this.OnClick;
        let game = this;
        renderer.domElement.addEventListener("click", function(){onClick(event, game.Lignes)}, false); // On active les events

        document.body.appendChild( renderer.domElement );
        document.body.style.backgroundImage = "url('../textures/background.jpg')";
        document.body.style.backgroundSize = "cover"

        // On initialise la caméra
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //camera.up.set( 0, 0, 1 ); // pour que orbitcontrols 'suive' la caméra
        camera.position.x = 0;
        camera.position.y = 3;
        camera.position.z = 13;
        camera.rotation.y = ( 0* (Math.PI / 180)) 
        camera.rotation.z = ( 180* (Math.PI / 180))
        camera.up.set( 0, 0, 0 ); // pour que orbitcontrols 'suive' la caméra
        

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
        
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY
        }
        controls.enablePan = false; // translation
        controls.rotateSpeed = 0.4

        controls.maxDistance = 18
        controls.minDistance = 5

        controls.maxAzimuthAngle = Math.PI/6
        controls.minAzimuthAngle = -Math.PI/6
        controls.minPolarAngle = Math.PI *0.427777
        controls.maxPolarAngle = Math.PI *0.427777 // pour laisser la caméra au dessus du plateau
        
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
        this.lineMODELS = [
            { name:"reactor" },
            { name:"generator" },
            { name:"line" },
            { name:"tube" },
            { name:"end" },
            { name:"wall" },
        ];
        //Modèles avec animation
        this.characterMODELS = [
            { name: "Worker" },
            { name: "Robot" },
            { name: "ArmBot"}
        ];
        //Génération du mur
        let WallUnits = [
            {
                modelName: "wall", 
                position:{x: -16, y:0, z:-4},
                scale: 0.02, 
            }, 
            {
                modelName: "wall", 
                position:{x: -12, y:0, z:-4},
                scale: 0.02, 
            },  
            {
                modelName: "wall", 
                position:{x: -8, y:0, z:-4},
                scale: 0.02, 
            },  
            {
                modelName: "wall", 
                position:{x: -4, y:0, z:-4},
                scale: 0.02, 
            },   
            {
                modelName: "wall", 
                position:{x: 0, y:0, z:-4},
                scale: 0.02, 
            },   
            {
                modelName: "wall", 
                position:{x: 4, y:0, z:-4},
                scale: 0.02, 
            },   
            {
                modelName: "wall", 
                position:{x: 8, y:0, z:-4},
                scale: 0.02, 
            }, 
            {
                modelName: "wall", 
                position:{x: 12, y:0, z:-4},
                scale: 0.02, 
            },  
            {
                modelName: "wall", 
                position:{x: 16, y:0, z:-4},
                scale: 0.02, 
            },  
        ];
        this.LoadLine(WallUnits);

        //Animation du rendu
        animate();
        this.Lignes = [];
    }

    
    OnClick(event, Lignes){
        
        // Detection des clicks
        let raycaster = new THREE.Raycaster(); //Gestion de la détection des clicks (Events)
        
        let mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        let bool = false;
        for(let i=Lignes.length-1; i>=0; i--) {
            if(!bool){
                let tabTMP = raycaster.intersectObjects(Lignes[i].lignemodel, true)
                if(tabTMP.length) {
                    bool = true;
                    $("#modal_Magasin").modal({
                        escapeClose: false,
                        clickClose: false,
                        showClose: false,
                        toogle: true
                    });
                }
            }
        }
    }
    
        /*
        let Lignes = [{Composant:[{nbEmployes:0, nbRobots:1, auto:false}, {nbEmployes:0, nbRobots:1, auto:false}, {nbEmployes:2, nbRobots:0, auto:false}, {nbEmployes:1, nbRobots:1, auto:false}, {nbEmployes:0, nbRobots:0, auto:true}]}]

        this.GenerationUsine(Lignes);

        
        let game = this;
        let loadTest = setInterval(function() { // On attend que toutes nos pièces soient 
            if (game.loadCheck()) {  // chargées avant de commencer à les afficher
                clearInterval(loadTest);
            }
        }, 500);
        */

    /////////////////////////////////////////////////////////////////////////
    // Génération des unités avec leurs coordonnées selon les données du jeu
    /////////////////////////////////////////////////////////////////////////

    GenerationUsine(LIGNES) {

        //Enregistrer tableau ligne
        while(this.Lignes.length < LIGNES.length){
            this.Lignes.push({Ligne:JSON.parse(JSON.stringify(LIGNES[this.Lignes.length])), lignemodel:[], charactermodel:[], panne:[]})
            //ajouter nouvelles lignes
            this.LoadLine(this.GenerationLigne(this.Lignes[this.Lignes.length-1].Ligne, this.Lignes.length-1), this.Lignes[this.Lignes.length-1].lignemodel);
        }

        //reset
        for (let j=0; j<this.Lignes.length; j++) {
            let bool = false
            for (let k=0; k<5; k++) {
                if ((this.Lignes[j].Ligne.Composant[k].nbEmployes != LIGNES[j].Composant[k].nbEmployes) || 
                    (this.Lignes[j].Ligne.Composant[k].nbRobots != LIGNES[j].Composant[k].nbRobots) ||
                    (this.Lignes[j].Ligne.Composant[k].auto != LIGNES[j].Composant[k].auto)) {
                        
                    bool = true;
                    this.Lignes[j].Ligne.Composant[k].nbEmployes = LIGNES[j].Composant[k].nbEmployes;
                    this.Lignes[j].Ligne.Composant[k].nbRobots = LIGNES[j].Composant[k].nbRobots;
                    this.Lignes[j].Ligne.Composant[k].auto = LIGNES[j].Composant[k].auto;
                }
            }
            if(bool){
                for(let k=0; k<this.Lignes[j].charactermodel.length; k++){
                    scene.remove(this.Lignes[j].charactermodel[k]);
                }
                this.Lignes[j].charactermodel.length = 0
            }
        }

        
        for (let j=0; j<this.Lignes.length; j++) {
            let bool = false
            if (this.Lignes[j].Ligne.boolpanne && !LIGNES[j].boolpanne) {
                bool = true;
            }
            if(bool){
                if(this.Lignes[j].Ligne.boolpanne){
                    scene.remove(this.Lignes[j].panne[0]);
                    scene.remove(this.Lignes[j].panne[1]);
                    this.Lignes[j].panne.length = 0;
                }
                this.Lignes[j].Ligne.boolpanne = LIGNES[j].boolpanne;
            }
        }

        for(let i=0; i<this.Lignes.length; i++){
            if(this.Lignes[i].charactermodel.length == 0){
                this.LoadCharacters(this.GenerationWorker(this.Lignes[i].Ligne, i), this.Lignes[i].charactermodel);
            }
        }
        
        for(let i=0; i<this.Lignes.length; i++){
            if(this.Lignes[i].Ligne.boolpanne){
                this.LoadFire(i, this.Lignes[i].panne);
            }
        }
    }

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
               position:{x: -3, y:0.05, z:(Y*2)+0.07},
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
                            modelName: "ArmBot",
                            meshName: "OSG_Scene",
                            position: { x: -1.1 + 0.45*i, y: 0.21, z: (Y*2) + -0.6 + 0.81*nb },
                            scale: { x: 0.06, y:0.06, z:0.06 },
                            rotation: {x: (Math.PI/180)*0, y:(Math.PI/180)*180*(nb%2), z:(Math.PI/180)*0},
                            animationName: "Armature.002Action.001"
                        })
                        nb++;
                    }
                }

           else{

                let nb = 0;
                for(let j=0; j<Ligne.Composant[i].nbEmployes; j++){
                    UNITES.push({
                            modelName: "Worker",
                            meshName: "worker",
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
                            position: { x: -1.1 + 0.45*i, y: 0.1, z: (Y*2) + -0.4 + 0.81*nb },
                            scale: { x: 0.10, y:0.18, z:0.10 },
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
        
        let boardTexture = new THREE.ImageUtils.loadTexture("../textures/ground.png");
        boardTexture.repeat.set(20, 5);
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

        let geometry = new THREE.BoxGeometry( 80, 30, 1);

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
        spotLight.position.set( 50, 100, 50 );
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        scene.add( spotLight );

    }
    
    /////////////////////////////////////////////
    // Chargement des modèles de façon synchrone
    /////////////////////////////////////////////

    LoadFire(Y, ENREGISTREMENT){

        let plane = new THREE.PlaneBufferGeometry( 20, 20 );
        let fire = new THREE.Fire( plane, {
            textureWidth: 512,
            textureHeight: 512,
            debug: false
        } );
        fire.position.y = 1;

        fire.color1.set( 0xd2d2d2 );
        fire.color2.set( 0xd7d7d7 );
        fire.color3.set( 0x000000 );
        fire.windVector.x =  - 0.05;
        fire.windVector.y = 0.15;
        fire.colorBias = 0.3;
        fire.burnRate = 0.0;
        fire.diffuse = 0.8;
        fire.viscosity = 0.25;
        fire.expansion = -0.14;
        fire.swirl = 3.75;
        fire.drag = 0.4;
        fire.airSpeed = 18.0;
        fire.speed = 500.0;
        fire.massConservation = false;

        fire.addSource( 0.55, 0.2, 0.02, 0.2, 0.2, 0.2 );
        fire.position.z = Y*2;


        ENREGISTREMENT.push(fire);
        scene.add( fire );
    }

    LoadLine(UNITS, ENREGISTREMENT){
        if(ENREGISTREMENT == undefined) ENREGISTREMENT = []
        this.loadModels(this.lineMODELS, UNITS, ENREGISTREMENT)
    }
    LoadCharacters(UNITS, ENREGISTREMENT){
        this.loadModels(this.characterMODELS, UNITS, ENREGISTREMENT)
    }

    //Chargement des modèles 3D et instanciation
    loadModels(MODELS, UNITS, ENREGISTREMENT) {
        let game = this;
        let numLoadedModels = 0
        for ( var i = 0; i < MODELS.length; ++ i ) {

            var m = MODELS[ i ];

            game.loadGltfModel( m, function () {

                ++ numLoadedModels;

                if ( numLoadedModels === MODELS.length ) {

                    console.log( "Modèles chargés, lancement de l'initialisation" );
                    game.instantiate(MODELS, UNITS, ENREGISTREMENT);

                }

            } );

        }

    }

    //Instanciation des unités fournies
    instantiate(MODELS, UNITS, ENREGISTREMENT) {

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
                        console.log('add character : ')
                        console.log(u)
                        console.log(ENREGISTREMENT)
                        ENREGISTREMENT.push(clonedScene);
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
                                
                                if(u.modelName == "wall"){
                                    
                                    child.material.metalness = 0;
                                    child.material.roughness = 0;

                                }
                                else {

                                    child.material.metalness = 0.4;
                                    child.material.roughness = 0.4;

                                }
                                
                                if ( u.position ) {
                                
                                    child.position.set(u.position.x, u.position.y, u.position.z);
                                }

                                if ( u.scale ) {
                                
                                    child.scale.set(u.scale, u.scale, u.scale);
                                
                                }
                                
                                if ( u.rotation ) {

                                    child.rotation.set(u.rotation.x, u.rotation.y, u.rotation.z);
                                }
                                ENREGISTREMENT.push(child)
                                scene.add( child );
                            }
                        } );
                    }
                }

            } else {

                console.error( "Modèle suivant introuvable : ", u.modelName );
            }
        }

        console.log(MODELS);
        console.log( `Unités chargées` );
    }

    loadCheck() {
        let isLoaded = true;
        for ( let i=0; i<this.lineMODELS.length; i++) {
            if (this.lineMODELS[i].scene == undefined) {
                isLoaded = false;
            }
        }
        for ( let j=0; j<this.characterMODELS.length; j++) {
            if (this.characterMODELS[j].scene == undefined) {
                isLoaded = false;
            }
        }
        return isLoaded;
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