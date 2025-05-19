// Appartements Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll effect for cards
    const animateOnScroll = function() {
        const appartementCards = document.querySelectorAll('.appartement-card');
        const lienItems = document.querySelectorAll('.lien-item');
        
        // Function to check if element is in viewport
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        };
        
        // Animate appartement cards
        appartementCards.forEach((card, index) => {
            if (isInViewport(card)) {
                // Add staggered delay for each card
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
        
        // Animate lien items
        lienItems.forEach((item, index) => {
            if (isInViewport(item)) {
                // Add staggered delay for each link item
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Initial setup for animations
    const setupAnimations = function() {
        const appartementCards = document.querySelectorAll('.appartement-card');
        const lienItems = document.querySelectorAll('.lien-item');
        
        // Set initial styles for appartement cards
        appartementCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Set initial styles for lien items
        lienItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    };
    
    // Run setup on page load
    setupAnimations();
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation check on page load (after a slight delay)
    setTimeout(animateOnScroll, 500);
    
    // Hero section parallax effect
    const heroBg = document.querySelector('.appartements-hero .hero-bg-image');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Parallax effect - move background slower than scroll
            heroBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }
});