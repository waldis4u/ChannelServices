// Mobile Navigation Toggle
document.querySelector('.mobile-toggle').addEventListener('click', function() {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('show');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Testimonial Rating
const stars = document.querySelectorAll('.stars i');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));

        // Reset all stars
        stars.forEach(s => {
            s.classList.remove('fas', 'active');
            s.classList.add('far');
        });

        // Fill stars up to the clicked rating
        for (let i = 0; i < rating; i++) {
            stars[i].classList.remove('far');
            stars[i].classList.add('fas', 'active');
        }
    });
});

// Service Modal
const serviceButtons = document.querySelectorAll('.btn-service');
const modal = document.getElementById('serviceModal');
const closeModal = document.querySelector('.close-modal');

serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        loadServiceDetails(service);
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function loadServiceDetails(service) {
    const modalBody = document.querySelector('.modal-body');

    // Service details data (in real app, this would come from backend)
    const services = {
        wiring: {
            title: "General Electrical Wiring",
            description: "Comprehensive wiring solutions for all property types with certified safety standards.",
            benefits: [
                "Residential, commercial, and industrial wiring",
                "Complete home rewiring services",
                "Electrical panel upgrades",
                "Code compliance inspections",
                "Safety switch installations"
            ],
            image: "https://via.placeholder.com/400x300?text=Wiring+Service"
        },
        // Add other services similarly
    };

    const serviceData = services[service];

    modalBody.innerHTML = `
        <div class="service-detail">
            <div>
                <img src="${serviceData.image}" alt="${serviceData.title}">
            </div>
            <div>
                <h2>${serviceData.title}</h2>
                <p>${serviceData.description}</p>
                <h3>Key Benefits:</h3>
                <ul class="service-benefits">
                    ${serviceData.benefits.map(benefit =>
                        `<li><i class="fas fa-check-circle"></i> ${benefit}</li>`
                    ).join('')}
                </ul>
                <a href="#contact" class="btn-primary">Book This Service</a>
            </div>
        </div>
    `;
}

// Form Submissions
document.getElementById('testimonialForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your testimonial! We appreciate your feedback.');
    this.reset();
    // Reset stars
    stars.forEach(star => {
        star.classList.remove('fas', 'active');
        star.classList.add('far');
    });
});

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! Our team will contact you shortly.');
    this.reset();
});

document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter.`);
    this.reset();
});

// Initialize animations when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card, .faq-item').forEach(el => {
    observer.observe(el);
});
