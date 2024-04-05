document.addEventListener('DOMContentLoaded', function() {
    function markStoryAsViewed(storyId) {
        const targetStoryBox = document.querySelector(`.stories-item[data-story-id="${storyId}"] .stories-box`);
        if (targetStoryBox) {
            targetStoryBox.style.backgroundImage = 'none';
            targetStoryBox.style.backgroundColor = '#a8a8a8';
            localStorage.setItem(storyId, 'viewed');
        }
    }

    document.querySelectorAll('.stories-item').forEach(item => {
        const storyId = item.dataset.storyId;
        if (localStorage.getItem(storyId) === 'viewed') {
            const storyBox = item.querySelector('.stories-box');
            if (storyBox) {
                storyBox.style.backgroundImage = 'none';
                storyBox.style.backgroundColor = '#a8a8a8';
            }
        }
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('is-active')) {
                    const storyId = target.dataset.storyId;
                    if (storyId) {
                        markStoryAsViewed(storyId);
                    }
                }
            }
        });
    });

    const config = {
        attributes: true,
        attributeFilter: ['class']
    };

    document.querySelectorAll('.modal-stories-item').forEach(item => {
        observer.observe(item, config);
    });
});
