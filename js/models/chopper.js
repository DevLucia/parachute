function Chopper(ctx, x, y){
  this.ctx = ctx;

  this.x = x;
  this.y = y;
  this.w = 250;
  this.h = 100;

  this.img = new Image();
  this.img.src = "img/helicoptero-sprite.png";

  this.vx = CHOPPER_V;

  this.img.frames = 3;
  this.img.frameIndex = 0;

  this.isDead = false;
  
}

Chopper.prototype.animate = function(){
  this.x += this.vx;
}

Chopper.prototype.move = function(){
  this.ctx.drawImage(
    this.img,
    0,
    this.img.frameIndex * Math.floor(this.img.height / this.img.frames),
    this.img.width,
    this.img.height / this.img.frames,
    this.x,
    this.y,
    this.w,
    this.h
  );
}

Chopper.prototype.draw = function(){
  this.animate();
  
  this.move();
  
  if (++this.img.frameIndex === 3){
    this.img.frameIndex = 0;
  }
}

Chopper.prototype.dead = function(){
  this.img.src = "img/chopperDead.png";
  this.h = 100;
  this.w = 100;
   
}
