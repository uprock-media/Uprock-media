document.addEventListener('DOMContentLoaded', function() {
    var allStorySwipers = []; // Массив для хранения экземпляров слайдеров третьего уровня
    var modalSwiper = null; // Переменная для хранения экземпляра слайдера второго уровня

    // Инициализация слайдеров
    function initializeSwipers() {
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
                autoplay: false // Остановка автовоспроизведения
            });

            // Добавляем обработчик события reachEnd
            storySwiper.on('reachEnd', function() {
                if (!storySwiper.loop) {
                    var mainSwiper = document.querySelector('.modal-stories-collection').swiper;
                    var nextIndex = mainSwiper.activeIndex + 1 >= mainSwiper.slides.length ? 0 : mainSwiper.activeIndex + 1;
                    mainSwiper.slideTo(nextIndex);
                }
            });

            allStorySwipers.push(storySwiper);
        });

        // Инициализация второго уровня слайдера
        var modalSwiperContainer = document.querySelector('.modal-stories-collection');
        if (modalSwiperContainer) {
            modalSwiper = new Swiper(modalSwiperContainer, {
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
                    },
                    reachEnd: function() {
                        // Проверяем, что это последний слайд второго уровня
                        if (this.activeIndex === this.slides.length - 1) {
                            // Проверяем, что все слайды третьего уровня в текущем слайде второго уровня полностью проигрались
                            var isAllStorySwipersStopped = allStorySwipers.every(function(swiper) {
                                return swiper.progress >= 1; // Проверяем продолжительность проигрывания слайда
                            });
                            if (isAllStorySwipersStopped) {
                                // Переключаемся на следующий слайд второго уровня
                                this.slideNext();
                            }
                        }
                    }
                }
            });
        }
    }

    // Клонирование элементов в слайдеры
    document.querySelectorAll('.ss2-item').forEach(function(ss2Item) {
        var storySlug = ss2Item.getAttribute('data-story-slug');
        var modalStoriesItems = document.querySelectorAll('.modal-stories-item[data-story-slug="' + storySlug + '"]');
        modalStoriesItems.forEach(function(modalStoriesItem) {
            var storySliderList = modalStoriesItem.querySelector('.story-slider-list');
            if (storySliderList) {
                var clone = ss2Item.cloneNode(true);
                clone.classList.add('story-slider-slide', 'swiper-slide');
                clone.setAttribute('data-story-slug', storySlug);
                storySliderList.appendChild(clone);
            }
        });
    });

    // Обновление слайдера при изменении размера окна
    window.addEventListener('resize', function() {
        if (modalSwiper) {
            modalSwiper.update();
        }
    });

    // Функция для расчета пространства между слайдами
    function calculateSpaceBetween() {
        return window.innerWidth * 0.3;
    }

    // Инициализация слайдеров при загрузке документа
    initializeSwipers();
});
