(function () {
    let Game = this;
    //connection server
    const socket = io.connect('http://localhost:800');
    
    socket.on('repconnection', (Jeu) => {
        console.log('Event - repconnection')
        this.game = Jeu;
        //verif des infos a faire puis on reset si on a pas reçu les bonnes infos
        this.Graphique = new Rendu(this.game.Lignes)
    });
    socket.on('disconnect', () => {
        console.log('Event - disconnect')
        document.location.href = "./"
        // afficher une alerte puis retourner vers le menu
    });
    
    socket.on('start', () => {
        console.log('Event - start')

        this.Graphique.DropDown("boutique", "dropdown_boutique");
        
        //Ajouter un event on click sur les boutons dans chaque ligne du dropdown

        document.getElementById("newTour").addEventListener("click", function(){
            console.log('Click - endTurn')

            //Compilation des Choix effectués et des modifications effectuées par l'interface(boutique,employes,voir+) a faire 
            //et mettre en arguement

            //Vérification et application des changements coté serveur a faire (faire une copie de Jeu pour comparaison ?)

            socket.emit('endTurn');
        });
    });

    socket.on('newTurn', (Jeu) => {
        console.log('Event - newTurn')
        this.game = Jeu;

    });

    socket.on('menu', ()=>{
        window.href = './'
    })

})();