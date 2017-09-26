var head1 = $("h1#head1");
var total = 0;
var scene;
var camera;
var renderer;
var mwidth = 900, mheight = 900;

$(document).ready(function() {

  //
  extract(head1);

  window.requestAnimFrame(dripp);
  var oldtxt;
  //$("#wrapper").append("<div class='overlayer'>Loading <img src='./images/loading.gif' width='16px' height='16px' /></div>");
  $("#about, #about *").hide();
  $("#about, #about *").children().each(function(index){
    $(this).delay(200 * index).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(500);
  });
  setTimeout(function() {
    $("#wrapper").children(".overlayer").fadeOut(2000);
  }, 2000);
});



function extract(_textholder){
  var htext = _textholder.text();
  var hlen = htext.length;
  total += hlen;
  _textholder.text("");
  for(i=0; i< hlen; i++){
    _textholder.append("<h1 class='drippers'>"+htext[i]+"</h1>");
  }
}
function dripp(){
  rnd = parseInt(Math.random() * total);
  $(".drippers").each(function(i, obj) {
    if(i == rnd)
      $(this).toggleClass("drippin");
  });
  window.requestAnimFrame(dripp);
}


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000);
          };
})();
