// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation background change on scroll with blur effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(45, 106, 79, 0.85)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.backgroundColor = 'rgba(45, 106, 79, 0.95)';
            nav.style.backdropFilter = 'none';
        }
    });

    // Add animation classes to elements when they come into view
    const animateOnScroll = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                entry.target.classList.add(entry.target.dataset.animation);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.dataset.animation = 'animate__fadeInUp';
        observer.observe(card);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.dataset.animation = 'animate__fadeIn';
        observer.observe(item);
    });

    // Add sparkle effect to service icons
    const addSparkleEffect = (element) => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    };

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const interval = setInterval(() => {
                addSparkleEffect(this);
            }, 200);
            
            card.addEventListener('mouseleave', () => {
                clearInterval(interval);
            }, { once: true });
        });
    });

    // Form submission handling with animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate submit button
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get form data
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };

            // Simulate sending (you would typically send this data to a server)
            setTimeout(() => {
                console.log('Form submitted:', formData);
                
                // Show success message with animation
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message animate__animated animate__fadeIn';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We\'ll get back to you soon.';
                successMessage.style.color = '#4CAF50';
                successMessage.style.marginTop = '1rem';
                successMessage.style.textAlign = 'center';
                
                this.appendChild(successMessage);
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = 'Send Message';
                    submitButton.style.backgroundColor = '';
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
    }

    // Add hover effect to gallery images
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Image loading animation
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Modal Gallery Functions
function openModal() {
    document.getElementById('galleryModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling of background
}

function closeModal() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
