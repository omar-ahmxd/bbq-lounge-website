// Loading Screen with smooth transition
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX - 15 + 'px';
        follower.style.top = e.clientY - 15 + 'px';
    }, 100);
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .menu-item, .gallery-item');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
    });
});

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
let lastScroll = 0;

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Category Switching
const menuCategories = document.querySelectorAll('.menu-category');
const menuSections = document.querySelectorAll('.menu-section');

menuCategories.forEach(category => {
    category.addEventListener('click', () => {
        const targetCategory = category.getAttribute('data-category');
        
        // Update active category
        menuCategories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');
        
        // Update active section
        menuSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetCategory) {
                section.classList.add('active');
            }
        });
    });
});

// Parallax Effect for About Section Images (Desktop Only)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.about');
        
        if (aboutSection) {
            const sectionTop = aboutSection.offsetTop;
            const sectionHeight = aboutSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when the about section is in view
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const parallaxElements = document.querySelectorAll('.stack-image');
                const relativeScroll = scrolled - sectionTop + windowHeight;
                
                parallaxElements.forEach((element, index) => {
                    // Different speeds for each image for layered effect
                    const speeds = [0.15, 0.1, 0.12];
                    const speed = speeds[index] || 0.1;
                    const yPos = -(relativeScroll * speed);
                    const currentRotation = element.classList.contains('stack-1') ? -5 : 
                                           element.classList.contains('stack-2') ? 3 : -2;
                    element.style.transform = `translateY(${yPos}px) rotate(${currentRotation}deg)`;
                });
            }
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-content, .menu-item, .gallery-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form Handling
const reservationForm = document.getElementById('reservationForm');

// Auto-focus effect for form inputs
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Reservation form submission
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value
    };
    
    // Show success message (in production, this would send to a server)
    alert('Thank you for your reservation! We will confirm your booking shortly.');
    reservationForm.reset();
});

// Gallery hover effect enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.transform = `scale(1.05) rotateX(${(y - rect.height / 2) / 20}deg) rotateY(${(x - rect.width / 2) / 20}deg)`;
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.querySelector('.footer-copyright p').innerHTML = `&copy; ${currentYear} The Barbeque Lounge. All rights reserved.`;

// Scroll-triggered counter animation for stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Video optimization for mobile
const heroVideo = document.querySelector('.hero-video');
if (window.innerWidth <= 768) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.poster = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200';
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Menu item hover sound effect (optional - requires audio file)
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Add subtle hover animation
        item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Set minimum date for reservation to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);