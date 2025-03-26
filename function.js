 // Smooth scrolling function
 function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Login functionality
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username) {
        Swal.fire('Error', 'Please enter your name', 'error');
        return;
    }

    if (password !== '123456') {
        Swal.fire('Error', 'Incorrect password', 'error');
        return;
    }

    Swal.fire('Success', 'Login successful!', 'success').then(() => {
        document.getElementById('banner').classList.add('hidden');
        document.getElementById('navbar').classList.remove('hidden');
        document.getElementById('vocab-section').classList.remove('hidden');
        document.getElementById('faq-section').classList.remove('hidden');
    });
});

 // Logout functionality
 function logout() {
    Swal.fire('Success', 'Logged out successfully!', 'success').then(() => {
        document.getElementById('banner').classList.remove('hidden');
        document.getElementById('navbar').classList.add('hidden');
        document.getElementById('vocab-section').classList.add('hidden');
        document.getElementById('faq-section').classList.add('hidden');
    });
}
