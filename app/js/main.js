$(function(){

  $('.header__bg-slider').slick({
    dots: true,
    appendDots: $('.container'),
    infinite: true,
    speed: 1500,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000
  });

  $(window).scroll(function() {
    if($(this).scrollTop() >= window.innerHeight / 2) {
        $('.header-top__inner').addClass('scrolled');
    }
    else{
        $('.header-top__inner').removeClass('scrolled');
    }
});


  
});