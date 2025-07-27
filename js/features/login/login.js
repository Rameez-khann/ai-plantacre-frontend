// import { navbar } from '../navbar/navbar.js';
import { 
    validateEmail, 
    validatePassword, 
    showError, 
    clearError, 
    login, 
    setToken, 
    showLoading, 
    showNotification 
} from './login-functions.js';

// Navbar

        // Main app logic
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            clearError('email');
            clearError('password');

            if (!validateEmail(email)) {
                showError('email', 'Invalid email');
                return;
            }

            if (!validatePassword(password)) {
                showError('password', 'Password too short');
                return;
            }

            showLoading(true);

            try {
                const result = await login(email, password);
                setToken(result.token);
                showNotification('Login successful!');
                // window.location.href = 'dashboard.html';
            } catch (error) {
                showError('password', error.message);
                showNotification('Login failed', 'error');
            } finally {
                showLoading(false);
            }
        });
