function showForm(type) {
    const formContainer = document.getElementById('form-container');
    const messageInput = document.getElementById('message');

    formContainer.style.display = 'block';
    if (type === 'travail') {
        messageInput.value = "Je recherche du travail";
    } else if (type === 'personnel') {
        messageInput.value = "Je recherche du personnel";
    }
}

function hideForm() {
    const formContainer = document.getElementById('form-container');
    const form = document.getElementById('contact-form');

    formContainer.style.display = 'none';
    form.reset();
}

function toggleMusic() {
    const music = document.getElementById('background-music');
    const musicButton = document.getElementById('music-button');

    if (music.paused) {
        music.play();
        musicButton.textContent = 'Arrêter la musique';
    } else {
        music.pause();
        musicButton.textContent = 'Écouter de la musique';
    }
}

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, message })
    });

    const result = await response.json();

    if (result.success) {
        alert('Email envoyé avec succès !');
        hideForm();
    } else {
        alert(`Erreur lors de l'envoi de l'email: ${result.error}`);
    }
});
