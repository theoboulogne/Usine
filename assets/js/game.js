
let Affichage = (function(){
    return{
        addSlick:()=>{
            $(document).ready(function(){
                console.log('tastqe')
                $('.cadre').slick({
                    infinite: true,
                    speed: 300,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                });
            });
        },
        addNewSlick:(name, titre, description, cout)=>{
            let NewSlick = document.createElement("div")
            let titre_ = document.createElement("h2")
            titre_.appendChild(document.createTextNode(titre))
            let description_= document.createElement("h3")
            description_.appendChild(document.createTextNode(description))
            let cout_= document.createElement("h3")
            cout_.appendChild(document.createTextNode("cout :"+cout))
            let coche = document.createElement("input")
            coche.setAttribute("type","checkbox")
            coche.setAttribute("value","1")
            coche.setAttribute("id",name+"valider")
            NewSlick.setAttribute("id",name)
            NewSlick.appendChild(titre_)
            NewSlick.appendChild(description_)
            NewSlick.appendChild(cout_)
            NewSlick.appendChild(coche)
            document.getElementById("cadre").appendChild(NewSlick)
        },
        isValider:(name)=>{
            if(document.getElementById(name+"valider").value==1){

            }
        }
    }
})();


Affichage.addSlick();
Affichage.addNewSlick("dossier1","dossier1","dossier1",100)
Affichage.addNewSlick("dossier2","dossier2","dossier2",1000)
Affichage.addNewSlick("dossier3","dossier3","dossier3",10000)
Affichage.addNewSlick("dossier4","dossier4","dossier4",95148)
Affichage.addNewSlick("dossier5","dossier5","dossier5",81448)
Affichage.addNewSlick("dossier6","dossier6","dossier6",85845)