function showForm(type) {
    document.getElementById('form-type').value = type;
    document.getElementById('contact-form').classList.remove('hidden');
}

function hideForm() {
    document.getElementById('contact-form').classList.add('hidden');
}

function toggleMusic() {
    var music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

async function sendEmail(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            alert('Email envoyé avec succès!');
            hideForm();
        } else {
            alert('Erreur lors de l\'envoi de l\'email: ' + result.error);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    }
}