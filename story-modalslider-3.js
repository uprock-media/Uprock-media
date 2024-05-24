document.addEventListener('DOMContentLoaded', function() {
  // Инициализация второго уровня слайдера
  const modalSwiper = new Swiper('.modal-stories-collection', {
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
    autoplay: {
      delay: 3000, // 3 секунды
      disableOnInteraction: false
    },
    on: {
      init: function() {
        this.autoplay.stop();
      },
      slideChange: function() {
        this.autoplay.start();
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

  // Экспортируем слайдер для использования в другом файле
  window.modalSwiper = modalSwiper;
});
