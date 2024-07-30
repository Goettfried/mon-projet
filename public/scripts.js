function showForm(type) {
    const formContainer = document.getElementById('form-container');
    const contactForm = document.getElementById('contact-form');
    formContainer.style.display = 'block';
    contactForm.dataset.type = type;
}

function hideForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.style.display = 'none';
    const contactForm = document.getElementById('contact-form');
    contactForm.reset();
}

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formType = event.target.dataset.type;
    const formData = new FormData(event.target);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        type: formType
    };

    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Email envoyé avec succès');
            hideForm();
        } else {
            alert('Une erreur est survenue lors de l\'envoi de l\'email');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de l\'envoi de l\'email');
    }
});

function playMusic() {
    const audio = document.getElementById('background-music');
    audio.play();
}

document.addEventListener('click', function(event) {
    const formContainer = document.getElementById('form-container');
    if (!formContainer.contains(event.target) && formContainer.style.display === 'block') {
        hideForm();
    }
});