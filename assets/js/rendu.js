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
        camera.position.x = 200
        camera.rotation.y = ( 60* (Math.PI / 180)) 
        camera.rotation.z = ( 90* (Math.PI / 180)) 
        camera.position.z = 100;


        /*let loader = new THREE.GLTFLoader();
        loader.load( 'models/Ouvrier.glb', function ( gltf ) {

            model = gltf.scene;
            scene.add( model );

            model.traverse( function ( object ) {

                if ( object.isMesh ) object.castShadow = true;

            } );

            //

            skeleton = new THREE.SkeletonHelper( model );
            skeleton.visible = false;
            scene.add( skeleton );

            //

            createPanel();


            //

            var animations = gltf.animations;

            mixer = new THREE.AnimationMixer( model );

            idleAction = mixer.clipAction( animations[ 0 ] );
            walkAction = mixer.clipAction( animations[ 3 ] );
            runAction = mixer.clipAction( animations[ 1 ] );

            actions = [ idleAction, walkAction, runAction ];

            activateAllActions();

            animate();

        } );*/
        
        
        this.GenerationBoard(scene)
        this.GenerationLight(scene)

        function render() {
            requestAnimationFrame( render );
            renderer.render( scene, camera );
        }
        render();

        let game = scene;
        /*
        let loader = new THREE.FBXLoader();
        loader.load( 'models/fbxtest/source/model.fbx', function ( object ) {

            scene.add( object );
        
        } );
*/
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
        board.position.z -= 1
        game.add( board );
    }
    GenerationLight(game){
        let light = new THREE.AmbientLight( 0x555555 ); // soft white light
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

}