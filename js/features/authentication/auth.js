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

        export function confirmIfPasswordsMatch(password, confirmPassword){
            return password === confirmPassword;
        }

           export function showLoading(show = true) {
            document.getElementById('btnText').style.display = show ? 'none' : 'inline';
            document.getElementById('btnLoading').style.display = show ? 'inline' : 'none';
            document.getElementById('auth-btn').disabled = show;
        }