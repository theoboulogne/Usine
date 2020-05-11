let Affichage = (function(){
    return{
        robots:()=>{
            $("#modal_Robots").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false,
                toogle: true
            });
            document.getElementById("bouton_Robots").addEventListener("click",function(){
                $.modal.close();
            })
        },
        employes:()=>{
            $("#modal_Employes").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false,
                toogle: true
            });
            document.getElementById("bouton_Employes").addEventListener("click",function(){
                $.modal.close();
            })
        },
        lignes:()=>{
            $("#modal_Lignes").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false,
                toogle: true
            });
            document.getElementById("bouton_Lignes").addEventListener("click",function(){
                $.modal.close();
            })
        },
        finance:(solde, salaires, budgetPub)=>{
            document.getElementById("solde").innerHTML=solde
            document.getElementById("salaires").innerHTML=salaires
            document.getElementById("pub").innerHTML=budgetPub
        },
        modal:(tab)=>{
            let modalNext = document.getElementById("modal_next")
            let modalJouer = document.getElementById("modal_jouer")
            let i=1
            let text = document.createElement("h1")
            text.setAttribute("class","ecriture2")
            text.setAttribute("id","text")
            text.appendChild(document.createTextNode(tab[0]))
            modalNext.insertBefore(text, document.getElementById("end_next"))
            $("#modal_next").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false,
                toogle: true,

            });
            //$('#modal_next').modal('toggle')
            document.getElementById("bouton_next").addEventListener("click",function(){
                text.innerHTML=""
                text.appendChild(document.createTextNode(tab[i]))
                
                if(i < tab.length){
                    modalNext.removeChild(document.getElementById("text"))
                    modalNext.insertBefore(text, document.getElementById("end_next"))
                    i++
                }
                
                if( i == tab.length){
                    $("#modal_jouer").modal({
                        escapeClose: false,
                        clickClose: false,
                        showClose: false,
                        toogle: true
                    });
                    modalJouer.insertBefore(text, document.getElementById("end_jouer"))
                }
            })
            document.getElementById("bouton_jouer").addEventListener("click",function(){
                $.modal.close();
            })
        },    
        addSlick:()=>{
            $(document).ready(function(){
                $('.cadre').slick({
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                });
            });
        },
        addNewSlick:(name, titre, description, cout,categorie)=>{
            let NewSlick = document.createElement("div")
            NewSlick.setAttribute("class", categorie+" "+"my-custom-scrollbar my-custom-scrollbar-primary"+" "+"back_slick googlescrollbare")
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
            coche.setAttribute("class","coche")
            coche.setAttribute("id",name)
            NewSlick.appendChild(titre_)
            NewSlick.appendChild(description_)
            NewSlick.appendChild(cout_)
            NewSlick.appendChild(coche)
            document.getElementById("cadre").appendChild(NewSlick)
        },
        isValider:(Categorie)=>{
            let elementChoisit = document.getElementsByName(Categorie).value
        }
    }
})();

Affichage.finance("1 000 000", "1 500", "6 000")

Affichage.addSlick();
Affichage.addNewSlick("dossier1","dossier1","Bienvenu dans modern factory ! Tu sera le partron de cette entreprise, ton objectif sera de faire les choix qui pemetront de la faire vivre. Chaque tour représente 1 mois, et chaque mois tu sera amené à faire des choix. Tu aura plusieurs dossiers par des couleur avec un ou plusieur choix. Tu ne pourra chosir qu'un seul choix par dossier ou ne pas en choisir. Attention ! Chaque choix a un cout et des repercutions sur les indices de croissance, du social, de l'écologie et de la production affichés sur les barres d'indices","100","amelioration_social")
Affichage.addNewSlick("dossier2","dossier2","dossier2","1000","amelioration_social")
Affichage.addNewSlick("dossier3","dossier3","dossier3","10000","ponctuel_production")
Affichage.addNewSlick("dossier4","dossier4","dossier4",95148,"ponctuel_publicite")
Affichage.addNewSlick("dossier5","dossier5","dossier5",81448,"ponctuel_publicite")
Affichage.addNewSlick("dossier6","dossier6","dossier6",85845,"ponctuel_publicite")
Affichage.addNewSlick("dossier7","dossier7","dossier7","10000","ponctuel_ecologie")
Affichage.addNewSlick("dossier8","dossier8","dossier8","100","ponctuel_ecologie")
Affichage.addNewSlick("dossier8","dossier8","dossier8","1000","ponctuel_ecologie")

let tab = new Array()
tab = ["Bienvenu dans modern factory ! Tu sera le partron de cette entreprise, ton objectif sera de faire les choix qui pemetront de la faire vivre. Chaque tour représente 1 mois, et chaque mois tu sera amené à faire des choix. Tu aura plusieurs dossiers par des couleur avec un ou plusieur choix. Tu ne pourra chosir qu'un seul choix par dossier ou ne pas en choisir. Attention ! Chaque choix a un cout et des repercutions sur les indices de croissance, du social, de l'écologie et de la production affichés sur les barres d'indices.",
 "Tu peux aussi cliquer sur les lignes de prodution, cela te permettra d'afficher le menu pour modifier l'element sur le quel tu a cliqué."]

$( document ).ready(function() {
   Affichage.modal(tab)
});