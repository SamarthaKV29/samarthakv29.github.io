
var oldVals = new Array(8).fill(0);
var oldVals1 = new Array(8).fill(0);
var oldVals2 = new Array(8).fill(0);

oldVals[3] = oldVals1[3] = oldVals2[3] = 1;

$(document).ready(function() {
  $(".mRot1").mouseover(function(){
    $(this).attr("value","ROTATE");
  }).mouseout(function(){
    $(this).attr("value","R").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '0').attr('max', '360');
  }).mousemove(function(){
     if(!isNaN(parseFloat($(this).val())))
      oldVals[0] = $(this).val();
  }).mouseup(function(){
    $(this).attr("type","button").val("R");
  });
  $(".mSkX1").mouseover(function(){
    $(this).attr("value","SKEWX");
  }).mouseout(function(){
    $(this).attr("value","SX").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '0').attr('max', '360');
  }).mousemove(function(){
     if(!isNaN(parseFloat($(this).val())))
      oldVals[1] = $(this).val();
  }).mouseup(function(){
    $(this).attr("type","button").val("SX");
  });
  $(".menu1 .mRes1").click(function(ev){
    for(i = 0; i < 8; i++)
      oldVals[i] = 0;
    oldVals[3] = 1;
    draggin = false;
  });
  $(".menu1 .mSkY1").mouseover(function(){
    $(this).attr("value","SKEWY");
  }).mouseout(function(){
    $(this).attr("value","SY").attr("type","button").css('transform', 'rotate(0deg)');
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '0').attr('max', '360').css('transform', 'rotate(90deg)');
  }).mousemove(function(){
     if(!isNaN(parseFloat($(this).val())))
      oldVals[2] = $(this).val();
  }).mouseup(function(){
    $(this).attr("type","button").val("SY").css('transform', 'rotate(0deg)');
  });
  $(".menu1 .mSca1").mouseover(function(){
    $(this).attr("value","SCALE");
  }).mouseout(function(){
    $(this).attr("value","S").attr("type","button");
  }).mousedown(function(){
    $(this).attr('type','range').attr('min', '0.1').attr('max', '2').attr('step', '0.1');
  }).mousemove(function(){
    if(!isNaN(parseFloat($(this).val())))
      oldVals[3] = $(this).val();
  }).mouseup(function(){
    $(this).attr("type","button").val("S");
  });

  var draggin = false;
  $(".menu1 .mTra1").mouseover(function(){
    $(this).attr("value","TRANSLATE");
    $(this).css('cursor', 'all-scroll');
  }).mouseout(function(){
    $(this).attr("value","T").attr("type","button");
  }).mousedown(function(ev){
    oldVals[4] = ev.clientX; //initial X
    oldVals[5] = ev.clientY; //initial Y
    draggin = true;
  }).mousemove(function(ev){
    if(oldVals[4] && oldVals[5] && draggin){
      oldVals[6] = (ev.clientX - oldVals[4])*10;
      oldVals[7] = (ev.clientY - oldVals[5])*10;
    }
  }).mouseup(function(){
    $(this).attr("type","button").val("T");
    draggin = false;
  });
  setInterval(function() {
    $("#firstone").css("transform", "rotate("+oldVals[0]+"deg) scale("+oldVals[3]+", "+oldVals[3]+") translate("+oldVals[6]+"px, "+oldVals[7]+"px) skew("+oldVals[1]+"deg, "+oldVals[2]+"deg)");
  }, 100);


//-----------------------------------------------------------------------
$(".mRot2").mouseover(function(){
  $(this).attr("value","ROTATE");
}).mouseout(function(){
  $(this).attr("value","R").attr("type","button");
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0').attr('max', '360');
}).mousemove(function(){
   if(!isNaN(parseFloat($(this).val())))
    oldVals1[0] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("R");
});
$(".mSkX2").mouseover(function(){
  $(this).attr("value","SKEWX");
}).mouseout(function(){
  $(this).attr("value","SX").attr("type","button");
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0').attr('max', '360');
}).mousemove(function(){
   if(!isNaN(parseFloat($(this).val())))
    oldVals1[1] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("SX");
});
$(".menu2 .mRes2").click(function(ev){
  for(i = 0; i < 8; i++)
    oldVals1[i] = 0;
  oldVals1[3] = 1;
  draggin = false;
});
$(".menu2 .mSkY2").mouseover(function(){
  $(this).attr("value","SKEWY");
}).mouseout(function(){
  $(this).attr("value","SY").attr("type","button").css('transform', 'rotate(0deg)');
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0').attr('max', '360').css('transform', 'rotate(90deg)');
}).mousemove(function(){
   if(!isNaN(parseFloat($(this).val())))
    oldVals1[2] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("SY").css('transform', 'rotate(0deg)');
});
$(".menu2 .mSca2").mouseover(function(){
  $(this).attr("value","SCALE");
}).mouseout(function(){
  $(this).attr("value","S").attr("type","button");
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0.1').attr('max', '2').attr('step', '0.1');
}).mousemove(function(){
  if(!isNaN(parseFloat($(this).val())))
    oldVals1[3] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("S");
});

var draggin = false;
$(".menu2 .mTra2").mouseover(function(){
  $(this).attr("value","TRANSLATE");
  $(this).css('cursor', 'all-scroll');
}).mouseout(function(){
  $(this).attr("value","T").attr("type","button");
}).mousedown(function(ev){
  oldVals1[4] = ev.clientX; //initial X
  oldVals1[5] = ev.clientY; //initial Y
  draggin = true;
}).mousemove(function(ev){
  if(oldVals1[4] && oldVals1[5] && draggin){
    oldVals1[6] = (ev.clientX - oldVals1[4])*10;
    oldVals1[7] = (ev.clientY - oldVals1[5])*10;
  }
}).mouseup(function(){
  $(this).attr("type","button").val("T");
  draggin = false;
});

setInterval(function() {
  $("#side1").css("transform", "rotate("+oldVals1[0]+"deg) scale("+oldVals1[3]+", "+oldVals1[3]+") translate("+oldVals1[6]+"px, "+oldVals1[7]+"px) skew("+oldVals1[1]+"deg, "+oldVals1[2]+"deg)");
}, 100);

//-------------------------------------------------------------------------------------------
$(".mRot3").mouseover(function(){
  $(this).attr("value","ROTATE");
}).mouseout(function(){
  $(this).attr("value","R").attr("type","button");
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0').attr('max', '360');
}).mousemove(function(){
   if(!isNaN(parseFloat($(this).val())))
    oldVals2[0] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("R");
});
$(".mSkX3").mouseover(function(){
  $(this).attr("value","SKEWX");
}).mouseout(function(){
  $(this).attr("value","SX").attr("type","button");
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0').attr('max', '360');
}).mousemove(function(){
   if(!isNaN(parseFloat($(this).val())))
    oldVals2[1] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("SX");
});
$(".menu3 .mRes3").click(function(ev){
  for(i = 0; i < 8; i++)
    oldVals2[i] = 0;
  oldVals2[3] = 1;
  draggin = false;
});
$(".menu3 .mSkY3").mouseover(function(){
  $(this).attr("value","SKEWY");
}).mouseout(function(){
  $(this).attr("value","SY").attr("type","button").css('transform', 'rotate(0deg)');
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0').attr('max', '360').css('transform', 'rotate(90deg)');
}).mousemove(function(){
   if(!isNaN(parseFloat($(this).val())))
    oldVals2[2] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("SY").css('transform', 'rotate(0deg)');
});
$(".menu3 .mSca3").mouseover(function(){
  $(this).attr("value","SCALE");
}).mouseout(function(){
  $(this).attr("value","S").attr("type","button");
}).mousedown(function(){
  $(this).attr('type','range').attr('min', '0.1').attr('max', '2').attr('step', '0.1');
}).mousemove(function(){
  if(!isNaN(parseFloat($(this).val())))
    oldVals2[3] = $(this).val();
}).mouseup(function(){
  $(this).attr("type","button").val("S");
});

var draggin = false;
$(".menu3 .mTra3").mouseover(function(){
  $(this).attr("value","TRANSLATE");
  $(this).css('cursor', 'all-scroll');
}).mouseout(function(){
  $(this).attr("value","T").attr("type","button");
}).mousedown(function(ev){
  oldVals2[4] = ev.clientX; //initial X
  oldVals2[5] = ev.clientY; //initial Y
  draggin = true;
}).mousemove(function(ev){
  if(oldVals2[4] && oldVals2[5] && draggin){
    oldVals2[6] = (ev.clientX - oldVals2[4])*10;
    oldVals2[7] = (ev.clientY - oldVals2[5])*10;
  }
}).mouseup(function(){
  $(this).attr("type","button").val("T");
  draggin = false;
});

setInterval(function() {
  $("#top1").css("transform", "rotate("+oldVals2[0]+"deg) scale("+oldVals2[3]+", "+oldVals2[3]+") translate("+oldVals2[6]+"px, "+oldVals2[7]+"px) skew("+oldVals2[1]+"deg, "+oldVals2[2]+"deg)");
}, 100);















});
