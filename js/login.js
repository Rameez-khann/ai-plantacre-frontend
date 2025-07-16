// Simple login form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    form.addEventListener('submit', handleSubmit);

    async function handleSubmit(e) {
        e.preventDefault();

        // Simple validation
        if (!validateForm()) {
            return;
        }

        // Show loading state
        setLoading(true);

        try {
            // Simulate API call
            await simulateLogin();
            
            // Show success and redirect
            showNotification('Welcome back! Redirecting...', 'success');
            
            // Simulate redirect after success
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
            
        } catch (error) {
            showNotification('Invalid email or password. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    }

    function validateForm() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Clear previous errors
        clearErrors();

        let isValid = true;

        if (!email || !isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }

        if (!password || password.length < 6) {
            showFieldError('password', 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        
        // Remove error styling after user starts typing
        field.addEventListener('input', function() {
            field.classList.remove('error');
        }, { once: true });
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
    }

    function setLoading(isLoading) {
        if (isLoading) {
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-block';
            form.querySelector('button').disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';
            form.querySelector('button').disabled = false;
        }
    }

    function simulateLogin() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 80% success rate
                if (Math.random() < 0.8) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : 'var(--primary-green)'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px var(--shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);