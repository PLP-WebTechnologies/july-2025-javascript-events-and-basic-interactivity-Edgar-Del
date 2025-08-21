
// This file contains all interactive functionality for the page

// Wait for the DOM to be completely loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive page loaded successfully!');
    
    // Initialize all functionalities
    initializeThemeToggle();
    initializeCounter();
    initializeFAQ();
    initializeTabs();
    initializeFormValidation();
});


function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
        
        console.log(`Theme changed to: ${newTheme}`);
    });
}

function updateThemeButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
}

function initializeCounter() {
    const counterValue = document.getElementById('counter-value');
    const decreaseBtn = document.getElementById('decrease-btn');
    const resetBtn = document.getElementById('reset-btn');
    const increaseBtn = document.getElementById('increase-btn');
    
    let count = 0;
    
    // Function to update counter display
    function updateCounter() {
        counterValue.textContent = count;
        
        // Add animation when value changes
        counterValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 200);
        
        // Change color based on value
        if (count > 0) {
            counterValue.style.color = '#27ae60'; // Green for positive values
        } else if (count < 0) {
            counterValue.style.color = '#e74c3c'; // Red for negative values
        } else {
            counterValue.style.color = '#4a90e2'; // Blue for zero
        }
    }
    
    // Event listeners for buttons
    decreaseBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        console.log(`Counter decreased to: ${count}`);
    });
    
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        console.log('Counter reset to: 0');
    });
    
    increaseBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        console.log(`Counter increased to: ${count}`);
    });
    
    // Initialize counter
    updateCounter();
}

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // Close all other questions
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.parentElement.querySelector('.faq-answer').classList.remove('active');
            });
            
            // Open/close clicked question
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
                console.log('FAQ opened:', this.textContent);
            }
        });
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove 'active' class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add 'active' class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            console.log(`Tab activated: ${targetTab}`);
        });
    });
}

//Form Validation
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    // Object to store validation errors
    let validationErrors = {};
    
    // Function to show error message
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        inputElement.classList.add('error');
        validationErrors[fieldId] = message;
    }
    
    // Function to clear error message
    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = '';
        inputElement.classList.remove('error');
        delete validationErrors[fieldId];
    }
    
    // Function to validate name
    function validateName(name) {
        if (name.trim().length < 2) {
            return 'Name must have at least 2 characters';
        }
        if (name.trim().length > 50) {
            return 'Name must have maximum 50 characters';
        }
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
            return 'Name must contain only letters and spaces';
        }
        return null;
    }
    
    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Email must have a valid format';
        }
        return null;
    }
    
    // Function to validate password
    function validatePassword(password) {
        if (password.length < 8) {
            return 'Password must have at least 8 characters';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            return 'Password must contain at least one special character (@$!%*?&)';
        }
        return null;
    }
    
    // Function to validate password confirmation
    function validateConfirmPassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return null;
    }
    
    // Function to validate phone
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            return 'Phone must have a valid format';
        }
        return null;
    }
    
    // Function to validate message
    function validateMessage(message) {
        if (message.trim().length < 10) {
            return 'Message must have at least 10 characters';
        }
        if (message.trim().length > 500) {
            return 'Message must have maximum 500 characters';
        }
        return null;
    }
    
    // Real-time validation for each field
    const fields = ['name', 'email', 'password', 'confirm-password', 'phone', 'message'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        
        // Validation on blur
        field.addEventListener('blur', function() {
            validateField(fieldId, this.value);
        });
        
        // Clear error when starting to type
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearError(fieldId);
            }
        });
    });
    
    // Function to validate a specific field
    function validateField(fieldId, value) {
        let error = null;
        
        switch (fieldId) {
            case 'name':
                error = validateName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'confirm-password':
                const password = document.getElementById('password').value;
                error = validateConfirmPassword(password, value);
                break;
            case 'phone':
                error = validatePhone(value);
                break;
            case 'message':
                error = validateMessage(value);
                break;
        }
        
        if (error) {
            showError(fieldId, error);
        } else {
            clearError(fieldId);
        }
        
        return !error;
    }
    
    // Complete form validation
    function validateForm() {
        let isValid = true;
        
        // Validate all fields
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!validateField(fieldId, field.value)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            console.log('Form valid, sending...');
            
            // Show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Clear form
            form.reset();
            
            // Remove error classes
            fields.forEach(fieldId => {
                clearError(fieldId);
            });
            
            // Reset form after 5 seconds
            setTimeout(() => {
                form.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
            
        } else {
            console.log('Form invalid, fix the errors');
            // Focus on first field with error
            const firstErrorField = Object.keys(validationErrors)[0];
            if (firstErrorField) {
                document.getElementById(firstErrorField).focus();
            }
        }
    });
}

// Function to add hover effects and animations
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .faq-question, .tab-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Function to add tactile feedback (for mobile devices)
function addTouchFeedback() {
    const touchElements = document.querySelectorAll('.btn, .faq-question, .tab-btn');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize additional effects when page is completely loaded
window.addEventListener('load', function() {
    addHoverEffects();
    addTouchFeedback();
    console.log('All interactive effects initialized!');
});

// Capture global errors and log them to console
window.addEventListener('error', function(e) {
    console.error('Error captured:', e.error);
});

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Log useful information for debugging
console.log('Development mode active');
console.log('Responsive page optimized for mobile');
console.log('Light/dark theme implemented');
console.log('Complete form validation');
console.log('All interactive functionalities loaded!');
