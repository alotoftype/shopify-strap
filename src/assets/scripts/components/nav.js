import $ from 'jquery'

$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });

  $(window).scroll(function(){
    var sticky = $('.headerTop'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('sticky');
    else sticky.removeClass('sticky');
  });

  $('.search').click((e)=> {
    $('#search').toggle().animate({
      top: "2.8em",
      height: "10em"},"fast", "linear", () => {
        $(this).css('z-index', 20)
      });
      e.preventDefault();
    //console.log('search button was clicked');
  });
});