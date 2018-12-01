function Trooper(ctx, x){
  this.ctx = ctx;

  this.x = x;
  this.y = 200;

  this.vy = GRAV;
  this.vx = 1;

  this.w = 44;
  this.h = 61;
  

  this.img = new Image();
  this.img.src = "img/Paratrooper.png";

  this.img.frames = 4;
  this.img.frameIndex = 0;


  this.drawCount = 0;

  this.isDead = false;
}

Trooper.prototype.animate = function(){
  this.y += this.vy;
}


Trooper.prototype.move = function(){
  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
}

Trooper.prototype.draw = function(){
  this.animate();
  
  this.move();
  
  if (this.drawCount++ % 10 === 0){
    if (++this.img.frameIndex === 4){
      this.img.frameIndex = 0;
      this.drawCount = 0;
    }
  } 
}

Trooper.prototype.collisionFloor = function(){
  
  if ((this.y >= 530) && (this.x + this.w < 555)){
    this.img.src = "img/soldierR.png";
    this.w = 25;
    this.h = 40;
    
    this.vy = 0;
    this.x += this.vx;
  }

  if (this.y >= 530 && this.x > 750){
    //ha caido a la derecha del cañon
    this.img.src = "img/soldierL.png";
    this.w = 25;
    this.h = 40;
    
    this.vy = 0;
    this.x -= this.vx;
   
  }
}

Trooper.prototype.isCollision = function(){

  if ((this.x + this.w)=== 550){
    this.img.src = "img/soldierR.png";
    this.img.frameIndex = 0;
    return true;
    
  }
  if(this.x === 750){
    this.img.src = "img/soldierL.png";
    this.img.frameIndex = 0;
    return true;
  }
  return false;
} 

