(function () {
    //connection server
    this.play = false;
    

    const socket = io.connect('http://localhost:800');
    socket.on('repconnection', (Jeu) => {
        console.log('Event - repconnection')
        this.game = Jeu;
    });
    socket.on('disconnect', () => {
        console.log('Event - disconnect')
        document.location.href = "./"
        // afficher une alerte puis retourner vers le menu
    });
    
    socket.on('start', () => {
        console.log('Event - start')
        //if(this.game.constructor.name != 'Joueur') socket.emit('disconnect'); // on reset si on a pas reçu les bonnes infos
        this.play = true; // sinon on lance le jeu
        this.Graphique = new Rendu(this.game.Lignes)
        console.log(this.game)
    });

    socket.on('newTurn', (Jeu) => {
        console.log('Event - newTurn')
        this.game = Jeu;
        
    });

})();