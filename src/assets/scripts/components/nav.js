//import $ from 'jquery'

$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });

  $(window).scroll(function(){
    var sticky = $('.headerTop'),
        promo = $('#promo_banner'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) {
      sticky.addClass('sticky');
      promo.addClass('hidden');
    }
    else {
      sticky.removeClass('sticky');
      promo.removeClass('hidden');
    }
  });
  $('#desktop-nav li').hover(
    function() {
      $('#desktop-nav').css("background-color", "white");
      console.log('this was hovered');
    });
    //console.log('search button was clicked');
}); 