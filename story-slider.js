document.addEventListener('DOMContentLoaded', function() {
  
  var allStorySwipers = [];

  // Функция обновления заполнения для активного булета
  function updatePaginationFill(swiper) {
    let bullets = swiper.pagination.bullets;
    if (!bullets) return;

    bullets.forEach((bullet, index) => {
      let fill = bullet.querySelector('.fill');
      if (fill) {
        fill.style.transition = 'width ' + (swiper.params.autoplay.delay / 1000) + 's linear';
        fill.style.width = (index === swiper.realIndex) ? '100%' : '0%';
      }
    });
  }

  document.querySelectorAll('.story-slider').forEach(function(el) {
    var loopMode = el.getAttribute('loop-mode') === 'true';
    var sliderDuration = el.getAttribute('slider-duration') ? parseInt(el.getAttribute('slider-duration'), 10) : 3000;

    var storySwiper = new Swiper(el, {
      loop: false, // Цикличность отключена
      speed: sliderDuration,
      autoHeight: true,
      centeredSlides: true, // Если необходимо, установите в false
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
          return '<span class="' + className + '"><span class="fill" style="width: 0%; height: 100%; position: absolute; top: 0; left: 0;"></span></span>';
        },
      },
      autoplay: {
        delay: sliderDuration,
        disableOnInteraction: false,
      },
      on: {
        init: function() {
          this.autoplay.stop(); // Остановка автоплея при инициализации
          updatePaginationFill(this); // Обновление заполнения при инициализации
        },
        slideChange: function() {
          updatePaginationFill(this);
        },
      },
    });

    allStorySwipers.push(storySwiper);
  });

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
