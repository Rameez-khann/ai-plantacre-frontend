import { showAlert } from "../../core/alerts.js";
import { clearFormError, showFormError } from "../../core/forms.js";
import { postRequest } from "../../core/requests.js";
import { saveUser, showLoading } from "./auth.js";


document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('signupPassword').value;

  clearFormError('firstName');
  clearFormError('lastName');
  clearFormError('username');
  clearFormError('signupPassword');

  let valid = true;

  if (firstName.length < 2) {
    showFormError('firstName', 'First name is too short');
    valid = false;
  }

  if (lastName.length < 2) {
    showFormError('lastName', 'Last name is too short');
    valid = false;
  }

  if (username.length < 4) {
    showFormError('username', 'Username must be at least 4 characters');
    valid = false;
  }

  if (password.length < 6) {
    showFormError('signupPassword', 'Password must be at least 6 characters');
    valid = false;
  }

  if (!valid) return;

  showLoading(true);

  try {

    const userInfo = {
      firstName,
      lastName,
      username,
      password
    }
    // fake signup logic
    // const user = await new Promise((res) => setTimeout(() => res({ success: true }), 1000));
    // const valid = await validateUser(userInfo);

    // if(!valid?.success){
    //   const message = validateUser.errorMessage || "Sign up failed";
    //   showAlert(message);
    // } else{
    //   const user = postRequest('/signup',userInfo);

    // }

      const response =await postRequest('/signup',userInfo);
console.log({response});


    if (response?.user) {
      showAlert('Signup successful!');
      saveUser(response.user)
      window.location.href = 'dashboard.html';
    } else {
      const message = response?.errorMessage||"Sign up failed"
      showAlert(message, 'error');
    }
  } catch (err) {
    showAlert('Signup error', 'error');
  } finally {
    showLoading(false);
  }
});
