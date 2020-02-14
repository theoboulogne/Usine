class Icone {
    constructor(img, positionx, positiony){
        this.image = scene.add.image(positionx,positiony, img);
        this.image.setScale(0.07)
        this.image.setScrollFactor(0);
        this.image.depth = 1000;
    }
    //constructor(img, cadre){
    //    cadre.nbIcones+=1
    //    this.image = scene.add.image(cadre.x + 40,cadre.y + (cadre.nbIcones*40), img);
    //    this.image.setScale(0.07) // taille variable a faire
    //    this.image.setScrollFactor(0);
    //    this.image.depth = 1000;
    
    barre_progression(pourcentage){
        if(this.progressBar == undefined || this.progressBox == undefined){
            this.progressBar = scene.add.graphics();
            this.progressBox = scene.add.graphics();
            this.progressBar.setScrollFactor(0);
            this.progressBox.setScrollFactor(0);
            this.progressBar.depth = 1000;
            this.progressBox.depth = 1000;
            
            this.progressBox.lineStyle(2, 0xFFFAFA, 1);
            this.progressBox.strokeRect(this.image.x+30, this.image.y - 10, 100, 20);
        }
        if(pourcentage!=undefined){
            this.progressBar.clear();
            this.progressBar.fillStyle(0xFFFF00, 1);
            this.progressBar.fillRect(this.image.x+35, this.image.y - 5, 90 * pourcentage, 10);
        }
    }
    barre_nombre(nb, unite){
        if(this.numberBox == undefined){
            this.numberBox = scene.add.graphics();
            this.numberBox.depth = 1000;
            this.numberBox.setScrollFactor(0);
            
            this.numberBox.lineStyle(2, 0xFFFAFA, 1);
            this.numberBox.strokeRect(this.image.x+30, this.image.y - 10, 100, 20);
        }
        if(unite==undefined){
            this.texte = scene.add.text(this.image.x+35, this.image.y - 10, nb.toString(), { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
        }
        else {
            this.texte = scene.add.text(this.image.x+35, this.image.y - 10, nb.toString()+" "+unite, { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 20 });
        }
        this.texte.depth = 1000;
        this.texte.setScrollFactor(0);
    }
    nombre(nb, unite){
        if(unite==undefined){
            this.texte = scene.add.text(this.image.x+35, this.image.y - 15, nb.toString(), { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 30 });
        }
        else {
            this.texte = scene.add.text(this.image.x+35, this.image.y - 15, nb.toString()+" "+unite, { fontFamily: '"Arial Rounded MT Bold"', color: '#FFFFFF', fontSize: 30 });
        }
        this.texte.setScrollFactor(0);
        this.texte.depth = 1000;
    }
}