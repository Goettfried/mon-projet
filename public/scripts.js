document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault();
        sendEmail();
    });
});

function showForm(type) {
    document.getElementById("form-type").value = type;
    document.getElementById("contact-form").classList.remove("hidden");
}

function hideForm() {
    document.getElementById("contact-form").classList.add("hidden");
}

function changeImage(element, src) {
    element.src = src;
}

async function sendEmail() {
    const formType = document.getElementById("form-type").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    let subject, body;

    if (formType === 'travail') {
        subject = 'Vous avez fait le bon choix !';
        body = `
            Bonjour ${name},

            Merci pour votre démarche. Je vais prendre contact avec vous très prochainement.

            Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme.

            Je serais enchanté de vous aider.

            Meilleures salutations,
            Nicolas Ballu
        `;
    } else if (formType === 'personnel') {
        subject = 'Vous avez fait le bon choix !';
        body = `
            Bonjour ${name},

            Merci pour votre démarche.

            Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : [lien à insérer].

            Si vous êtes plutôt intéressé(e) par de la location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.

            Je me réjouis de faire affaire avec vous.

            Meilleures salutations,
            Nicolas Ballu
        `;
    }

    const response = await fetch("/.netlify/functions/sendTestEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, body })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Email envoyé avec succès!");
        hideForm();
    } else {
        alert("Erreur lors de l'envoi de l'email : " + result.error);
    }
}