import Greedy from './greedy.js';
import KeyManager from './keyManager';
import Fruit from './fruit.js'
import Hungry from './hungry.js';

const button = document.getElementById("stopAndStartGame");
const score = document.getElementById('score');
const life1 = document.getElementById('life-1');
const life2 = document.getElementById('life-2');
const life3 = document.getElementById('life-3');
const gameOver = document.getElementById('game-over');
const moveLeftBtn = document.getElementById('left');
const moveRightBtn = document.getElementById('right');
const moveUpBtn = document.getElementById('up');
const moveDownBtn = document.getElementById('down');

export default class Game {

   #canvas
   #fruits;
   #hungries = [];
   #score = 0;
   #cpt = 0;

   constructor(canvas) {
        this.#canvas = canvas;
        this.context = canvas.getContext('2d');
        this.animationRequest = null;
        this.greedy = new Greedy(canvas.width/2, canvas.height/2);
        this.keyManager = new KeyManager();
        this.#fruits = [];
        this.#cpt;

        this.createHungry();



        // Ajoutez des gestionnaires d'événements pour les clics sur les boutons
        moveLeftBtn.addEventListener('mousedown', () => this.keyManager.leftPressed());
        moveLeftBtn.addEventListener('mouseup', () => this.keyManager.leftReleased());
        moveRightBtn.addEventListener('mousedown', () => this.keyManager.rightPressed());
        moveRightBtn.addEventListener('mouseup', () => this.keyManager.rightReleased());
        moveUpBtn.addEventListener('mousedown', () => this.keyManager.upPressed());
        moveUpBtn.addEventListener('mouseup', () => this.keyManager.upReleased());
        moveDownBtn.addEventListener('mousedown', () => this.keyManager.downPressed());
        moveDownBtn.addEventListener('mouseup', () => this.keyManager.downReleased());

        window.addEventListener('keydown', this.keyDownActionHandler.bind(this));
        window.addEventListener('keyup', this.keyUpActionHandler.bind(this));
        button.addEventListener("click", () => this.startAndStop()  );
      
    }


   animate() {
      const animateFrame = () => {
        this.context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
         
        this.greedy.handleMoveKeys(this.keyManager);
        this.greedy.move(this.#canvas);
        this.greedy.draw(this.context);

        

        this.#fruits = this.#fruits.filter(fruit => {
            if (fruit.collisionWith(this.greedy)) {
              this.#score += 100;
              score.textContent = this.#score;
              return false;
            }
            return true;
          });
  
        this.drawFruits(); 
        
        this.drawHungries();

        for(let i = 0; i < this.#fruits.length; i++){
            const fruit = this.#fruits[i];
            for(let j = 0; j < this.#hungries.length; j++){
                const hungry = this.#hungries[j];
                if(hungry.collisionWith(fruit)){
                    fruit.hide();
                    this.#cpt++;
                }
                if(this.#cpt == 7 && this.#cpt != 0){
                    this.createHungry();
                    this.#cpt = 0;
                }
            }
        }

        this.moveHungries();
        

        this.animationRequest = requestAnimationFrame(animateFrame);
        
    
        this.updateGreedyLife();

      };
        
      animateFrame();
    } 

      // Méthode pour démarrer ou arrêter l'animation
    startAndStop() {    
        if (this.animationRequest) {
            
            cancelAnimationFrame(this.animationRequest);
            this.animationRequest = null;
            button.textContent = 'Start';
            clearInterval(this.fruitsInterval);
            clearInterval(this.updateFruitsInterval);

            
        } else {
            
            this.animate();
            button.textContent = 'Stop';
            
            this.fruitsInterval = setInterval(() => this.createFruit(), 1000);
            this.updateFruitsInterval = setInterval(() => this.updateFruits(), 1000 / 60);
            
        }

    }

    keyDownActionHandler(event) {
      switch (event.key) {
          case "ArrowLeft":
          case "Left":
              this.keyManager.leftPressed();
              break;
          case "ArrowRight":
          case "Right":
              this.keyManager.rightPressed();
              break;
          case "ArrowUp":
          case "Up":
              this.keyManager.upPressed();
              break;
          case "ArrowDown":
          case "Down":
              this.keyManager.downPressed();
              break;
          default: return;
      }
      event.preventDefault();
   }
  
   keyUpActionHandler(event) {
    switch (event.key) {
        case "ArrowLeft":
        case "Left":
            this.keyManager.leftReleased();
            break;
        case "ArrowRight":
        case "Right":
            this.keyManager.rightReleased();
            break;
        case "ArrowUp":
        case "Up":
            this.keyManager.upReleased();
            break;
        case "ArrowDown":
        case "Down":
            this.keyManager.downReleased();
            break;
        default: return;
    }
    event.preventDefault();
  }
  alea(n) {
    return Math.floor(Math.random() * n);
  }

  createFruit() {
   const fruit = new Fruit(this.alea(this.#canvas.width-100),this.alea(this.#canvas.height-100)); 
   this.#fruits.push(fruit);
   setInterval(() => fruit.hide(), 8000);
}

drawFruits() {
    this.#fruits.forEach(fruit => fruit.draw(this.context));
}

updateFruits() {
   this.#fruits = this.#fruits.filter(fruit => fruit.isVisible());
}

createHungry(){
    const hungry = new Hungry(this.alea(this.#canvas.width-100),this.alea(this.#canvas.height-100))
    this.#hungries.push(hungry);
}
 
drawHungries() {
    this.#hungries.forEach(hungry => hungry.draw(this.context));
}
updateHungries(){
    this.#hungries = this.#hungries.forEach(hungry => !hungry.collisionWith(this.greedy));
}


moveHungries() {
    this.#hungries.forEach(hungry => {
        hungry.moveToNearestTarget(this.#fruits, this.greedy);
    });
}

updateGreedyLife() {
    this.#hungries.forEach(hungry => {
        if(hungry.collisionWith(this.greedy)){
            if(this.greedy.lives == 3){
                life3.remove();
                const pos = this.#hungries.indexOf(hungry);
                this.#hungries.splice(pos,1);
                this.greedy.loseLife();
            }else if(this.greedy.lives == 2){
                life2.remove();
                
                const pos = this.#hungries.indexOf(hungry);
                this.#hungries.splice(pos,1);
                
                this.greedy.loseLife();
            }else{
                life1.remove();
                button.remove();
                this.greedy.loseLife();
                
                const pos = this.#hungries.indexOf(hungry);
                this.#hungries.splice(pos,1);
                
                cancelAnimationFrame(this.animationRequest);
                

            }
            if(this.greedy.lives == 0){
                gameOver.style.display = "flex";
                
            }
            this.createHungry();

        }
    })
 }

}
