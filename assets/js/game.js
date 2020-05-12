let Affichage = (function(){
    return{
        SetBarre:(id, pourcentage)=>{
            document.getElementById(id).setAttribute("style","width:"+String(pourcentage)+"%");
        },
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
        finance:(tab)=>{
            document.getElementById("solde").innerHTML=tab[0]
            document.getElementById("salaires").innerHTML=tab[1]
            document.getElementById("pub").innerHTML=tab[2]
        },
        modal:(tab)=>{
            if(tab != [] && tab != undefined){
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
            }
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
        removeSlick:()=>{
            while (document.getElementById('cadre').firstChild) {
                document.getElementById('cadre').removeChild(document.getElementById('cadre').lastChild);
            }
            $('cadre').slick('unslick');
            document.getElementById('cadre').className = "cadre"
        },
        addNewSlick:(name, description, cout, categorie)=>{
            let NewSlick = document.createElement("div")
            NewSlick.setAttribute("class", categorie+" "+"my-custom-scrollbar my-custom-scrollbar-primary"+" "+"back_slick googlescrollbare")
            let titre_ = document.createElement("h2")
            titre_.setAttribute("class","ecriture1")
            titre_.appendChild(document.createTextNode(name))
            let description_= document.createElement("h4")
            description_.setAttribute("class","ecriture2")
            description_.appendChild(document.createTextNode(description))
            let cout_= document.createElement("h4")
            cout_.setAttribute("class","ecriture2 ")
            cout_.appendChild(document.createTextNode("coût : "+cout))
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
