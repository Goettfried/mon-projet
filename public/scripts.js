function showForm(type) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('type').value = type;
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('contact-form').reset();
}

function sendEmail(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        hideForm();
    })
    .catch(error => {
        alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    });
}

function toggleMusic() {
    const music = document.getElementById('music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
