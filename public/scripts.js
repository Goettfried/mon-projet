function showForm(type) {
    document.getElementById('type').value = type;
    document.getElementById('form-container').style.display = 'block';
}

function hideForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('form-container').style.display = 'none';
}

async function sendEmail(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            body: JSON.stringify(jsonData)
        });
        const result = await response.json();
        if (response.ok) {
            alert('Email sent successfully');
            hideForm();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        alert(`Erreur lors de l'envoi de l'email: ${error.message}`);
    }
}

function toggleMusic() {
    const music = document.getElementById('music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
