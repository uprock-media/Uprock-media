document.addEventListener('DOMContentLoaded', function() {
  var allStorySwipers = [];
  var activeSwiperIndex = 0; // Индекс активного слайдера
  var fillAnimationDuration = 3000; // Длительность заполнения, в мс

  // Функция запуска анимации заполнения для активного булета
  function startFillAnimation(swiper) {
    const activeBullet = swiper.pagination.bullets[swiper.activeIndex];
    const fillElement = activeBullet.querySelector('.fill');

    // Очистка предыдущей анимации, если таковая была
    fillElement.style.transition = 'none';
    fillElement.style.width = '0%';
    // Принудительный reflow для сброса стилей
    fillElement.offsetWidth;

    // Установка анимации
    fillElement.style.transition = `width ${fillAnimationDuration}ms linear`;
    fillElement.style.width = '100%';
  }

  // Инициализация storySwipers
  document.querySelectorAll('.story-slider').forEach(function(el, index) {
    var storySwiper = new Swiper(el, {
      // Ваши параметры инициализации
      on: {
        slideChange: function() {
          // Запуск анимации заполнения при смене слайда
          startFillAnimation(this);
        },
        reachEnd: function() {
          // Переключение к следующему слайду в модальном окне
          var modalSwiper = document.querySelector('.modal-stories-collection').swiper;
          modalSwiper.slideNext();
        }
      }
    });

    storySwiper.autoplay.stop(); // Остановка автоплея при инициализации
    allStorySwipers.push(storySwiper);
  });

  // Установка автоплея только для активного storySwiper
  function setActiveSwiperAutoplay(activeIndex) {
    activeSwiperIndex = activeIndex;
    allStorySwipers.forEach(function(swiper, index) {
      if (index === activeIndex) {
        startFillAnimation(swiper);
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  }

  // Инициализация модального слайдера
  var mainSwiper = document.querySelector('.modal-stories-collection').swiper;
  mainSwiper.on('slideChange', function() {
    setActiveSwiperAutoplay(this.activeIndex);
  });
  
  // Установка начального автоплея
  setActiveSwiperAutoplay(activeSwiperIndex);
});
