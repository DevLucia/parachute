function Cannon(ctx){
  this.ctx = ctx;
  
  this.x = 550;
  this.y = 475;

  this.w = 200;
  this.h = 150;
  
  this.img = new Image();
  this.img.src = "./img/Spaceship-Transparent-PNG.png";

  this.originX = 650;
  this.originY = 700;


  this.health = 100;
}


Cannon.prototype.draw = function(){
  this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}

Cannon.prototype.isDead = function(){
  return this.health <= 0;
}

Cannon.prototype.updateHealth = function(){
  this.health -= 10;
  document.getElementById('health').innerText = this.health;
}



