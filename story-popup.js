document.addEventListener("DOMContentLoaded", function() {
    // Находим все элементы, которые должны открывать модальное окно
    var storyItems = document.querySelectorAll('.stories-item');

    // Для каждого элемента устанавливаем обработчик клика
    storyItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки, если это необходимо

            // Находим модальное окно и изменяем его стиль для отображения
            var modal = document.querySelector('.stories-modal-slider');
            if (modal) {
                modal.style.display = 'flex'; // Или любой другой стиль, который делает его видимым
            }
        });
    });

    // Настройка закрытия модального окна
    var closeModalElements = document.querySelectorAll('.stories-modal_bg, .close-modal-story');
    closeModalElements.forEach(function(element) {
        element.addEventListener('click', function() {
            var modal = document.querySelector('.stories-modal-slider');
            if (modal) {
                modal.style.display = 'none'; // Скрываем модальное окно
            }
        });
    });
});
