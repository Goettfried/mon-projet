document.addEventListener('DOMContentLoaded', function() {
    const jobSeekerBtn = document.getElementById('job-seeker-btn');
    const employerBtn = document.getElementById('employer-btn');
    const formContainer = document.getElementById('form-container');
    const contactForm = document.getElementById('contact-form');
    const responseMessageField = document.getElementById('responseMessage');

    jobSeekerBtn.addEventListener('click', function() {
        responseMessageField.value = `Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. 
        Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. 
        Je serais enchanté de vous aider. Meilleures salutations.`;
        formContainer.style.display = 'block';
    });

    employerBtn.addEventListener('click', function() {
        responseMessageField.value = `Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, 
        je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : https://votre-site.com/public/conditions_generales_nicolas_ballu.pdf
        Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, 
        puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous. Meilleures salutations.`;
        formContainer.style.display = 'block';
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Code pour envoyer le formulaire
    });
});