let form = document.getElementById('form');
let email = document.getElementById('email');
let password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = validation();  // <-- use return value

    if (!isValid) {
        return;  // stop if validation fails
    }

    alert("logged successfully");
    window.location.reload();
});

function validation() {
    let success = true;
    let emailval = email.value.trim();
    let passwordval = password.value.trim();

    // email
    if (emailval === '') {
        success = false;
        setError(email, 'email is required');
    } else if (!validationEmail(emailval)) {
        success = false;
        setError(email, 'please enter the correct email');
    } else {
        setSuccess(email);
    }

    // password
    if (passwordval === '') {
        success = false;
        setError(password, 'Password is required');
    } else if (passwordval.length < 8) {
        success = false;
        setError(password, 'Password must be at least 8 characters');
    } else if (!/[a-z]/.test(passwordval)) {
        success = false;
        setError(password, 'At least one lowercase letter is required');
    } else if (!/[A-Z]/.test(passwordval)) {
        success = false;
        setError(password, 'At least one uppercase letter is required');
    } else if (!/[0-9]/.test(passwordval)) {
        success = false;
        setError(password, 'At least one number is required');
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordval)) {
        success = false;
        setError(password, 'At least one symbol is required');
    } else {
        setSuccess(password);
    }

    return success; // <-- return result to use it
}

function setError(element, message) {
    let inputGroup = element.parentElement;
    let errorElement = inputGroup.querySelector('#error');

    errorElement.innerHTML = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element) {
    let inputGroup = element.parentElement;
    let errorElement = inputGroup.querySelector('#error');

    errorElement.innerHTML = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validationEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
};
