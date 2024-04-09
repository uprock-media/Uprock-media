document.addEventListener("DOMContentLoaded", function() {
    // Находим все элементы .ss2-item
    const ss2Items = document.querySelectorAll('.ss2-item');

    // Перебираем каждый .ss2-item
    ss2Items.forEach(function(ss2Item) {
        // Для каждого .ss2-item находим все .modal-stories-item
        const modalStoriesItems = document.querySelectorAll('.modal-stories-item');

        // Перебираем каждый .modal-stories-item
        modalStoriesItems.forEach(function(modalStoriesItem) {
            // Находим .story-slider-list внутри текущего .modal-stories-item
            const storySliderList = modalStoriesItem.querySelector('.story-slider-list');

            // Клонируем содержимое .ss2-item и добавляем его в .story-slider-list
            const clone = ss2Item.cloneNode(true);

            // Добавляем классы .story-slider-slide и .swiper-slide к клону
            clone.classList.add('story-slider-slide', 'swiper-slide');

            // Добавляем клонированный элемент в .story-slider-list
            storySliderList.appendChild(clone);
        });
    });
});
