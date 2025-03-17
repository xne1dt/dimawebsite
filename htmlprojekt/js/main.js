// Утилиты
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Конфигурация
const CONFIG = {
    mobileBreakpoint: 768,
    scrollOffset: 100,
    animationDelay: 100
};

// Мобильное меню
const initMobileMenu = () => {
    const menuBtn = $('.mobile-menu-btn');
    const navLinks = $('.nav-links');
    
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
};

// Плавная прокрутка
const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = $(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Анимация при скролле
const initScrollAnimations = () => {
    const elements = $$('.animate-on-scroll');
    
    const animateElement = (element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - CONFIG.scrollOffset) {
            element.classList.add('animated');
        }
    };

    const checkAnimations = () => {
        elements.forEach(animateElement);
    };

    window.addEventListener('scroll', checkAnimations);
    checkAnimations();
};

// Валидация форм
const initFormValidation = () => {
    const forms = $$('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Здесь можно добавить отправку формы
                form.submit();
            }
        });
    });
};

// Динамическая загрузка изображений
const initLazyLoading = () => {
    const images = $$('img[data-src]');
    
    const loadImage = (image) => {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(loadImage);
    }
};

// Инициализация всех функций
const init = () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFormValidation();
    initLazyLoading();
};

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', init); 