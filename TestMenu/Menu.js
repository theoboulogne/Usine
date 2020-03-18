let BoutonPlay = document.getElementById("play");
BoutonPlay.addEventListener("click", event=> Menu.Play());

let BoutonParametre = document.getElementById("parametre");
BoutonParametre.addEventListener("click", event=> Menu.Parametre());

let Menu = (function(){
    return{
        Play : () => {  
            document.getElementById("menu").style.display = "none";
            document.getElementById("menu").style.visibility = 'hidden';
            document.location.href= './jeux.html'
        },
        Parametre : () => {  
            document.getElementById("menu").style.display = "none";
            document.getElementById("menu").style.visibility = 'hidden';
            console.log("test");
        },
    }
})();