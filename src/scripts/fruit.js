import PommeSrc from './assets/images/pomme.png';
import AnanasSrc from './assets/images/ananas.png';
import CitronSrc from './assets/images/citron.png';

export default class Fruit {
  
  static FRUIT_WIDTH = 48;

  constructor(x, y, deltaX = 3, deltaY = -2) {
    this.x = x;
    this.y = y;
    this.deltaX = deltaX;
    this.deltaY = deltaY;

    this.width = Fruit.FRUIT_WIDTH;
    this.height = Fruit.FRUIT_WIDTH;
    this.visible = true;

    this.initImage();

  }

  initImage(){
    const n = this.alea(3);
    if(n==0){
      this.image = this.#createImage(PommeSrc);
    }else if(n==1){
      this.image = this.#createImage(CitronSrc);
    }else{
      this.image = this.#createImage(AnanasSrc);
    }
    
  }

  alea(n) {
    return Math.floor(Math.random() * n);
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

  isVisible(){
    return this.visible;
  }
  hide() {
    this.visible = false;
  }

  #createImage(imageSource) {
    const newImg = new Image();
    newImg.src = imageSource;
    return newImg;
  }

  collisionWith(obstacle) {
    
    const x1 = this.x;
    const y1 = this.y;
    
    const x2 = this.x + this.width;
    const y2 = this.y + this.height;

    const x3 = obstacle.x;
    const y3 = obstacle.y;
    
    const x4 = obstacle.x + obstacle.width;
    const y4 = obstacle.y + obstacle.height;

    
    const p1x = Math.max(x1, x3);
    const p1y = Math.max(y1, y3);
    
    const p2x = Math.min(x2, x4);
    const p2y = Math.min(y2, y4);

    return p1x < p2x && p1y < p2y;
  }
}
