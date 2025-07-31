export function showFormError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);

    if (input) {
        input.classList.add('input-error'); // optional class for styling (e.g., red border)
        input.style.border = '1px solid #e74c3c';
    }

    if (error) {
        error.textContent = message;
        error.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 4px;
            display: block;
        `;
    }
}

export function clearFormError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);

    if (input) {
        input.classList.remove('input-error');
        input.style.border = '';
    }

    if (error) {
        error.textContent = '';
    }
}

        export function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        export function validatePassword(password) {
            return password.length >= 6;
        }

        // export function validationError(fieldId, message) {
        //     document.getElementById(fieldId + 'Error').textContent = message;
        // }

        // export function clearValidationError(fieldId) {
        //     document.getElementById(fieldId + 'Error').textContent = '';
        // }