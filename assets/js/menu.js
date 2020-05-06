let Menu = (function(){
    return{
        //fonction lier au bouton play
        Play : () => {
            event.preventDefault();
            window.location.href = "game";
        }
    }
})();
(function () {
    console.log('test')
    let BoutonPlay = document.getElementById("play");
    BoutonPlay.addEventListener("click", event=> Menu.Play());
})();