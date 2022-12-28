import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// Dom elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUserDataForm = document.querySelector('.form-user-data');
const updateUserPassForm = document.querySelector('.form-user-settings');
const bookButton = document.querySelector('#book-tour');

// Delegation
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (updateUserDataForm) {
  updateUserDataForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Values
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (updateUserPassForm) {
  updateUserPassForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Values
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (bookButton) {
  bookButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.textContent = 'Processing...';
    const tourId = event.target.dataset.tourId;
    bookTour(tourId);
    event.target.textContent = 'Book a tour';
  });
}
