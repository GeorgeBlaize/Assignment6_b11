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


// Fetch words for a specific lesson
async function fetchWords(levelId, button) {
    // Reset active button state
    document.querySelectorAll('#lesson-buttons button').forEach(btn => {
        btn.classList.remove('bg-purple-800');
        btn.classList.add('bg-purple-600');
    });
    button.classList.remove('bg-purple-600');
    button.classList.add('bg-purple-800');

    // Show loading spinner
    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('words-container').innerHTML = '';
    document.getElementById('vocab-content').classList.add('hidden');

    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/level/${levelId}`);
        const data = await response.json();
        const wordsContainer = document.getElementById('words-container');

        if (data.status && data.data && Array.isArray(data.data) && data.data.length > 0) {
            wordsContainer.innerHTML = ''; // Clear previous content
            data.data.forEach(word => {
                const card = document.createElement('div');
                card.className = 'bg-white p-4 rounded-lg shadow flex flex-col items-center text-center';
                card.innerHTML = `
                    <h3 class="text-lg font-bold mb-2">${word.word || 'N/A'}</h3>
                    <p class="text-gray-600 mb-1">Meaning / Pronunciation</p>
                    <p class="text-gray-600 mb-2">${word.meaning || 'N/A'} / ${word.pronunciation || 'N/A'}</p>
                    <p class="text-gray-600 mb-2 bengali-text">${word.bengali_meaning || 'N/A'}</p>
                    <div class="flex space-x-2">
                        <button onclick="pronounceWord('${word.word || ''}')" class="p-2 bg-gray-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                        </button>
                        <button onclick="openModal(${word.id})" class="p-2 bg-gray-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                            </svg>
                        </button>
                    </div>
                `;
                wordsContainer.appendChild(card);
            });
        } else {
            wordsContainer.innerHTML = '<p class="text-center text-gray-600 bengali-text">কোনো শব্দ পাওয়া যায়নি</p>';
        }
    } catch (error) {
        console.error('Error fetching words:', error);
        document.getElementById('words-container').innerHTML = '<p class="text-center text-gray-600 bengali-text">শব্দ লোড করতে ত্রুটি</p>';
    } finally {
        document.getElementById('loading-spinner').classList.add('hidden');
    }
}

// Fetch word details for modal
async function openModal(wordId) {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/word/${wordId}`);
        const data = await response.json();
        const word = data.data;

        if (data.status && word) {
            document.getElementById('modal-word').textContent = `${word.word || 'N/A'} (${word.bengali_meaning || 'N/A'})`;
            document.getElementById('modal-meaning').innerHTML = `Meaning: <span class="font-bold">${word.meaning || 'N/A'}</span>`;
            document.getElementById('modal-example').innerHTML = `Example: <span class="font-bold">${word.example || 'N/A'}</span>`;
            document.getElementById('modal-synonyms').innerHTML = `Synonyms: <span class="font-bold">${word.synonyms?.join(', ') || 'N/A'}</span>`;
            document.getElementById('vocab-modal').classList.remove('hidden');
        } else {
            Swal.fire('Error', 'Word details not found', 'error');
        }
    } catch (error) {
        console.error('Error fetching word details:', error);
        Swal.fire('Error', 'Failed to load word details', 'error');
    }
}

 // Close modal
 function closeModal() {
    document.getElementById('vocab-modal').classList.add('hidden');
}

// Load lessons on page load
document.addEventListener('DOMContentLoaded', fetchLessons);