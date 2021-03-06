let DivavecBarres = (Barres, indiceJoueur)=>{ //Génération des barres du tableau des scores

    let DivBarres = document.createElement("div")

    let BarreCroissance = document.createElement("div")
    let CroissanceTitre = document.createElement("h5")
    CroissanceTitre.setAttribute('class', 'text-left ecriture2')
    CroissanceTitre.innerHTML = "Croissance"
    let CroissanceBarre = document.createElement("div")
    CroissanceBarre.setAttribute('class', 'progress beautiful')
    CroissanceBarre.setAttribute('style', 'width: 80%')
    let CroissanceBarre2 = document.createElement("div")
    CroissanceBarre2.setAttribute('class', 'progress-bar bg-warning progress-bar-striped progress-bar-animated')
    CroissanceBarre2.setAttribute('style', 'width: '+Barres[indiceJoueur][0]+'%')
    let CroissanceBarre3 = document.createElement("span")
    CroissanceBarre3.setAttribute('class', 'sr-only')
    CroissanceBarre2.appendChild(CroissanceBarre3)        
    CroissanceBarre.appendChild(CroissanceBarre2)    
    BarreCroissance.appendChild(CroissanceTitre)
    BarreCroissance.appendChild(CroissanceBarre)
    DivBarres.appendChild(BarreCroissance)
    
    let BarreSocial = document.createElement("div")
    let SocialTitre = document.createElement("h5")
    SocialTitre.setAttribute('class', 'text-left ecriture2')
    SocialTitre.innerHTML = "Social"
    let SocialBarre = document.createElement("div")
    SocialBarre.setAttribute('class', 'progress beautiful')
    SocialBarre.setAttribute('style', 'width: 80%')
    let SocialBarre2 = document.createElement("div")
    SocialBarre2.setAttribute('class', 'progress-bar bg-danger progress-bar-striped progress-bar-animated')
    SocialBarre2.setAttribute('style', 'width: '+Barres[indiceJoueur][1]+'%')
    let SocialBarre3 = document.createElement("span")
    SocialBarre3.setAttribute('class', 'sr-only')
    SocialBarre2.appendChild(SocialBarre3)        
    SocialBarre.appendChild(SocialBarre2)    
    BarreSocial.appendChild(SocialTitre)
    BarreSocial.appendChild(SocialBarre)
    DivBarres.appendChild(BarreSocial)
    
    let BarreEcologie = document.createElement("div")
    let EcologieTitre = document.createElement("h5")
    EcologieTitre.setAttribute('class', 'text-left ecriture2')
    EcologieTitre.innerHTML = "Ecologie"
    let EcologieBarre = document.createElement("div")
    EcologieBarre.setAttribute('class', 'progress beautiful')
    EcologieBarre.setAttribute('style', 'width: 80%')
    let EcologieBarre2 = document.createElement("div")
    EcologieBarre2.setAttribute('class', 'progress-bar bg-success progress-bar-striped progress-bar-animated')
    EcologieBarre2.setAttribute('style', 'width: '+Barres[indiceJoueur][2]+'%')
    let EcologieBarre3 = document.createElement("span")
    EcologieBarre3.setAttribute('class', 'sr-only')
    EcologieBarre2.appendChild(EcologieBarre3)        
    EcologieBarre.appendChild(EcologieBarre2)    
    BarreEcologie.appendChild(EcologieTitre)
    BarreEcologie.appendChild(EcologieBarre)
    DivBarres.appendChild(BarreEcologie)
    
    let BarreProduction = document.createElement("div")
    let ProductionTitre = document.createElement("h5")
    ProductionTitre.setAttribute('class', 'text-left ecriture2')
    ProductionTitre.innerHTML = "Production"
    let ProductionBarre = document.createElement("div")
    ProductionBarre.setAttribute('class', 'progress beautiful')
    ProductionBarre.setAttribute('style', 'width: 80%')
    let ProductionBarre2 = document.createElement("div")
    ProductionBarre2.setAttribute('class', 'progress-bar progress-bar-striped progress-bar-animated')
    ProductionBarre2.setAttribute('style', 'width: '+Barres[indiceJoueur][3]+'%')
    let ProductionBarre3 = document.createElement("span")
    ProductionBarre3.setAttribute('class', 'sr-only')
    ProductionBarre2.appendChild(ProductionBarre3)        
    ProductionBarre.appendChild(ProductionBarre2)    
    BarreProduction.appendChild(ProductionTitre)
    BarreProduction.appendChild(ProductionBarre)
    DivBarres.appendChild(BarreProduction)

    return DivBarres
}

let CadreScore = (Scores, Barres, indiceJoueur) =>{ //Génération du cadre d'un joueur dans le tableau des scores

    let ScoreJoueur = document.createElement("div")
    let centre = document.createElement('center')
    let TitreScore = document.createElement("h2")
    TitreScore.setAttribute("class","ecriture1")
    TitreScore.appendChild(document.createTextNode("Score : "+String(Scores[indiceJoueur][0])))
    centre.appendChild(TitreScore)
    ScoreJoueur.appendChild(centre)
    let passageligne = document.createElement("br")
    ScoreJoueur.appendChild(passageligne)
    let divBarresJoueur = DivavecBarres(Barres, indiceJoueur);
    ScoreJoueur.appendChild(divBarresJoueur)

    return ScoreJoueur
}




let Affichage = (function(){
    return{
        createFin:(Scores, Barres, indice)=>{ // Créatioon et affichage du menu de fin du tableau des scores
            let status = ""
            let max = 0;
            for(let j in Scores){
                if(Scores[j][0] > max) max = Scores[j][0];
            }
            if(max == Scores[indice][0]) status = "gagné";
            else status = "perdu"; // on récupère le status gagné ou perdu

            document.getElementById("modal-gagnant").innerHTML = status
            
            document.getElementById("modal_fin-joueur").appendChild(CadreScore(Scores, Barres, indice)) // On ajoute le cadre de ce joueur

            let nb = 0
            let Rows = [] // On affiche le cadre des autres joueurs
            for(let i=0; i<Scores.length; i++){
                if(i!=indice){
                    if(nb%2 == 0){
                        let row = document.createElement('div')
                        row.setAttribute('class', 'row')
                        Rows.push(row)
                    }
                    let col = document.createElement("div")
                    col.setAttribute("class","col")
                    col.appendChild(CadreScore(Scores, Barres, i))
                    Rows[Rows.length-1].appendChild(col);
                    nb++
                }
            }

            for(let i=0; i<Rows.length; i++){
                document.getElementById("modal_fin-tab").appendChild(Rows[i])
            }

            document.getElementById('bouton_fin').addEventListener('click', function(){ // on ajoute l'event listener sur le bouton 'retourner au menu'
                window.location.href = './'
            })

            document.getElementById('modal_fin').setAttribute('style', '') 
            $("#modal_fin").modal({// on affiche le menu des scores
                escapeClose: false,
                clickClose: false,
                showClose: false,
                toogle: true
            });
            
        },
        updateMagasin:(boutique)=>{ // on change les valeurs du magasin
            document.getElementById("lignes-nb").value=  boutique.boutique.lignes;
            document.getElementById("pannes-nb").value=  boutique.boutique.pannes;
            document.getElementById("robots-nb").value=  boutique.boutique.robots;
            document.getElementById("employes-nb").value=  boutique.boutique.employes;
        },
        set_addEvent:(boutique)=>{ // on ajoute les evenements du magasin
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
        SetBarre:(id, pourcentage)=>{ // on change le niveau d'une barre
            document.getElementById(id).setAttribute("style","width:"+String(pourcentage)+"%");
        },
        SetSolde:(valeur)=>{ // on formalise et affiche le solde
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
        modal:(tab)=>{ // On affiche un menu avec un texte fournit en entrée, séparé sur plusieurs menu si demandé
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
        addSlick:()=>{ // on ajoute le slider
            $(document).ready(function(){
                $('.cadre').slick({
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                });
            });
        },
        removeSlick:()=>{ // on vide le slider
            while (document.getElementById('cadre').firstChild) {
                document.getElementById('cadre').removeChild(document.getElementById('cadre').lastChild);
            }
            $('cadre').slick('unslick');
            document.getElementById('cadre').className = "cadre"
        },
        addNewSlick:(name, description, cout, categorie)=>{ // on ajoute un choix dans le slider
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
            videcoche.setAttribute("class","btn btn-dark btn-sm")
            videcoche.setAttribute("id", "videcoche")
            videcoche_icone.setAttribute("class","glyphicon glyphicon-remove")
            videcoche.appendChild(videcoche_icone)
            let passageligne = document.createElement("br")
            
            //On rajoute la possibilité de decocher la radio
            videcoche.addEventListener("click", function(){
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
        isValider:(Categorie)=> $("input[name='"+Categorie+"']:checked").val() // on regarde si un choix est validé
    }
})();