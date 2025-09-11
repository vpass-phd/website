// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create email body
        const emailBody = `Hello V-PASS team,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Best regards,
${name}`;
        
        // Create mailto link
        const mailtoLink = `mailto:vpass-phd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client should open with the message ready to send.');
        
        // Reset form
        this.reset();
    });
}

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .feature-item, .team-member, .mentee-card, .alumni-card, .achievement-card, .funding-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Progress bar animation for expenditure
const expenditureBars = document.querySelectorAll('.expenditure-fill');
expenditureBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
        bar.style.width = width;
    }, 500);
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Animate statistics when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(element, number);
                statObserver.unobserve(element);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Back to top functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #991b1b;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(153, 27, 27, 0.3);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = '#7f1d1d';
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = '#991b1b';
    backToTopBtn.style.transform = 'scale(1)';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page with fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.team-member, .mentee-card, .alumni-card, .achievement-card, .funding-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.borderColor = '#991b1b';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = '#450a0a';
        });
    });
});

// Add search functionality (if needed)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 8px 12px;
        border: 1px solid #450a0a;
        border-radius: 20px;
        font-size: 14px;
        z-index: 999;
        background: #1a0a0a;
        color: #fca5a5;
    `;
    
    document.body.appendChild(searchInput);
}

// Initialize search if needed
// addSearchFunctionality();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for navigation
            console.log('Swiped left');
        } else {
            // Swipe right - could be used for navigation
            console.log('Swiped right');
        }
    }
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300/450a0a/fca5a5?text=Image+Not+Found';
        });
    });
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #991b1b;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
});

// Mentor Guide Dropdown Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mentorGuideToggle = document.getElementById('mentorGuideToggle');
    const mentorGuideContent = document.getElementById('mentorGuideContent');
    
    if (mentorGuideToggle && mentorGuideContent) {
        mentorGuideToggle.addEventListener('click', () => {
            mentorGuideToggle.classList.toggle('active');
            mentorGuideContent.classList.toggle('active');
            
            // Smooth scroll to dropdown if it's opening
            if (mentorGuideContent.classList.contains('active')) {
                setTimeout(() => {
                    mentorGuideToggle.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!mentorGuideToggle.contains(e.target) && !mentorGuideContent.contains(e.target)) {
                mentorGuideToggle.classList.remove('active');
                mentorGuideContent.classList.remove('active');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mentorGuideContent.classList.contains('active')) {
                mentorGuideToggle.classList.remove('active');
                mentorGuideContent.classList.remove('active');
            }
        });
    }
});

// Mentee Guide Dropdown Functionality
document.addEventListener('DOMContentLoaded', () => {
    const menteeGuideToggle = document.getElementById('menteeGuideToggle');
    const menteeGuideContent = document.getElementById('menteeGuideContent');
    
    console.log('Mentee dropdown elements found:', {
        toggle: menteeGuideToggle,
        content: menteeGuideContent
    });
    
    if (menteeGuideToggle && menteeGuideContent) {
        menteeGuideToggle.addEventListener('click', () => {
            console.log('Mentee dropdown toggle clicked');
            menteeGuideToggle.classList.toggle('active');
            menteeGuideContent.classList.toggle('active');
            
            console.log('Dropdown state:', {
                toggleActive: menteeGuideToggle.classList.contains('active'),
                contentActive: menteeGuideContent.classList.contains('active')
            });
            
            // Smooth scroll to dropdown if it's opening
            if (menteeGuideContent.classList.contains('active')) {
                setTimeout(() => {
                    menteeGuideToggle.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!menteeGuideToggle.contains(e.target) && !menteeGuideContent.contains(e.target)) {
                menteeGuideToggle.classList.remove('active');
                menteeGuideContent.classList.remove('active');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menteeGuideContent.classList.contains('active')) {
                menteeGuideToggle.classList.remove('active');
                menteeGuideContent.classList.remove('active');
            }
        });
    } else {
        console.error('Mentee dropdown elements not found!');
    }
});

// Guidelines Dropdown Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Function to create dropdown functionality
    function createDropdown(toggleId, contentId) {
        const toggle = document.getElementById(toggleId);
        const content = document.getElementById(contentId);
        
        if (toggle && content) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                content.classList.toggle('active');
                
                // Smooth scroll to dropdown if it's opening
                if (content.classList.contains('active')) {
                    setTimeout(() => {
                        toggle.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !content.contains(e.target)) {
                    toggle.classList.remove('active');
                    content.classList.remove('active');
                }
            });
            
            // Close dropdown on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && content.classList.contains('active')) {
                    toggle.classList.remove('active');
                    content.classList.remove('active');
                }
            });
        }
    }
    
    // Create dropdowns for each guideline section
    createDropdown('generalInfoToggle', 'generalInfoContent');
    createDropdown('howItWorksToggle', 'howItWorksContent');
    createDropdown('yearlyCheckToggle', 'yearlyCheckContent');
    createDropdown('financialToggle', 'financialContent');
});

console.log('Website loaded successfully! 🚀');

// Additional debugging for dropdown
setTimeout(() => {
    const toggle = document.getElementById('menteeGuideToggle');
    const content = document.getElementById('menteeGuideContent');
    console.log('Dropdown elements after timeout:', { toggle, content });
    
    if (toggle) {
        console.log('Toggle element styles:', window.getComputedStyle(toggle));
    }
    if (content) {
        console.log('Content element styles:', window.getComputedStyle(content));
    }
}, 1000); 