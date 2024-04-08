document.addEventListener('DOMContentLoaded', function() {
  var allStorySwipers = []; // Массив для хранения экземпляров слайдеров третьего уровня

  // Инициализация Swiper для каждого .story-slider (слайдер третьего уровня)
  document.querySelectorAll('.story-slider').forEach(function(el, index) {
    var loopMode = el.getAttribute('loop-mode') === 'true';
    var sliderDuration = el.getAttribute('slider-duration') ? parseInt(el.getAttribute('slider-duration'), 10) : 300;

    var storySwiper = new Swiper(el, {
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
        el: el.querySelector('.story-slider-progresbar'),
        bulletActiveClass: 'is-active',
        bulletClass: 'story-slider-dot',
        bulletElement: 'button',
        clickable: true
      },
      navigation: {
        nextEl: el.querySelector('.story-next'),
        prevEl: el.querySelector('.story-prev'),
        disabledClass: 'is-disabled'
      },
      slideActiveClass: 'is-active',
      slideDuplicateActiveClass: 'is-active',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      on: {
        reachEnd: function() {
          if (!this.loop) {
            setTimeout(function() {
              var mainSwiper = document.querySelector('.modal-stories-collection').swiper;
              var nextIndex = mainSwiper.activeIndex + 1 >= mainSwiper.slides.length ? 0 : mainSwiper.activeIndex + 1;
              mainSwiper.slideTo(nextIndex);
            }, this.params.autoplay.delay);
          }
        }
      }
    });

    allStorySwipers.push(storySwiper);
  });

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

