/* greedy.js */

import imageSrc from './assets/images/greedy.png';

export default class Greedy {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      this.width = 48;
      this.height = 48;
      this.image = this.#createImage(imageSrc);
      this.lives = 3;
      this.score = 0;
    }
  
    #createImage(imageSource) {
      const newImg = new Image();
      newImg.src = imageSource;
      return newImg;
    }
  
    draw(context) {
      context.drawImage(this.image, this.x, this.y);
    }
  
    moveLeft() {              
        this.deltaX = this.deltaX - 5;   // le déplacement se fera vers la gauche, par pas de 10px
     }
     moveRight() {
        this.deltaX = this.deltaX + 5;   // le déplacement se fera vers la droite, par pas de 10px
     }
  
     moveUp() {
      this.deltaY = this.deltaY - 5;   
   }
  
   moveDown() {
    this.deltaY = this.deltaY + 5;   
  }
     stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
     }
     move(box) {              // déplace sans sortir des limites de *box*
        this.x = Math.max(0, Math.min(box.width - this.width, this.x + this.deltaX));
        this.y = Math.max(0, Math.min(box.height - this.height, this.y + this.deltaY));
     }
     handleMoveKeys(keyManager) {
        this.stopMoving();    // on réinitialise les déplacements
        if (keyManager.left)  // touche flèche gauche pressée ?
           this.moveLeft();
        if (keyManager.right) // touche flèche droite pressée ?
           this.moveRight();
        if(keyManager.up)
            this.moveUp();
        if(keyManager.down)
          this.moveDown();
     }
  
    loseLife() {
      this.lives--;
    }
  
    addPoints(points) {
      this.score += points;
    }
  
    moveUp() {
      this.y -= 5;
    }
  
    moveDown() {
      this.y += 5;
    }
  
    moveLeft() {
      this.x -= 5;
    }
  
    moveRight() {
      this.x += 5;
    }
  }
  