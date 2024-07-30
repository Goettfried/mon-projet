function showForm(type) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('type').value = type;
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('contact-form').reset();
}

async function sendEmail(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            hideForm();
        } else {
            alert(`Erreur lors de l'envoi de l'email: ${result.message}`);
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
