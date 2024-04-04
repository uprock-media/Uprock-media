$(document).ready(function() {
  $(".slider-wrapper").each(function(index) {
    let loopMode = $(this).attr("loop-mode") === "true";
    let sliderDuration = $(this).attr("slider-duration") !== undefined ? +$(this).attr("slider-duration") : 300;

    const swiper = new Swiper($(this).find(".carousel-slider")[0], {
      speed: sliderDuration,
      loop: loopMode,
      autoHeight: false,
      centeredSlides: loopMode,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 'auto',
      slidesPerGroup: 5, // Добавленный параметр для пролистывания по 5 слайдов
      watchOverflow: true,
      simulateTouch: true,
      allowTouchMove: true,
      spaceBetween: 10,
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
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
      on: {
        init: function() {
          console.log('Swiper initialized');
        },
        slideChange: function() {
          console.log('Active index has changed to:', this.activeIndex);
          console.log('Total number of slides:', this.slides.length);
        },
        reachEnd: function() {
          console.log('Reached the end of the slider');
          console.log('Is it the end?', this.isEnd);
        },
        transitionEnd: function() {
          console.log('Transition ended');
          console.log('Is it the end?', this.isEnd);
        }
      }
    });

    // Добавляем обработчик события resize для обновления swiper
    $(window).on('resize', function() {
      swiper.update();
    });
  });
});
