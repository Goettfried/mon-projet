function showForm(type) {
    document.getElementById('form-type').value = type;
    document.getElementById('contact-form').classList.remove('hidden');
}

function hideForm() {
    document.getElementById('contact-form').classList.add('hidden');
}

function toggleMusic() {
    var music = document.getElementById('background-music');
    var button = document.getElementById('music-button');
    if (music.paused) {
        music.play();
        button.textContent = 'Arrêter la musique';
    } else {
        music.pause();
        button.textContent = 'Écouter de la musique';
    }
}

async function sendEmail(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert('Email envoyé avec succès!');
            hideForm();
            form.reset();
        } else {
            alert('Erreur lors de l\'envoi de l\'email: ' + result.error);
        }
    } catch (error) {
        alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    }
}