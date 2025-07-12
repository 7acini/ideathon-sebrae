// Main Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero Carousel
    const carousel = document.querySelector('.carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const indicators = carousel.querySelectorAll('.carousel-indicators span');
    
    let currentIndex = 0;
    const itemCount = items.length;
    
    function updateCarousel() {
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-advance
    let interval = setInterval(nextSlide, 5000);
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });
    
    // Food Slider
    const foodSlider = document.querySelector('.food-slider');
    const foodImages = foodSlider.querySelectorAll('img');
    const foodIndicators = document.querySelectorAll('.food-slider-nav span');
    let foodCurrentIndex = 0;
    
    function updateFoodSlider() {
        foodImages.forEach((img, index) => {
            img.classList.toggle('active', index === foodCurrentIndex);
        });
        
        foodIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === foodCurrentIndex);
        });
    }
    
    foodIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            foodCurrentIndex = index;
            updateFoodSlider();
        });
    });
    
    // Auto-advance food slider
    setInterval(() => {
        foodCurrentIndex = (foodCurrentIndex + 1) % foodImages.length;
        updateFoodSlider();
    }, 3000);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});