document.getElementById('showWork').addEventListener('click', function () {
    showForm('work');
});

document.getElementById('showStaff').addEventListener('click', function () {
    showForm('staff');
});

function showForm(type) {
    const formContainer = document.getElementById('form-container');
    const contactForm = document.getElementById('contact-form');
    formContainer.style.display = 'block';
    formContainer.dataset.type = type;
    if (type === 'work') {
        contactForm.dataset.type = 'work';
    } else if (type === 'staff') {
        contactForm.dataset.type = 'staff';
    }
}

document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const type = this.dataset.type;

    const responseMessage = type === 'work'
        ? 'Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l\'avant, je souhaiterais d\'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider. Meilleures salutations.'
        : 'Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous. Meilleures salutations.';

    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            body: JSON.stringify({ name, email, message, responseMessage }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Email envoyé avec succès');
            formContainer.style.display = 'none';
        } else {
            alert('Erreur lors de l\'envoi de l\'email');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erreur lors de l\'envoi de l\'email');
    }
});

function playMusic() {
    const music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}