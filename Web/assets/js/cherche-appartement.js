// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Animation on scroll effect for sections
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animated');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation check on page load
    animateOnScroll();
    
    // Hero section parallax effect
    const heroBg = document.querySelector('.cherche-hero .hero-bg-image');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Parallax effect - move background slower than scroll
            heroBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }
    
    // Testimonials Slider Functionality
    function initTestimonialsSlider() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const dotsContainer = document.querySelector('.testimonial-dots');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        // Current slide index
        let currentIndex = 0;
        
        // Create dots for each testimonial
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Show first testimonial
        if (testimonialItems.length > 0) {
            testimonialItems[0].classList.add('active');
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            // Handle circular navigation
            if (index < 0) {
                index = testimonialItems.length - 1;
            } else if (index >= testimonialItems.length) {
                index = 0;
            }
            
            // Hide current slide
            testimonialItems[currentIndex].classList.remove('active');
            
            // Update dots
            const dots = document.querySelectorAll('.testimonial-dot');
            dots[currentIndex].classList.remove('active');
            dots[index].classList.add('active');
            
            // Show new slide
            testimonialItems[index].classList.add('active');
            
            // Update current index
            currentIndex = index;
        }
        
        // Auto slide change
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 6000);
    }
    
    // Animation for link items on hover
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
});