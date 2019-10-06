$(function(){

  $('.header__bg-slider').slick({
    dots: true,
    appendDots: $('.dots-inner'),
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

  $(".header-top__menu, .header__text-inner").on("click", "a", function(event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });

  

  
});