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
      }

      // Передаем номер активного слайда во второй слайдер
      const secondSlider = document.querySelector('.modal-stories-collection').swiper;
      if (secondSlider) {
        // Переходим к слайду с индексом index (индекс слайда начинается с 0)
        secondSlider.slideTo(index);
      }
    });
  });
});
