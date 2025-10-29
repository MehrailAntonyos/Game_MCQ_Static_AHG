// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling
const appointmentForm = document.getElementById('appointmentForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            doctor: document.getElementById('doctor').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || 
            !formData.phone || !formData.department || !formData.doctor || 
            !formData.date || !formData.time) {
            alert('Please fill in all required fields');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Appointment Request:', formData);

        // Show success modal
        successModal.classList.add('active');

        // Reset form
        appointmentForm.reset();
    });
}

// Close Modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

// Close modal when clicking outside
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}

// Set minimum date for appointment to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe cards for animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Book Appointment Button Handlers
const bookAppointmentButtons = document.querySelectorAll('.btn-primary');
bookAppointmentButtons.forEach(button => {
    if (button.textContent.includes('Book Appointment')) {
        button.addEventListener('click', (e) => {
            // Don't prevent default if it's the form submit button
            if (button.type !== 'submit') {
                e.preventDefault();
                const appointmentSection = document.getElementById('appointment');
                if (appointmentSection) {
                    const headerOffset = 80;
                    const elementPosition = appointmentSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Focus on first input after scrolling
                    setTimeout(() => {
                        document.getElementById('firstName').focus();
                    }, 800);
                }
            }
        });
    }
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.style.color = 'var(--primary)';
        } else if (navLink) {
            navLink.style.color = 'var(--gray-900)';
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Console message
console.log('%c🏥 CareCenter Hospital Website', 'color: #030213; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript', 'color: #717182; font-size: 14px;');
console.log('%c\nThis is a demo website. In a production environment, form submissions would be sent to a backend server.', 'color: #4b5563; font-size: 12px;');
