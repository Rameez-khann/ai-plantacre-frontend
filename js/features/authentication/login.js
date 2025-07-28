
import { showAlert } from "../../shared/alerts.js";
import { validatePassword, validateEmail, showFormError, clearFormError } from "../../shared/forms.js";
import { showLoading } from "./auth.js";

// Navbar

        // Main app logic
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            clearFormError('email');
            clearFormError('password');

            if (!validateEmail(email)) {
                showFormError('email', 'Invalid email');
                return;
            }

            if (!validatePassword(password)) {
                showFormError('password', 'Password too short');
                return;
            }

            showLoading(true);

            try {
                const result = await login(email, password);
                setToken(result.token);
                showAlert('Login successful!','success');
                // window.location.href = 'dashboard.html';
            } catch (error) {
                showFormError('password', error.message);
                showAlert('Login failed', 'error');
            } finally {
                showLoading(false);
            }
        });
