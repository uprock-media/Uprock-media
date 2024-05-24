document.addEventListener('DOMContentLoaded', function() {
  // Находим все элементы слайдов в первом слайдере
  const firstSliderItems = document.querySelectorAll('.carousel-slider .swiper-slide');

  // Добавляем обработчик клика на каждый слайд
  firstSliderItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      // Открываем модальное окно
      const modal = document.querySelector('.stories-modal-slider');
      if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
      }

      // Передаем номер активного слайда во второй слайдер
      const secondSlider = window.modalSwiper;
      if (secondSlider) {
        // Переходим к слайду с индексом index (индекс слайда начинается с 0)
        secondSlider.slideTo(index);

        // Запускаем автоплей
        secondSlider.autoplay.start();
      }
    });
  });

  // Обработка закрытия модального окна
  const closeModalElements = document.querySelectorAll('.stories-modal_bg, .close-modal-story');
  closeModalElements.forEach(function(element) {
    element.addEventListener('click', function() {
      const modal = document.querySelector('.stories-modal-slider');
      if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        const secondSlider = window.modalSwiper;
        if (secondSlider) {
          secondSlider.autoplay.stop(); // Остановка автоплея при закрытии модального окна
          secondSlider.slideTo(0, 0, false); // Сброс на первый слайд
        }
      }
    });
  });
});
