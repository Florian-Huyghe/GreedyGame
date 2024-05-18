/* hungry.js */

import imageSrc from './assets/images/hungry.png';

export default class Hungry {
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

    moveToNearestTarget(fruits, greedy) {
        let target = null;
        if (fruits.length > 0) {
            
            let nearestFruit = null;
            let minDistanceToFruit = Infinity;

            fruits.forEach(fruit => {
                const distanceToFruit = Math.sqrt((this.x - fruit.x) ** 2 + (this.y - fruit.y) ** 2);
                if (distanceToFruit < minDistanceToFruit) {
                    minDistanceToFruit = distanceToFruit;
                    nearestFruit = fruit;
                }

            })

            target = nearestFruit;

        } else {
           
            target = greedy;
        }

        if (target) {
            const dx = target.x - this.x;

            const dy = target.y - this.y;

            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            if (distance > 0) {
                this.x += (dx / distance) ;
                
                this.y += (dy / distance) ;
            }
        }
    }
  
}