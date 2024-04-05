function calculateSpaceBetween() {
  // Преобразуем 30vw в пиксели. Для этого умножаем ширину окна браузера на 0.3.
  return window.innerWidth * 0.3;
}
$(".modal-slider-wrapper").each(function (index) {
  let loopMode = $(this).attr("loop-mode") === "true";
  let sliderDuration = $(this).attr("slider-duration") !== undefined ? +$(this).attr("slider-duration") : 300;

  const modalSwiper = new Swiper($(this).find(".modal-stories-collection")[0], {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    centeredSlides: loopMode,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 'auto',
    watchOverflow: true,
    simulateTouch: true,
    allowTouchMove: true,
    spaceBetween: calculateSpaceBetween(), // Установлен отступ между слайдами
    rewind: false,
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled"
    },
    scrollbar: {
      el: $(this).find(".slider-progress-bar")[0],
      draggable: true,
      dragClass: "progress__drag",
      snapOnRelease: true
    },
    
  });

  // Обновление отступа при изменении размеров окна
  $(window).on('resize', function() {
    modalSwiper.params.spaceBetween = calculateSpaceBetween();
    modalSwiper.update();
  });
});
