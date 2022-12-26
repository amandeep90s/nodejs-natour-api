import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// Dom elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUserDataForm = document.querySelector('.form-user-data');
const updateUserPassForm = document.querySelector('.form-user-settings');

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
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });
}

if (updateUserPassForm) {
  updateUserPassForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Values
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    document.querySelector('.btn--save-password')?.textContent = 'Updating...';
    
    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
    
    document.querySelector('.btn--save-password')?.textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
