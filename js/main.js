document.addEventListener("DOMContentLoaded", function () {
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {});
    }

    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    const close = document.querySelector('.m-close');
    const body = document.body;

    burger.addEventListener('click', () => {
        burger.classList.add('active');
        menu.classList.add('active');
        body.classList.add('no-scroll');
    });
    close.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('no-scroll');
    })

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    if(document.querySelector('.baza')) {
        const bazaSlider = new Swiper('.baza-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            speed: 700,
            
            navigation: {
                nextEl: '.baza-btn-next',
                prevEl: '.baza-btn-prev',
            },
            
            pagination: {
                el: '.baza-pagination',
                clickable: true,
            },
        });
    }

    // 1. ОБЫЧНЫЕ СЕКЦИИ .invest (исключаем .invest--two, чтобы избежать конфликтов)
    const regularInvestSections = document.querySelectorAll('.invest:not(.invest--two)');
    if (regularInvestSections.length > 0) {
        regularInvestSections.forEach(section => {
            const investItems = section.querySelectorAll('.invest-item');

            investItems.forEach(item => {
                const sliderEl = item.querySelector('.invest-slider');
                const prevBtn = item.querySelector('.invest-btn-prev');
                const nextBtn = item.querySelector('.invest-btn-next');

                if (sliderEl) {
                    new Swiper(sliderEl, {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: true,
                        speed: 700,
                        navigation: {
                            nextEl: nextBtn,
                            prevEl: prevBtn,
                        },
                    });
                }
            });
        });
    }

    // 2. СПЕЦИАЛЬНАЯ СЕКЦИЯ С ТАБАМИ .invest--two
    const investTwoSection = document.querySelector('.invest.invest--two');
    if (investTwoSection) {
        const swiperInstances = [];

        function initSliders() {
            // Ищем слайдеры строго внутри этой секции
            investTwoSection.querySelectorAll('.invest-slider').forEach((sliderEl, index) => {
                const parentCard = sliderEl.closest('.invest-tab-content');
                if (!parentCard) return; // Предотвращает ошибки, если структура отличается

                const btnNext = parentCard.querySelector('.invest-btn-next');
                const btnPrev = parentCard.querySelector('.invest-btn-prev');

                const swiper = new Swiper(sliderEl, {
                    slidesPerView: 1,
                    loop: true,
                    speed: 700,
                    navigation: {
                        nextEl: btnNext,
                        prevEl: btnPrev,
                    },
                    observer: true,
                    observeParents: true,
                });
                swiperInstances[index] = swiper;
            });
        }

        initSliders();

        // Логика переключения табов
        const triggers = investTwoSection.querySelectorAll('.invest-tab-trigger');
        const contents = investTwoSection.querySelectorAll('.invest-tab-content');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.getAttribute('data-tab-trigger');

                // Убираем активные классы со всех триггеров внутри этой секции
                triggers.forEach(t => t.classList.remove('is-active'));
                trigger.classList.add('is-active');

                // Переключаем контентную часть
                contents.forEach(content => {
                    const contentId = content.getAttribute('data-tab-content');
                    if (contentId === targetId) {
                        content.classList.add('is-active');
                        
                        // Обновляем Swiper внутри показанного таба
                        const swiperEl = content.querySelector('.swiper');
                        if (swiperEl && swiperEl.swiper) {
                            swiperEl.swiper.update();
                        }
                    } else {
                        content.classList.remove('is-active');
                    }
                });
            });
        });
    }


    document.querySelectorAll('.format .invest-item').forEach(item => {

        const slider = item.querySelector('.invest-slider');
        const prevBtn = item.querySelector('.invest-btn-prev');
        const nextBtn = item.querySelector('.invest-btn-next');
    
        if (!slider) return;
    
        new Swiper(slider, {
            slidesPerView: 1,
            loop: true,
            speed: 700,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            observer: true,
            observeParents: true,
        });
    
    });


    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {

        tab.addEventListener('shown.bs.tab', function () {
    
            document.querySelectorAll('.format .swiper').forEach(swiperEl => {
                if (swiperEl.swiper) {
                    swiperEl.swiper.update();
                }
            });
    
        });
    
    });

});