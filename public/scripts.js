function showForm(type) {
    document.getElementById('type').value = type;
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
}

function hideForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('form-container').style.display = 'none';
}

function sendEmail(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Extract the form data
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const type = formData.get('type');

    // Create the email content
    let emailContent = `
        Nom: ${name}\n
        Email: ${email}\n
        Numéro de téléphone: ${phone}\n
        Message: ${message}\n
    `;

    if (type === 'Je recherche du travail') {
        emailContent += `
            Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, j'aimerais vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider. Meilleures salutations.
        `;
    } else if (type === 'Je recherche du personnel') {
        emailContent += `
            Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de la location de services, ignorez ça pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous. Meilleures salutations.
            Lien vers les conditions générales: https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf
        `;
    }

    // Send the email
    fetch('/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify({
            to: email,
            subject: 'Réponse automatique de Nicolas Ballu',
            text: emailContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Email envoyé avec succès.');
            hideForm();
        } else {
            alert('Erreur lors de l\'envoi de l\'email.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi de l\'email.');
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
