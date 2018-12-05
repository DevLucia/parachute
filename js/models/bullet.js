function Bullet(ctx, x, y,dx, dy){
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.dx = dx || 0;
  this.dy = dy || 0;

  this.vx = (this.dx - this.x)/ Math.sqrt( Math.pow( this.dx + this.x, 2) + Math.pow(this.dy - this.y, 2));
  this.vy = (this.dy - this.y)/ Math.sqrt( Math.pow( this.dx + this.x, 2) + Math.pow( this.dy - this.y, 2));

  this.drawCount = 0;

  this.isSuccess = false;
}

Bullet.prototype.draw = function(){

  this.animate();
  this.ctx.beginPath();
  this.ctx.arc( this.x, this.y, 5, 0,( Math.PI / 180 ) * 360);
  this.ctx.fillStyle = "#64FE2E";
  this.ctx.fill();
  this.ctx.closePath();
} 

Bullet.prototype.animate = function(){
  this.x += this.vx * SPEED;
  this.y += this.vy * SPEED;
}