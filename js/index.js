document.addEventListener('DOMContentLoaded', function() {

  var name = localStorage.getItem('name');
  var score = localStorage.getItem('score');
    
  document.getElementById('high-score').innerText = JSON.parse(score);
  document.getElementById('name').innerText = JSON.parse(name);


  var startButton = document.querySelector('.start-button');
  startButton.addEventListener('click',function(){
    console.log('entra')
    document.querySelector('.intro').classList.add('disable');
    document.querySelector('.game').classList.remove('disable');
    var game = new Game('main-canvas');
    game.start();
  });
  
});