     const services = [
            {
                id: 1,
                title: 'Plumbing Services',
                description: 'Our plumbers are ready to go 24/7 for emergencies - including nights, weekends, and holidays.',
                image: 'https://img.icons8.com/?size=100&id=66406&format=png&color=2a1768',
            },
            {
                id: 2,
                title: 'Installation Services',
                description: 'Professional installation services for plumbing fixtures and systems.',
                image: 'https://img.icons8.com/?size=100&id=11151&format=png&color=2a1768',
            },
            {
                id: 3,
                title: 'Specialized Plumbing Services',
                description: 'Tailored solutions for unique plumbing challenges.',
                image: 'https://img.icons8.com/?size=100&id=S0nuGyUk3Uap&format=png&color=2a1768',
            },
            {
                id: 4,
                title: 'Residential Services',
                description: 'Comprehensive plumbing solutions for homes.',
                image: 'https://img.icons8.com/?size=100&id=z2kaqounQOlS&format=png&color=2a1768',
            },
            {
                id: 5,
                title: 'Commercial Plumbing Services',
                description: 'Expert plumbing solutions for businesses and commercial properties.',
                image: 'https://img.icons8.com/?size=100&id=8077&format=png&color=2a1768',
            },
            {
                id: 6,
                title: 'Maintenance Services',
                description: 'Regular maintenance to keep your plumbing systems in top shape.',
                image: 'https://img.icons8.com/?size=100&id=GKFN2Gk1rPIh&format=png&color=2a1768',
            },
            {
                id: 7,
                title: 'Additional Services',
                description: 'Other plumbing services tailored to meet your needs.',
                image: 'https://img.icons8.com/?size=100&id=Jyk2e0Q3Fry6&format=png&color=2a1768',
            },
            {
                id: 8,
                title: 'Customer Support Services',
                description: 'Dedicated support for all your plumbing inquiries.',
                image: 'https://img.icons8.com/?size=100&id=113139&format=png&color=2a1768',
            },
        ];

        const serviceContainer = document.querySelector('.swiper-wrapper');

        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'swiper-slide service-card bg-white text-center shadow-lg rounded-lg';

            card.innerHTML = `
                <div class="icon-wrapper relative -mt-14 mb-6 flex justify-center">
                    <div class="icon bg-white border-4" style="border-color: #2A1768 !important; padding: 1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <img src="${service.image}" alt="Icon representing ${service.title}" class="w-16 h-16">
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-2" style="font-family: 'PT Serif', serif;">${service.title}</h3>
                <p class="text-gray-600 mb-4">${service.description}</p>
                <a href="#" class="text-purple-600 font-bold uppercase text-xs">Explore This Service ></a>
            `;

            serviceContainer.appendChild(card);
        });

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 1500,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            mousewheel: {
                invert: false,
                forceToAxis: true,
                releaseOnEdges: true,
            },
            grabCursor: true,
            breakpoints: {
                640: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    autoplay: false,
                },
            },
        });
        // blog section
        class UniqueCarousel {
            constructor() {
                this.currentIndex = 0;
                this.autoSlideInterval = null;
                this.isDragging = false;
                this.startX = 0;
                this.currentX = 0;

                this.init();
            }

            init() {
                this.checkAutoSlide();
                this.showSlide(this.currentIndex);

                const carouselInner = document.querySelector('.unique-carousel-inner');
                carouselInner.addEventListener('touchstart', (e) => this.handleTouchStart(e));
                carouselInner.addEventListener('touchmove', (e) => this.handleTouchMove(e));
                carouselInner.addEventListener('touchend', () => this.handleTouchEnd());
                carouselInner.addEventListener('mousedown', (e) => this.handleTouchStart(e));
                carouselInner.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                carouselInner.addEventListener('mouseup', () => this.handleTouchEnd());
                carouselInner.addEventListener('mouseleave', () => this.handleTouchEnd());
            }

            toggleLike(button) {
                const heartIcon = button.querySelector('.heart-icon');
                const likeCount = button.querySelector('.like-count');
                let count = parseInt(likeCount.textContent);

                if (heartIcon.textContent === 'favorite_border') {
                    heartIcon.textContent = 'favorite';
                    heartIcon.classList.add('text-red-500');
                    likeCount.textContent = count + 1;
                } else {
                    heartIcon.textContent = 'favorite_border';
                    heartIcon.classList.remove('text-red-500');
                    likeCount.textContent = count - 1;
                }
            }

            showSlide(index) {
                const items = document.querySelectorAll('.unique-carousel-item');
                const totalItems = items.length;

                this.currentIndex = (index + totalItems) % totalItems;
                const offset = -this.currentIndex * items[0].clientWidth;

                document.querySelector('.unique-carousel-inner').style.transform = `translateX(${offset}px)`;

                clearInterval(this.autoSlideInterval);
                this.checkAutoSlide();
            }

            checkAutoSlide() {
                const items = document.querySelectorAll('.unique-carousel-item');
                const carouselWidth = document.querySelector('.unique-carousel-inner').offsetWidth;
                const itemWidth = items[0].offsetWidth;

                const visibleItems = Math.floor(carouselWidth / itemWidth);

                if (visibleItems <= 2) {
                    this.autoSlideInterval = setInterval(() => {
                        this.showSlide(this.currentIndex + 1);
                    }, 3000);
                }
            }

            handleTouchStart(e) {
                this.isDragging = true;
                this.startX = e.pageX || e.touches[0].pageX;
                clearInterval(this.autoSlideInterval);
            }

            handleTouchMove(e) {
                if (!this.isDragging) return;

                const currentX = e.pageX || e.touches[0].pageX;
                const deltaX = currentX - this.startX;
                const carouselInner = document.querySelector('.unique-carousel-inner');
                carouselInner.style.transform = `translateX(${deltaX}px)`;
            }

            handleMouseMove(e) {
                if (e.buttons === 0) this.handleTouchEnd();
                else this.handleTouchMove(e);
            }

            handleTouchEnd() {
                this.isDragging = false;
                this.showSlide(this.currentIndex);
            }
        }

        const carousel = new UniqueCarousel();
//    FAQ section
function toggleFAQ(faqId) {
    const content = document.getElementById(faqId);
    const icon = document.getElementById('icon-' + faqId);
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// FAQ ENDS
