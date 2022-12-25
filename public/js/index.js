import '@babel/polyfill';
import { login } from './login';

// Dom elements
const loginForm = document.querySelector('.form');

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
