var _MAXCUBES = 10;

$(document).ready(function(){

  init();

  cubesAnim();



});

function init(){
  for( i = 0; i < _MAXCUBES; i++){
    $("#rrimgs").append("<i class='fa fa-cube cubesAnim'></i>")
  }
}

function cubesAnim(){
  requestAnimFrame(cubesAnim); //when you write code
  $('.cubesAnim').css('color', genRandColor());

  $("#rrimgs").children().each(function(ind){
    if(ind < parseInt(Math.random() * _MAXCUBES) && $(this).hasClass('cubesAnim')){
      $(this).removeClass('cubesAnim');

    }
    if(ind < parseInt(Math.random() * _MAXCUBES) && !($(this).hasClass('cubesAnim'))){
      $(this).addClass('cubesAnim');

    }
    if(Math.random() * 100 > 25){
      if($(this).hasClass('fa-cube'))
        $(this).addClass('fa-beer').removeClass('fa-cube');
      else {
        $(this).addClass('fa-cube').removeClass('fa-beer');
      }
    }
  });
  $("#rrimgs").children().each(function(ind){

  });


}


function genRandColor(){
  var colStr;
  colStr = ""+"rgba("+getRand255()+","+getRand255()+","+getRand255()+","+ parseFloat(getRand255()/255) +")";
  return colStr;
}

function getRand255(){
  return parseInt(Math.abs(Math.random() * 255) + 100);
}
