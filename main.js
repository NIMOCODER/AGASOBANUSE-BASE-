// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication state
    checkAuthState();
    
    // Setup event listeners
    setupEventListeners();
});

// Check if user is logged in
function checkAuthState() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        // User is logged in
        updateUIForLoggedInUser(localStorage.getItem('userName') || 'User');
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser(userName) {
    document.querySelectorAll('.auth-buttons').forEach(el => {
        el.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user-circle me-1"></i> ${userName}
                </button>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i> Profile</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-heart me-2"></i> Favorites</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-history me-2"></i> Watch History</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
                </ul>
            </div>
        `;
    });
    
    // Add logout event listener
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

// Setup all event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Content card hover effects
    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-overlay').style.opacity = '0';
        });
    });
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validate inputs
    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // For demo purposes, simulate successful login
    simulateLogin(email);
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgree = document.getElementById('termsAgree').checked;
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    if (!termsAgree) {
        showAlert('You must agree to the Terms of Service', 'danger');
        return;
    }
    
    // For demo purposes, simulate successful registration
    simulateRegistration(name, email);
}

// Simulate login (for demo purposes)
function simulateLogin(email) {
    // Show loading state
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Store token in localStorage
        localStorage.setItem('authToken', 'demo_token_12345');
        localStorage.setItem('userName', email.split('@')[0]);
        
        // Show success message
        showAlert('Login successful!', 'success');
        
        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        
        // Update UI for logged in user
        updateUIForLoggedInUser(email.split('@')[0]);
        
        // Reset button state
        submitBtn.innerHTML = 'Login';
        submitBtn.disabled = false;
    }, 1000);
}

// Simulate registration (for demo purposes)
function simulateRegistration(name, email) {
    // Show loading state
    const submitBtn = document.querySelector('#registerForm button[type="submit"]');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Store token in localStorage
        localStorage.setItem('authToken', 'demo_token_12345');
        localStorage.setItem('userName', name);
        
        // Show success message
        showAlert('Registration successful!', 'success');
        
        // Close modal
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();
        
        // Update UI for logged in user
        updateUIForLoggedInUser(name);
        
        // Reset button state
        submitBtn.innerHTML = 'Register';
        submitBtn.disabled = false;
    }, 1000);
}

// Handle logout
function handleLogout() {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    
    // Show success message
    showAlert('Logged out successfully', 'success');
    
    // Reset auth buttons
    document.querySelectorAll('.auth-buttons').forEach(el => {
        el.innerHTML = `
            <button class="btn btn-login" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
            <button class="btn btn-register" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
        `;
    });
    
    // Reinitialize event listeners
    setupEventListeners();
}

// Show alert message
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
    alertDiv.style.zIndex = "9999";
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Append to body
    document.body.appendChild(alertDiv);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(alertDiv);
        alert.close();
    }, 3000);
}
