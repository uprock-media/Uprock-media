document.addEventListener("DOMContentLoaded", function() {
    var storyItems = document.querySelectorAll('.stories-item');
    var body = document.querySelector('body');

    storyItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            var modal = document.querySelector('.stories-modal-slider');
            if (modal) {
                modal.style.display = 'flex';
                body.classList.add('no-scroll');
            }
        });
    });

    var closeModalElements = document.querySelectorAll('.stories-modal_bg, .close-modal-story');
    closeModalElements.forEach(function(element) {
        element.addEventListener('click', function() {
            var modal = document.querySelector('.stories-modal-slider');
            if (modal) {
                modal.style.display = 'none';
                body.classList.remove('no-scroll');
            }
        });
    });
});
