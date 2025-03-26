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

 // Pronounce word function
 function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
}

// Fetch lessons and generate buttons
async function fetchLessons() {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/levels/all');
        const data = await response.json();
        const lessonButtons = document.getElementById('lesson-buttons');

        if (data.status && data.data && Array.isArray(data.data)) {
            data.data.forEach(level => {
                const button = document.createElement('button');
                button.className = 'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700';
                button.textContent = `Lesson-${level.id}`;
                button.onclick = () => fetchWords(level.id, button);
                lessonButtons.appendChild(button);
            });
        } else {
            lessonButtons.innerHTML = '<p class="text-center text-gray-600 bengali-text">কোনো লেসন পাওয়া যায়নি</p>';
        }
    } catch (error) {
        console.error('Error fetching lessons:', error);
        document.getElementById('lesson-buttons').innerHTML = '<p class="text-center text-gray-600 bengali-text">লেসন লোড করতে ত্রুটি</p>';
    }
}