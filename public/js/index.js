import '@babel/polyfill';
import { login, logout } from './login';

// Dom elements
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

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

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
