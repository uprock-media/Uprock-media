document.addEventListener('DOMContentLoaded', function () {
    const modalSlider = document.querySelector('.stories-modal-slider');
    const slides = document.querySelectorAll('.modal-stories-item');
    const modalConfig = { attributes: true, attributeFilter: ['style'] };
    const slideConfig = { attributes: true, attributeFilter: ['class'] };

    const playVideoOnActiveSlide = () => {
        const activeSlide = document.querySelector('.swiper-slide-active video');
        if (activeSlide) {
            activeSlide.play().catch(e => console.error(`Error playing video: ${e.message}`));
        }
    };

    const handleVideoPlayback = (slide, isActive) => {
        const video = slide.querySelector('video');
        if (video) {
            if (isActive) {
                video.play().catch(e => console.error(`Error playing video: ${e.message}`));
            } else {
                video.pause();
            }
        }
    };

    const slideCallback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const targetSlide = mutation.target;
                const isActive = targetSlide.classList.contains('swiper-slide-active');
                handleVideoPlayback(targetSlide, isActive);
            }
        }
    };

    const modalCallback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const displayStyle = window.getComputedStyle(modalSlider).display;
                if (displayStyle === 'none') {
                    const videos = document.querySelectorAll('.modal-stories-item video');
                    videos.forEach(video => {
                        video.pause();
                        video.currentTime = 0;
                    });
                    console.log('All videos have been paused and reset.');
                } else if (displayStyle !== 'none') {
                    // Воспроизведение видео на активном слайде при открытии модального окна
                    playVideoOnActiveSlide();
                }
            }
        }
    };

    slides.forEach(slide => {
        const observer = new MutationObserver(slideCallback);
        observer.observe(slide, slideConfig);
    });

    const modalObserver = new MutationObserver(modalCallback);
    modalObserver.observe(modalSlider, modalConfig);
});
