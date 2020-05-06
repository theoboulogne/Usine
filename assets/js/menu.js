let Menu = (function(){
    return{
        //fonction lier au bouton play
        Play : () => {  
            event.preventDefault();
            let pseudo = document.getElementById("pseudo").value;
            window.location.href = "game";
        }
    }
})();