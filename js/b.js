$(document).ready(function() {
  $('.pageBody').css('height', $(window).height()+'px');
  $('.ar_li_t').css('width', $('.pjbar').innerWidth()+'px');
  function expend(e) {
  var tg = e.target.className;
  console.log(tg);
    if($('.'+tg).parent().parent().children('.e_ar_li').width() == 0){
        $('.'+tg).parent().parent().children('.e_ar_li').css({'width':'auto','display': '-webkit-box'});
    }else{
        $('.'+tg).parent().parent().children('.e_ar_li').css({'width':'0', 'display':'none'});
      }
    }
    $('#pjbar').on('click', expend);
  $('#hiar').on('click', expend);
});
