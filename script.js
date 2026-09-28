// Navigation Logic
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navUl = document.getElementById('navLinks');

// Toggle Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    navUl.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = [
    'Data Scientist', 
    'ML Engineer', 
    'Data Analyst'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    
    typingText.textContent = currentChar;
    
    let typeSpeed = isDeleting ? 50 : 150;
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }
    
    charIndex += isDeleting ? -1 : 1;
    setTimeout(typeEffect, typeSpeed);
}

if (typingText) typeEffect();

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for skill bars
            if (entry.target.id === 'skills') {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
// Also observe sections themselves for nav highlighting
sections.forEach(section => observer.observe(section));

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.style.background = '#10b981'; // Success color
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// Image Upload Previews (For Personalization)
function setupUploadPreview(inputId, imgId) {
    const input = document.getElementById(inputId);
    const img = document.getElementById(imgId);
    if (input && img) {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
}

setupUploadPreview('imageUpload', 'profileImage');

// Mouse Glow Effect
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Log version info
console.log('%c🚀 Haile Sintayehu Portfolio v3.1 Active', 'color: #38bdf8; font-weight: bold; font-size: 1.2rem;');

// Share Portfolio Function
function sharePortfolio() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("Portfolio link copied to clipboard! You can now share it with anyone.");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
