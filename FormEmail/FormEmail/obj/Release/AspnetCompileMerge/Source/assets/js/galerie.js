// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    
                    // Add animation for visible items
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                }
            });
        });
    });
    
    // Gallery Modal Functionality
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.gallery-modal-img');
    const modalCaption = document.querySelector('.gallery-modal-caption');
    const modalClose = document.querySelector('.gallery-modal-close');
    const modalPrev = document.querySelector('.gallery-modal-prev');
    const modalNext = document.querySelector('.gallery-modal-next');
    const viewButtons = document.querySelectorAll('.gallery-view-btn');
    
    // Variables pour stocker l'index et les données des images
    let currentIndex = 0;
    let galleryImages = [];
    
    // Collecter toutes les images et leurs titres
    function collectGalleryImages() {
        galleryImages = [];
        const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        
        visibleItems.forEach(item => {
            const viewBtn = item.querySelector('.gallery-view-btn');
            if (viewBtn) {
                galleryImages.push({
                    src: viewBtn.getAttribute('data-img'),
                    title: viewBtn.getAttribute('data-title')
                });
            }
        });
    }
    
    // Mettre à jour l'image du modal
    function updateModalImage() {
        modalImg.src = galleryImages[currentIndex].src;
        modalImg.alt = galleryImages[currentIndex].title;
        modalCaption.textContent = galleryImages[currentIndex].title;
        
        // Animation simple de transition
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.style.opacity = '1';
        }, 50);
    }
    
    // Open modal when view button is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Collecter les images de la galerie
            collectGalleryImages();
            
            // Trouver l'index de l'image actuelle
            const imgSrc = this.getAttribute('data-img');
            currentIndex = galleryImages.findIndex(img => img.src === imgSrc);
            
            // Mettre à jour le modal
            updateModalImage();
            
            // Show modal with fade-in effect
            modal.classList.add('show');
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Navigation to previous image
    modalPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    });
    
    // Navigation to next image
    modalNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateModalImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateModalImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateModalImage();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Function to close the modal
    function closeModal() {
        modal.classList.remove('show');
        
        // Restore scrolling on body
        document.body.style.overflow = 'auto';
        
        // Clear modal content after transition
        setTimeout(() => {
            modalImg.src = '';
            modalCaption.textContent = '';
        }, 300);
    }
    
    // Gallery Lazy Loading for Performance
    const lazyLoadImages = function() {
        const images = document.querySelectorAll('.gallery-image img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // Trigger loading if 'loading="lazy"' is not supported
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    
    // Run lazy loading
    lazyLoadImages();
});