document.addEventListener('DOMContentLoaded', function() {
    // Функция для маркировки истории как просмотренной
    function markStoryAsViewed(storyId) {
        const targetStoryBox = document.querySelector(`.stories-item[data-story-id="${storyId}"] .stories-box`);
        if (targetStoryBox) {
            targetStoryBox.style.backgroundImage = 'none';
            targetStoryBox.style.backgroundColor = 'tansparent';
            localStorage.setItem(storyId, 'viewed');
        }
    }

    // Проверяем localStorage и обновляем стили для просмотренных историй при загрузке страницы
    const stories = document.querySelectorAll('.stories-item');
    stories.forEach(story => {
        const storyId = story.dataset.storyId;
        if (localStorage.getItem(storyId) === 'viewed') {
            const storyBox = story.querySelector('.stories-box');
            if (storyBox) {
                storyBox.style.backgroundImage = 'none';
                storyBox.style.backgroundColor = 'tansparent';
            }
        }
    });

    // Настройка MutationObserver для отслеживания изменений активного слайда
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('swiper-slide-active')) {
                    const storyId = target.dataset.storyId;
                    if (storyId) {
                        markStoryAsViewed(storyId);
                    }
                }
            }
        });
    });

    const config = { attributes: true, attributeFilter: ['class'] };
    document.querySelectorAll('.modal-stories-item').forEach(item => observer.observe(item, config));
});
