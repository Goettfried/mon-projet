function showForm(type) {
    document.getElementById('form-type').value = type;
    document.getElementById('contact-form').classList.remove('hidden');
}

function hideForm() {
    document.getElementById('contact-form').classList.add('hidden');
}

function hideFormSuccess() {
    document.getElementById('form-success').classList.add('hidden');
    hideForm();
}

function sendEmail(event) {
    event.preventDefault();
    const formType = document.getElementById('form-type').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType, name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('form-success').classList.remove('hidden');
        } else {
            alert('Erreur lors de l\'envoi de l\'email');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur lors de l\'envoi de l\'email');
    });
}

let musicPlaying = false;
function toggleMusic() {
    const music = document.getElementById('background-music');
    const musicButton = document.getElementById('music-button');
    if (musicPlaying) {
        music.pause();
        musicButton.textContent = 'Écouter de la musique';
    } else {
        music.play();
        musicButton.textContent = 'Arrêter la musique';
    }
    musicPlaying = !musicPlaying;
}

// Adding ARIA roles and properties for accessibility
document.querySelectorAll('button').forEach(button => {
    button.setAttribute('role', 'button');
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
        button.setAttribute('aria-pressed', button.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
});

document.querySelectorAll('a').forEach(anchor => {
    anchor.setAttribute('role', 'link');
});

// Real-time validation for email input
document.getElementById('email').addEventListener('input', function(event) {
    const emailField = event.target;
    const emailValue = emailField.value;
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
        emailField.setCustomValidity('Veuillez entrer une adresse e-mail valide.');
    } else {
        emailField.setCustomValidity('');
    }
});