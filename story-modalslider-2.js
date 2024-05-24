document.addEventListener('DOMContentLoaded', function() {
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

  // Обработка открытия и закрытия модального окна
  var storyItems = document.querySelectorAll('.stories-item');
  var body = document.querySelector('body');

  storyItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();

      var modal = document.querySelector('.stories-modal-slider');
      if (modal) {
        modal.style.display = 'flex';
        body.classList.add('no-scroll');
        modalSwiper.update(); // Обновляем слайдер при открытии модального окна
        modalSwiper.autoplay.start(); // Запуск автоплея при открытии модального окна
      }
    });
  });

  var closeModalElements = document.querySelectorAll('.stories-modal_bg, .close-modal-story');
  closeModalElements.forEach(function(element) {
    element.addEventListener('click', function() {
      var modal = document.querySelector('.stories-modal-slider');
      if (modal) {
        modal.style.display = 'none';
        body.classList.remove('no-scroll');
        modalSwiper.autoplay.stop(); // Остановка автоплея при закрытии модального окна
      }
    });
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
