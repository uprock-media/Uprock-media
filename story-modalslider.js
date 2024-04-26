document.addEventListener('DOMContentLoaded', function() {
  var allStorySwipers = []; // Массив для хранения экземпляров слайдеров третьего уровня

  // Инициализация второго уровня слайдера (пример)
  var modalSwiper = new Swiper('.modal-stories-collection', {
    speed: 300,
    loop: false,
    autoHeight: false,
    centeredSlides: true,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 'auto',
    spaceBetween: calculateSpaceBetween(),

    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
      disabledClass: 'is-disabled'
    },
    on: {
      init: function() {
        this.slides.forEach(function(slide, index) {
          if (index !== this.activeIndex) {
            allStorySwipers[index].autoplay.stop();
          }
        }, this);
      },
      slideChange: function() {
        allStorySwipers.forEach(function(swiper, index) {
          if (index === this.activeIndex) {
            swiper.autoplay.start();
          } else {
            swiper.autoplay.stop();
          }
        }, this);
      }
    }
  });

  // Функция для расчета пространства между слайдами
  function calculateSpaceBetween() {
    return window.innerWidth * 0.3;
  }

  // Обновление слайдера при изменении размера окна
  window.addEventListener('resize', function() {
    modalSwiper.update();
  });
});
