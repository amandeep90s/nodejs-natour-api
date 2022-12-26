import '@babel/polyfill';
import { login, logout } from './login';
import { updateUserData } from './updateSettings';

// Dom elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUserDataForm = document.querySelector('.form-user-data');

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
    updateUserData(name, email);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
