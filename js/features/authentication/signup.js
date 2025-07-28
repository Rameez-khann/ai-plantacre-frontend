import { showAlert } from "../../core/alerts.js";
import { clearFormError, showFormError } from "../../core/forms.js";
import { showLoading } from "./auth.js";


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
    // fake signup logic
    const fakeResponse = await new Promise((res) => setTimeout(() => res({ success: true }), 1000));

    if (fakeResponse.success) {
      showAlert('Signup successful!');
      // window.location.href = 'dashboard.html';
    } else {
      showAlert('Signup failed', 'error');
    }
  } catch (err) {
    showAlert('Signup error', 'error');
  } finally {
    showLoading(false);
  }
});
