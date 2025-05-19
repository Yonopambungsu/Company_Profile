// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Toggle animation for the menu button
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default behavior
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');

            // If the target is just "#", scroll to top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);

            // If the target element exists, scroll to it
            if (targetElement) {
                // Calculate position accounting for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // Scroll to the target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');

                    // Reset menu button
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
    
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

      // Referencia al botón
      const loi25Button = document.getElementById('loi25-button');
    
      if (loi25Button) {
          // Agregar event listener para el clic
          loi25Button.addEventListener('click', function(e) {
              e.preventDefault();
              // Abrir el PDF en una nueva pestaña
              window.open('https://www.gestion1984.com/mediatask/dump/pdf/loi-25---texte---gestion-1984.pdf', '_blank');
          });
          
          // Agregar soporte para teclado (accesibilidad)
          loi25Button.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open('https://www.gestion1984.com/mediatask/dump/pdf/loi-25---texte---gestion-1984.pdf', '_blank');
              }
          });
      }
});