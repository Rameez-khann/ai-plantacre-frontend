       
       // validation.js - exportable functions
        export function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        export function validatePassword(password) {
            return password.length >= 6;
        }

        export function showError(fieldId, message) {
            document.getElementById(fieldId + 'Error').textContent = message;
        }

        export function clearError(fieldId) {
            document.getElementById(fieldId + 'Error').textContent = '';
        }

        // auth.js - exportable functions
        export async function login(email, password) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email === 'admin@test.com' && password === 'password') {
                        resolve({ success: true, token: 'fake-token' });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                }, 1500);
            });
        }

        export function setToken(token) {
            sessionStorage.setItem('token', token);
        }

        export function getToken() {
            return sessionStorage.getItem('token');
        }

        // ui.js - exportable functions
        export function showLoading(show = true) {
            document.getElementById('btnText').style.display = show ? 'none' : 'inline';
            document.getElementById('btnLoading').style.display = show ? 'inline' : 'none';
            document.getElementById('loginBtn').disabled = show;
        }

        export function showNotification(message, type = 'success') {
            const div = document.createElement('div');
            div.textContent = message;
            div.style.cssText = `
                position: fixed; top: 20px; right: 20px; padding: 15px;
                background: ${type === 'success' ? 'var(--accent-green)' : '#e74c3c'};
                color: white; border-radius: var(--border-radius); z-index: 1000;
            `;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 3000);
        }
