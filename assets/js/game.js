
let Affichage = (function(){
    return{
        addSlick:()=>{
            $('.cadre').slick({
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
            });
        },
        removeSlick:()=>{
            while (document.getElementById('cadre').firstChild) {
                document.getElementById('cadre').removeChild(document.getElementById('cadre').lastChild);
            }
            $('cadre').slick('unslick');
            document.getElementById('cadre').className = "cadre"
        },
        addNewSlick:(name, titre, description, cout, categorie)=>{
            let NewSlick = document.createElement("div")
            NewSlick.setAttribute("class", categorie)
            let titre_ = document.createElement("h2")
            titre_.setAttribute("class","ecriture1")
            titre_.appendChild(document.createTextNode(titre))
            let description_= document.createElement("h4")
            description_.setAttribute("class","ecriture2")
            description_.appendChild(document.createTextNode(description))
            let cout_= document.createElement("h4")
            cout_.setAttribute("class","ecriture2 ")
            cout_.appendChild(document.createTextNode("cout :"+cout))
            let coche = document.createElement("input")
            coche.setAttribute("type","radio")
            coche.setAttribute("value",name)
            coche.setAttribute("name",categorie)
            coche.setAttribute("id",name)
            NewSlick.appendChild(titre_)
            NewSlick.appendChild(description_)
            NewSlick.appendChild(cout_)
            NewSlick.appendChild(coche)
            document.getElementById("cadre").appendChild(NewSlick)
        },
        isValider:(Categorie)=> $("input[name='"+Categorie+"']:checked").val()
    }
})();

//Affichage.addNewSlick("CE","CE","Grace aux CE vos employes pourront beneficier d'avantages interressant pour le mental.","2 tours","Social")
/*
Affichage.addNewSlick("dossier2","dossier2","dossier2","1000","amelioration_social")
Affichage.addNewSlick("dossier3","dossier3","dossier3","10000","ponctuel_production")
Affichage.addNewSlick("dossier4","dossier4","dossier4",95148,"ponctuel_publicite")
Affichage.addNewSlick("dossier5","dossier5","dossier5",81448,"ponctuel_publicite")
Affichage.addNewSlick("dossier6","dossier6","dossier6",85845,"ponctuel_publicite")
Affichage.addNewSlick("dossier7","dossier7","dossier7","10000","ponctuel_ecologie")
Affichage.addNewSlick("dossier8","dossier8","dossier8","100","ponctuel_ecologie")
Affichage.addNewSlick("dossier8","dossier8","dossier8","1000","ponctuel_ecologie")
*/