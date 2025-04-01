document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація слайдера
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideWidth = 100; // у відсотках
    
    // Створення точок навігації
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Встановлення активного класу для першого слайду
    slides[0].classList.add('active');
    
    // Функція для переходу до конкретного слайду
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        
        // Видалення активного класу з усіх слайдів і додавання до поточного
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
        slides[slideIndex].classList.add('active');
        
        sliderWrapper.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
        currentSlide = slideIndex;
        
        // Оновлення активної точки
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Обробники подій для кнопок
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    // Додавання можливості використання клавіатури для навігації
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Ініціалізація першого слайду
    goToSlide(0);
}); 