//Test pour l'interface :
class Cadre {
    constructor(x, y, width, height, topleft=0, topright=0, botleft=0, botright=0, alpha=0.8, depth=0){
        this.graphics = scene.add.graphics();
        this.graphics.setScrollFactor(0);
        this.graphics.depth = 990 + depth;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.nbIcones = 0
     
        this.graphics.lineStyle(2, 0xffff00, 1);
        this.graphics.fillStyle(0xC4C4C4, alpha)
     
        this.graphics.fillRoundedRect(x+5, y+5, width-10, height-10, { tl: topleft, tr: topright, bl: botleft, br: botright });
        this.graphics.strokeRoundedRect(x+5, y+5, width-10, height-10, { tl: topleft, tr: topright, bl: botleft, br: botright });
        

        //  Using an object to define a different radius per corner
    }
}