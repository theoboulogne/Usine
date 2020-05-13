let Affichage = (function(){
    return{
        updateMagasin:(boutique)=>{
            document.getElementById("lignes-nb").value=  boutique.boutique.lignes;
            document.getElementById("pannes-nb").value=  boutique.boutique.pannes;
            document.getElementById("robots-nb").value=  boutique.boutique.robots;
            document.getElementById("employes-nb").value=  boutique.boutique.employes;
        },
        set_addEvent:(boutique, infos)=>{
            document.getElementById("bouton_Magasin").addEventListener("click",function(){
                $.modal.close();
            })

            document.getElementById("lignes-moins").addEventListener("click", function(){
                boutique.boutonMoins("lignes");
                document.getElementById("lignes-nb").value=  boutique.boutique.lignes;
            })
            document.getElementById("lignes-plus").addEventListener("click", function(){
                boutique.boutonPlus("lignes");
                document.getElementById("lignes-nb").value=  boutique.boutique.lignes;
            })
            
            document.getElementById("pannes-moins").addEventListener("click", function(){
                boutique.boutonMoins("pannes");
                document.getElementById("pannes-nb").value=  boutique.boutique.pannes;
            })

            document.getElementById("robots-moins").addEventListener("click", function(){
                boutique.boutonMoins("robots");
                document.getElementById("robots-nb").value=  boutique.boutique.robots;
            })
            document.getElementById("robots-plus").addEventListener("click", function(){
                boutique.boutonPlus("robots");
                document.getElementById("robots-nb").value=  boutique.boutique.robots;
            })
            
            document.getElementById("employes-moins").addEventListener("click", function(){
                boutique.boutonMoins("employes");
                document.getElementById("employes-nb").value=  boutique.boutique.employes;
            })
            document.getElementById("employes-plus").addEventListener("click",  function(){
                boutique.boutonPlus("employes");
                document.getElementById("employes-nb").value =  boutique.boutique.employes;
            })
        },
        SetBarre:(id, pourcentage)=>{
            document.getElementById(id).setAttribute("style","width:"+String(pourcentage)+"%");
        },
        SetSolde:(valeur)=>{
            let solde = Math.trunc(valeur)
            let soldeString = ""
    
            if(solde >= 1000000){
                soldeString += String(Math.floor(solde/1000000))
                soldeString += " M "
                solde -= Math.floor(solde/1000000) * 1000000
            }
    
            if(solde >= 1000){
                soldeString += String(Math.floor(solde/1000))
                soldeString += " k "
                solde -= Math.floor(solde/1000) * 1000
            }
            
            soldeString += String(solde)
            soldeString += " € "
            document.getElementById("solde").innerHTML=soldeString
        },
        SetStock:(valeur)=>{
            document.getElementById("stock").innerHTML=valeur
        },
        SetConso:(valeur)=>{
            document.getElementById("consoNRJ").innerHTML=valeur + " MW"
        },
        SetSalaires:(valeur)=>{
            document.getElementById("salaires").innerHTML=valeur
        },
        SetPub:(valeur)=>{
            document.getElementById("pub").innerHTML=valeur
        },
        modal:(tab)=>{
            if(tab.length != 0){
                    let i=1
                    let text_element = document.getElementById("text-modal")
                    let text_dernier = document.getElementById("text-modal-dernier")
                    if(tab.length == 1){
                        text_dernier.innerHTML=tab[0]
                        $("#modal_jouer").modal({
                            escapeClose: false,
                            clickClose: false,
                            showClose: false,
                            toogle: true
                        });
                    }else{
                        text_element.innerHTML=tab[0]
                        $("#modal_next").modal({
                            escapeClose: false,
                            clickClose: false,
                            showClose: false,
                            toogle: true
                        });
                    }
                
                document.getElementById("bouton_next").addEventListener("click",function(){
                    
                    if(i < tab.length){
                        text_element.innerHTML=tab[i]
                        i++
                    }
                    
                    if( i == tab.length){
                        $("#modal_jouer").modal({
                            escapeClose: false,
                            clickClose: false,
                            showClose: false,
                            toogle: true
                        });
                        text_dernier.innerHTML=tab[i-1]
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
            if(categorie == "amelioration_energie" || categorie == "amelioration_social" || categorie == "amelioration_production" || categorie == "amelioration_publicite" || categorie == "amelioration_ecologie"){
                cout_.appendChild(document.createTextNode("nombre de tours : "+cout))
            }
            else{
                cout_.appendChild(document.createTextNode("coût : "+cout))
            }

            let row = document.createElement("div")
            row.setAttribute("class","row")
            let col5 = document.createElement("div")
            col5.setAttribute("class","col-5")
            let col21 = document.createElement("div")
            col21.setAttribute("class","col-2")
            let col22 = document.createElement("div")
            col22.setAttribute("class","col-2")

            let coche = document.createElement("input")
            coche.setAttribute("type","radio")
            coche.setAttribute("value",name)
            coche.setAttribute("name",categorie)
            coche.setAttribute("class","coche")
            coche.setAttribute("id",name)

            let videcoche = document.createElement("button")
            let videcoche_icone = document.createElement("span")
            videcoche.setAttribute("type","button")
            videcoche.setAttribute("class","btn btn-dark")
            videcoche.setAttribute("id", "videcoche")
            videcoche_icone.setAttribute("class","glyphicon glyphicon-remove")
            videcoche.appendChild(videcoche_icone)
            
            let passageligne = document.createElement("br")
            
            videcoche.addEventListener("click", function(){
                console.log('testttt')
                $('input[name="'+categorie+'"]').prop('checked', false);
            })

            row.appendChild(col5)
            col21.appendChild(coche)
            row.appendChild(col21)
            col22.appendChild(videcoche)
            row.appendChild(col22)

            NewSlick.appendChild(titre_)
            NewSlick.appendChild(description_)
            NewSlick.appendChild(cout_)
            NewSlick.appendChild(row)
            NewSlick.appendChild(passageligne)
            document.getElementById("cadre").appendChild(NewSlick)
        },
        isValider:(Categorie)=> $("input[name='"+Categorie+"']:checked").val()
    }
})();