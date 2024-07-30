document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formType = document.getElementById('form-type').value;

    const response = await fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            formType: formType
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    const formResponse = document.getElementById('form-response');
    if (response.ok) {
        formResponse.textContent = 'Votre message a été envoyé avec succès !';
        formResponse.style.color = 'green';
    } else {
        formResponse.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
        formResponse.style.color = 'red';
    }
});

function showForm(type) {
    document.getElementById('form-type').value = type;
    document.getElementById('form-container').style.display = 'block';
}

document.querySelectorAll('input, textarea').forEach(function(element) {
    element.addEventListener('input', function() {
        if (element.checkValidity()) {
            element.style.borderColor = 'green';
        } else {
            element.style.borderColor = 'red';
        }
    });
});

function toggleMusic() {
    const music = document.getElementById('background-music');
    const button = document.getElementById('music-button');
    if (music.paused) {
        music.play();
        button.textContent = 'Arrêter la musique';
    } else {
        music.pause();
        button.textContent = 'Écouter de la musique';
    }
}

// Adding ARIA roles for accessibility
document.querySelectorAll('button, a').forEach(function(element) {
    element.setAttribute('role', 'button');
});