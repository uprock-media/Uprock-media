document.addEventListener('DOMContentLoaded', function() {
  // Инициализация основного слайдера, если он управляет автоплеем storySwipers
  var mainSwiper = new Swiper('.modal-stories-collection', {
    // Параметры основного слайдера
  });

  var allStorySwipers = [];

  document.querySelectorAll('.story-slider').forEach(function(el) {
    var loopMode = el.getAttribute('loop-mode') === 'true';
    var sliderDuration = el.getAttribute('slider-duration') ? parseInt(el.getAttribute('slider-duration'), 10) : 3000;

    var storySwiper = new Swiper(el, {
      loop: false, // Установлено в false, как вы указали, что цикличность не нужна
      speed: sliderDuration,
      autoHeight: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: el.querySelector('.story-slider-progresbar'),
        type: 'bullets',
        clickable: true,
        renderBullet: function(index, className) {
          // Добавляем кастомный элемент для заполнения
          return '<span class="' + className + '"><span class="fill" style="width: 0%; height: 100%; background-color: black; position: absolute; top: 0; left: 0; transition: width ' + (sliderDuration / 1000) + 's linear;"></span></span>';
        },
      },
      autoplay: {
        delay: sliderDuration,
        disableOnInteraction: false,
      },
      on: {
        init: function() {
          this.autoplay.stop(); // Останавливаем автоплей при инициализации
        },
        slideChange: function() {
          updatePaginationFill(this);
        },
      },
    });

    allStorySwipers.push(storySwiper);
  });

  // Функция обновления заполнения для активного булета
  function updatePaginationFill(swiper) {
    let activeIndex = swiper.activeIndex;
    let bullets = swiper.pagination.bullets;
    bullets.forEach((bullet, index) => {
      let fill = bullet.querySelector('.fill');
      if (fill) {
        fill.style.width = index === activeIndex ? '100%' : '0%';
      }
    });
  }

  // Управление автоплеем в зависимости от активного слайда в основном слайдере
  mainSwiper.on('slideChange', function() {
    let activeIndex = this.activeIndex;
    allStorySwipers.forEach((swiper, index) => {
      if (index === activeIndex) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  });

  // Останавливаем автоплей при закрытии модального окна
  document.querySelectorAll('.stories-modal_bg, .close-modal-button').forEach(function(closeEl) {
    closeEl.addEventListener('click', function() {
      allStorySwipers.forEach(function(swiper) {
        swiper.autoplay.stop();
      });
    });
  });
});
