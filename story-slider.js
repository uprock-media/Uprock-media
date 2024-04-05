document.addEventListener('DOMContentLoaded', function() {
  // Инициализация основного (модального) слайдера
  var mainSwiper = new Swiper('.modal-stories-collection', {
    // Параметры основного слайдера...
    on: {
      slideChange: function () {
        controlStorySwipers(this.activeIndex);
      }
    }
  });

  var storySwipers = []; // Массив для хранения всех storySwiper'ов

  function controlStorySwipers(activeIndex) {
    // Функция управления автоплеем storySwiper'ов
    storySwipers.forEach((swiper, index) => {
      if (index === activeIndex) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  }

  document.querySelectorAll('.story-slider').forEach(function(sliderEl, index) {
    var loopMode = sliderEl.getAttribute('loop-mode') === 'true';
    var sliderDuration = parseInt(sliderEl.getAttribute('slider-duration'), 10) || 3000;

    var storySwiper = new Swiper(sliderEl, {
      speed: sliderDuration,
      loop: loopMode,
      autoHeight: false,
      centeredSlides: loopMode,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: 0,
      rewind: false,
      mousewheel: {
        forceToAxis: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      pagination: {
        el: sliderEl.querySelector('.story-slider-progresbar'),
        type: 'bullets',
        bulletActiveClass: 'is-active',
        bulletClass: 'story-slider-dot',
        bulletElement: 'span',
        clickable: true,
        renderBullet: function(index, className) {
          return '<span class="' + className + '"><span class="fill"></span></span>'; // Кастомный элемент для булета
        },
      },
      navigation: {
        nextEl: sliderEl.querySelector('.story-next'),
        prevEl: sliderEl.querySelector('.story-prev'),
        disabledClass: 'is-disabled'
      },
      slideActiveClass: 'is-active',
      slideDuplicateActiveClass: 'is-active',
      autoplay: {
        delay: sliderDuration,
        disableOnInteraction: false,
        stopOnLastSlide: true
      },
      on: {
        init: function () {
          if (index !== mainSwiper.activeIndex) {
            this.autoplay.stop(); // Останавливаем автоплей для неактивных слайдеров при инициализации
          }
        },
        reachEnd: function () {
          mainSwiper.slideNext(); // Переключаем основной слайдер на следующий слайд
        },
        paginationUpdate: function () {
          updatePaginationFill(this); // Обновление заполнения булетов
        },
      }
    });

    // Добавление инициализированного storySwiper в массив
    storySwipers.push(storySwiper);
  });

  function updatePaginationFill(swiper) {
    // Функция для обновления заполнения булетов
    var bullets = swiper.pagination.bullets;
    if (bullets) {
      bullets.forEach((bullet, index) => {
        var fill = bullet.querySelector('.fill');
        if (fill) {
          fill.style.width = index === swiper.activeIndex ? '100%' : '0%';
          fill.style.transition = 'width ' + (sliderDuration / 1000) + 's linear';
        }
      });
    }
  }

  // Останавливаем автоплей для всех storySwipers при закрытии модального окна
  document.querySelectorAll('.stories-modal_bg, .close-modal-button').forEach(function(closeEl) {
    closeEl.addEventListener('click', function() {
      storySwipers.forEach(function(swiper) {
        swiper.autoplay.stop();
      });
    });
  });
});
