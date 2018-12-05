
function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx = this.canvas.getContext('2d');

  document.addEventListener('click', this.onKeyEvent.bind(this));
  document.addEventListener('keydown', this.onKeyEvent.bind(this));
     
  this.bg = new Background(this.ctx);

  this.cannon = new Cannon(this.ctx);

  this.drawChopperCount = 0;
  this.drawExtraChopperCount = 0;
  this.choppers = [];
  
  this.drawTrooper = 0;
  this.troopers = [];

  this.bullets = [];
  this.charger = [];

  this.score = 0;
  this.highScore = this.getHighScore();
  
  this.countExplosion = 0;
  
}

Game.prototype.getHighScore = function (){
  var score = localStorage.getItem('score') || '0';
  return JSON.parse(score);
  
}

Game.prototype.getName = function (){
  var name = localStorage.getItem('name') || '';
  return JSON.parse(name);
}

Game.prototype.setHighScore = function(){
  
  document.getElementById('high-score').innerText = this.highScore;
  document.getElementById('name').innerText = this.getName();
  
}

Game.prototype.start = function() {
  if (!this.isRunning()) {
    this.refillCharger();
    this.drawIntervalId = setInterval(function () {
      this.drawChopperCount++;
      this.drawExtraChopperCount++;
      this.drawTrooper++;
      this.clear();     

      if (this.drawTrooper % TROOPER_INTERVAL){
        this.addTrooper();
        this.drawTrooper = 0;
      }
      //creo una variable nueva para que salgan aleatorios los helicopteros
      var newChopper = CHOPPER_INTERVAL + Math.floor(Math.random() * (50)) + 1;
      if (this.drawChopperCount % newChopper === 0) {
        this.addChopper();
        this.drawChopperCount = 0;
      }

      if (this.score > 200){
        var newExtraChopper = CHOPPER_INTERVAL + Math.floor(Math.random() * (50)) + 1;
        if (this.drawExtraChopperCount % newExtraChopper === 0) {
          this.addExtraChopper();
          this.drawExtraChopperCount = 0;
        }
      }
      if (this.isGameOver()) {
        this.stop();
        
      }

      this.troopers.forEach(function(trooper){
        trooper.collisionFloor();
      }.bind(this));

      this.troopers = this.troopers.filter(function(trooper){
        if(trooper.isCollision()){
          this.cannon.updateHealth();
        }
        return !trooper.isCollision();
      }.bind(this));

      this.killTrooper();
      this.destroyChopper();

      this.troopers = this.troopers.filter(function(trooper){
        return !trooper.isDead;
      }.bind(this));

      if (this.countExplosion++ === 6){
        this.choppers = this.choppers.filter(function(chopper){
          return !chopper.isDead;
        }.bind(this));
        this.countExplosion = 0;
      }

      this.bullets = this.bullets.filter(function(bullet){
        return !bullet.isSuccess;
      }.bind(this));

      this.updateScore();
      
      this.draw();

      this.clearChoppers();
      this.clearBullets();
      
    }.bind(this), DRAW_INTERVAL_MS);
  }
}

Game.prototype.updateScore = function(){
  document.getElementById('score').innerText = this.score;
}

Game.prototype.addTrooper = function(){
  var start = Math.floor(Math.random() * (this.canvas.width)) + 1;
  var trooper = new Trooper(this.ctx,start);
  if (start < 550 || start > 750){
    for (var i = 0; i < this.choppers.length; i++){
        if (this.choppers[i].x+125 === start){
        this.troopers.push(trooper);
      }
    }
  }
}

Game.prototype.addChopper = function(){
  var chopper = new Chopper(this.ctx, this.canvas.width, 80);
  this.choppers.push(chopper);
}

Game.prototype.addExtraChopper = function(){
  var chopper = new Chopper(this.ctx, -250, 170, "img/helicoptero-sprite-extra.png", 2);
  this.choppers.push(chopper);
}

Game.prototype.clearChoppers = function(){
  for (var i = 0; i < this.choppers.length; i++){
    if ((this.choppers[i].x + this.choppers[i].w < 0)||(this.choppers[i].x > this.canvas.width)){
      this.choppers.splice(i,1);
    }
  }
}

Game.prototype.clearBullets = function(){
  for(var i = 0; i < this.bullets.length; i++){
    if ((this.bullets[i].x < 0)||(this.bullets[i].x > this.ctx.canvas.width )||(this.bullets[i].y < 0)){
      this.bullets.splice(i,1);
    }  
  }
}

Game.prototype.killTrooper = function(){
  for (var i = 0; i < this.bullets.length; i++){
    for (var j = 0; j < this.troopers.length; j++){
      if (((this.bullets[i].x >= this.troopers[j].x)&&(this.bullets[i].x <= this.troopers[j].x + 44))
      &&((this.bullets[i].y >= this.troopers[j].y)&&(this.bullets[i].y <= this.troopers[j].y +61))){
        this.troopers[j].isDead = true;
        this.bullets[i].isSuccess = true;
        this.score += 5;
      }
    }
  }
}

Game.prototype.destroyChopper = function(){
  for (var i = 0; i < this.bullets.length; i++){
    for (var j = 0; j < this.choppers.length; j++){
      if (((this.bullets[i].x >= this.choppers[j].x)&&(this.bullets[i].x <= this.choppers[j].x + 250))
      &&((this.bullets[i].y >= this.choppers[j].y)&&(this.bullets[i].y <= this.choppers[j].y + 100))){
        this.choppers[j].isDead = true;
        this.choppers[j].dead();
        this.bullets[i].isSuccess = true;
        this.score += 40;
      }
    }
  }
  
}

Game.prototype.addHighScore = function(name){
  console.log(name);
  localStorage.setItem('score', JSON.stringify(this.score));
  localStorage.setItem('name', JSON.stringify(name));
  
}


Game.prototype.isGameOver = function() {
  return this.cannon.isDead();
}

Game.prototype.isRunning = function() {
  return this.drawIntervalId;
}

Game.prototype.stop = function () {
  var name = prompt("DEAD. Your score is the highest, insert your name:");
  if (this.score > this.highScore){
    this.addHighScore(name);    
  }
  clearInterval(this.drawIntervalId);
  this.drawIntervalId = undefined;
}

Game.prototype.addBullet = function (ctx, dx, dy){
  var bullet = new Bullet (ctx, 650, 550, dx, dy);
  this.bullets.push(bullet);
}

Game.prototype.onKeyEvent = function(event) {
  console.log('EVENT => ', event);
  var shotX = event.clientX;
  var shotY = event.clientY;
  if ((shotY < 450)&&(this.charger.length > 0)){
    this.addBullet(this.ctx,shotX,shotY);
    console.log(this.charger);
    this.charger.pop();
  }  
  if(event.keyCode === KEY_SPACE){
    this.refillCharger();
  }
}

Game.prototype.refillCharger = function(){
  var x = 530;
  for(var i = 0; i < 4; i++){
    var bullet = new Bullet(this.ctx, x, 600);
    this.charger.push(bullet);
    x -= 30;
  }
}

Game.prototype.drawBulletCharger = function(bullets){
    for(var i = 0; i < bullets.length; i++){
      this.ctx.beginPath();
      this.ctx.arc( bullets[i].x, bullets[i].y, 5, 0,( Math.PI / 180 ) * 360); 
      this.ctx.fillStyle = "#64FE2E";
      this.ctx.fill();
      this.ctx.closePath();
  } 
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function () {
  this.bg.draw();

  this.bullets.forEach(function(bullet){
    bullet.draw();
  });

  this.drawBulletCharger(this.charger);

  this.cannon.draw();

  this.troopers.forEach(function(trooper){
    trooper.draw();
      
  });

  this.choppers.forEach(function(chopper) {
    chopper.draw()
  });
    
}