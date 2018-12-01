function Background(ctx) {
  
  this.ctx = ctx;

  this.x = 0;
  this.y = 0;

  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.img = new Image();
  this.img.src = "./img/bg6.jpg"
}

Background.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
}
