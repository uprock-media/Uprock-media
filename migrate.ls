document.querySelectorAll('.modal-stories-item').forEach((storyItem) => {
  const storyId = storyItem.getAttribute('data-story-id');
  const relatedImages = document.querySelectorAll(`.ss2-item[data-story-slug="${storyId}"] img`);

  if (relatedImages.length > 0) {
    const storySliderList = storyItem.querySelector('.story-slider-list');
    relatedImages.forEach((img) => {
      const slideEl = document.createElement('div');
      slideEl.className = 'swiper-slide';
      slideEl.appendChild(img.cloneNode(true));
      storySliderList.appendChild(slideEl);
    });

    // Предположим, что у вас есть способ идентифицировать инстанс Swiper для текущего слайдера.
    // Это может быть выполнено разными способами, в зависимости от того, как именно вы организовали инициализацию Swiper.
    // Вот один из возможных способов, если у каждого слайдера есть уникальный id или класс, связанный с storyId:
    const swiperInstance = storyItem.querySelector('.story-slider').swiper;
    
    // Теперь, когда у нас есть инстанс Swiper, вызываем update.
    if (swiperInstance) {
      swiperInstance.update();
      swiperInstance.updateSlides(); // Этот вызов может быть необходим, если update по каким-то причинам не обновляет слайды как ожидалось.
    }
  }
});
