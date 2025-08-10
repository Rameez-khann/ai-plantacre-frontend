
import { showAlert } from "../../core/alerts.js";
import { validatePassword, validateEmail, showFormError, clearFormError } from "../../core/forms.js";
import { postRequest } from "../../core/requests.js";
import { saveUser, showLoading } from "./auth.js";

// Navbar

        // Main app logic
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            clearFormError('username');
            clearFormError('password');

            // if (!validateEmail(email)) {
            //     showFormError('email', 'Invalid email');
            //     return;
            // }

            if (!validatePassword(password)) {
                showFormError('password', 'Password too short');
                return;
            }

            showLoading(true);

            try {
                  const result =await postRequest('/login',{username, password});
                
if(result?.errorMessage){
    showAlert(result.errorMessage,'error')
}

            if(result?.user){
                showAlert('Login Successful', 'success');

            saveUser(result.user);

                window.location.href = 'dashboard.html';
            } 

                // window.location.href = 'dashboard.html';
            } catch (error) {
                console.log(error);
                
                showFormError('password', error.message);
                showAlert('Login failed', 'error');
            } finally {
                showLoading(false);
            }
        });
