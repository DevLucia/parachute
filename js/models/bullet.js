function Bullet(ctx, x, y,dx, dy){
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.dx = dx || 0;
  this.dy = dy || 0;
  this.w = 15;
  this.h = 15;

  this.vx = (this.dx - this.x)/ Math.sqrt( Math.pow( this.dx + this.x, 2) + Math.pow(this.dy - this.y, 2));
  this.vy = (this.dy - this.y)/ Math.sqrt( Math.pow( this.dx + this.x, 2) + Math.pow( this.dy - this.y, 2));

  this.img = new Image();
  this.img.src = "./img/fireball.png";
  
  this.drawCount = 0;

  this.isSuccess = false;
}

Bullet.prototype.draw = function(){

  this.animate();
  this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
} 

Bullet.prototype.animate = function(){
  this.x += this.vx * SPEED;
  this.y += this.vy * SPEED;
}