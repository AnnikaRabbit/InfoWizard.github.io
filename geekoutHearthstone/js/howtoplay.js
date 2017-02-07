
$(document).ready(function(){


//Site data
//
//
//
  document.cookie = "BypassIntro=true;";


//HOVER CONTROLS FOR ILLUMINATED GAME PIECES
//
//
//

$("#hand-of-cards-select").hover(function(){
  document.getElementById('hand-of-cards-text').style.display = "block";
}, function(){
  document.getElementById('hand-of-cards-text').style.display = "none";
});

$("#powerful-heroes-select-1").hover(function(){
  document.getElementById('powerful-heroes-text').style.display = "block";
}, function(){
  document.getElementById('powerful-heroes-text').style.display = "none";
});

$("#powerful-heroes-select-2").hover(function(){
  document.getElementById('powerful-heroes-text').style.display = "block";
}, function(){
  document.getElementById('powerful-heroes-text').style.display = "none";
});

$("#pool-of-mana-select").hover(function(){
  document.getElementById('pool-of-mana-text').style.display = "block";
}, function(){
  document.getElementById('pool-of-mana-text').style.display = "none";
});

$("#board-select").hover(function(){
  document.getElementById('board-text').style.display = "block";
}, function(){
  document.getElementById('board-text').style.display = "none";
});

$("#how-to-play-menu").click(function(){
 window.location = "index.html";
 });

});
