let Menu = (function(){
    return{
        //fonction liée au bouton play
        Play : () => {
            event.preventDefault();
            let nb = document.getElementById("nb").value;
            let duree = document.getElementById("duree").value;

            window.location.href = "game?nb=" + nb + "&duree=" + duree;
        }
    }
})();
(function () {
    let BoutonPlay = document.getElementById("play"); // on rajoute l'event listener
    BoutonPlay.addEventListener("click", event=> Menu.Play());
})();