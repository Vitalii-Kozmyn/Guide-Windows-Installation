document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Створення крапок для навігації
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Перехід до вказаного слайду
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        
        // Оновлення вигляду слайдера
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Оновлення активного слайда
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentIndex) slide.classList.add('active');
        });
        
        // Оновлення активної крапки
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentIndex) dot.classList.add('active');
        });
    }
    
    // Обробники подій для кнопок
    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
    });
    
    // Обробка клавіш стрілок для навігації слайдером
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Додаємо підтримку свайпів для мобільних пристроїв
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderWrapper.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Мінімальна відстань для спрацювання свайпу
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп вліво - наступний слайд
            goToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - попередній слайд
            goToSlide(currentIndex - 1);
        }
    }
    
    // Ініціалізація слайдера
    function initSlider() {
        createDots();
        goToSlide(0);
        
        // Встановлюємо активний клас для першого слайду
        slides[0].classList.add('active');
    }
    
    // Функція для плавної анімації переходів між слайдами
    function smoothTransition() {
        sliderWrapper.style.transition = 'transform 0.5s ease';
    }
    
    // Ініціалізація
    initSlider();
    smoothTransition();
}); 