function showForm(type) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('type').value = type;
}

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const type = document.getElementById('type').value;

    const response = await fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify({ name, email, message, type })
    });

    const result = await response.json();

    if (result.success) {
        alert('Email envoyé avec succès !');
        document.getElementById('contact-form').reset();
        document.getElementById('form-container').style.display = 'none';
    } else {
        alert('Erreur lors de l\'envoi de l\'email: ' + result.error);
    }
});

document.getElementById('cancel-btn').addEventListener('click', function () {
    document.getElementById('form-container').style.display = 'none';
});

document.addEventListener('click', function (e) {
    if (e.target.id !== 'form-container' && !document.getElementById('form-container').contains(e.target)) {
        document.getElementById('form-container').style.display = 'none';
    }
});

const musicToggle = document.getElementById('music-toggle');
const audio = document.getElementById('audio');

musicToggle.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        musicToggle.textContent = 'Arrêter la musique';
    } else {
        audio.pause();
        musicToggle.textContent = 'Écouter de la musique';
    }
});