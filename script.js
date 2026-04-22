// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        // Toggle active class on header
        header.classList.toggle('active');
        
        // Get the content element
        const content = header.nextElementSibling;
        
        // Toggle max-height for animation
        if (header.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
        
        // Optional: Close other accordions when one is opened
        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header && otherHeader.classList.contains('active')) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = '0';
            }
        });
    });
});

// Simple Intersection Observer for animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.querySelectorAll('.section-title, .card, .feature-item, .mentor-content').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
