// scripts.js

document.getElementById('showWork').addEventListener('click', function () {
    showForm('work');
});

document.getElementById('showStaff').addEventListener('click', function () {
    showForm('staff');
});

document.addEventListener('click', function (event) {
    var formContainer = document.getElementById('form-container');
    if (!formContainer.contains(event.target) && formContainer.style.display === 'block') {
        hideForm();
    }
});

document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formType = event.target.getAttribute('data-type');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const responseMessage = formType === 'work'
        ? "Bonjour ! <br><br><strong>Je vous souhaite la bienvenue, merci pour votre démarche.</strong><br><br>Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant <strong>CV</strong>, <strong>attestation/certificats de travail</strong> et <strong>diplôme</strong>. Je serais enchanté de vous aider.<br><br>Meilleures salutations."
        : "Bonjour ! <br><br><strong>Je vous souhaite la bienvenue, merci pour votre démarche.</strong><br><br>Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce <a href='conditions_generales_nicolas_ballu.pdf' download><strong>lien</strong></a>, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.<br><br>Je me réjouis de faire affaire avec vous.<br><br>Meilleures salutations.";

    const response = await fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, responseMessage }),
    });

    if (response.ok) {
        alert('Email envoyé avec succès!');
        hideForm();
    } else {
        alert('Erreur lors de l\'envoi de l\'email.');
    }
});

function showForm(type) {
    var formContainer = document.getElementById('form-container');
    var form = document.getElementById('contact-form');
    form.setAttribute('data-type', type);
    formContainer.style.display = 'block';
}

function hideForm() {
    var formContainer = document.getElementById('form-container');
    var form = document.getElementById('contact-form');
    formContainer.style.display = 'none';
    form.reset();
}

function toggleMusic() {
    var music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}