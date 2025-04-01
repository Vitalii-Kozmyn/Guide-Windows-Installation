document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    
    let currentIndex = 0;
    let slideWidth = 0;
    
    // Створення точок переходу для слайдів
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Ініціалізація слайдера
    function initSlider() {
        slideWidth = slides[0].offsetWidth;
        slides[0].classList.add('active');
        updateSlider();
    }
    
    // Оновлення відображення слайдера
    function updateSlider() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        
        // Оновлення активних стилів
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Перехід до конкретного слайду
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlider();
    }
    
    // Перехід до наступного слайду
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Перехід до попереднього слайду
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Додавання обробників подій
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Відстеження зміни розміру вікна
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        updateSlider();
    });
    
    // Ініціалізація слайдера при завантаженні
    initSlider();
}); 