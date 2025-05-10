const USER_KEY = 'gameUsers';
const LOGGED_IN_KEY = 'loggedInUser';

// Fungsi untuk menampilkan pesan
function showMessage(container, message, isSuccess) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${isSuccess ? 'alert-success' : 'alert-error'}`;
    messageDiv.textContent = message;

    // Temukan container yang tepat
    const formContainer = document.querySelector(container === 'register' ? '.game-reg-container' : '.game-login-container');
    const existingAlert = formContainer.querySelector('.alert');

    if (existingAlert) {
        formContainer.removeChild(existingAlert);
    }

    formContainer.insertBefore(messageDiv, formContainer.firstChild);

    // Hilangkan setelah 3 detik
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Handle Registrasi
function setupRegistration() {
    const regForm = document.getElementById('registrationForm');
    if (!regForm) return;

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById('name').value.trim(),
            username: document.getElementById('username').value.trim(),
            email: document.getElementById('email').value.trim(),
            whatsapp: document.getElementById('whatsapp').value.trim(),
            password: document.getElementById('password').value,
            createdAt: new Date().toISOString()
        };

        // Validasi
        if (userData.password !== document.getElementById('confirm-password').value) {
            showMessage('register', 'Passwords do not match!', false);
            return;
        }

        // Simpan data
        const existingUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];

        if (existingUsers.some(user => user.username === userData.username)) {
            showMessage('register', 'Username already exists!', false);
            return;
        }

        existingUsers.push(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(existingUsers));

        // Tampilkan notifikasi dan reset form
        showMessage('register', 'Registration successful! Please login.', true);
        regForm.reset();

        // Verifikasi penyimpanan
        console.log('Data tersimpan:', JSON.parse(localStorage.getItem(USER_KEY)));
    });
}

// Handle Login
function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        // Cek data user
        const existingUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
        const user = existingUsers.find(u => u.username === username);

        if (!user) {
            showMessage('login', 'Username not found!', false);
            return;
        }

        if (user.password !== password) {
            showMessage('login', 'Incorrect password!', false);
            return;
        }

        // Login sukses
        showMessage('login', 'Login successful! Redirecting...', true);

        // Simpan session
        const sessionData = {
            username: username,
            lastLogin: new Date().toISOString()
        };

        if (rememberMe) {
            localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem(LOGGED_IN_KEY, JSON.stringify(sessionData));
        }

        // Redirect ke index.html setelah 1.5 detik
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

// Cek jika sudah login
function checkLoggedIn() {
    const savedUser = localStorage.getItem(LOGGED_IN_KEY) || sessionStorage.getItem(LOGGED_IN_KEY);
    if (savedUser) {
        window.location.href = 'index.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    checkLoggedIn();
    setupRegistration();
    setupLogin();

    // Debug: Tampilkan data di console
    console.log('Registered Users:', JSON.parse(localStorage.getItem(USER_KEY)) || 'Tidak ada data');
    console.log('Logged In User:', JSON.parse(localStorage.getItem(LOGGED_IN_KEY)) || JSON.parse(sessionStorage.getItem(LOGGED_IN_KEY)) || 'Belum login');
});