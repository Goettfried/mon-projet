document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('form-container');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const backgroundMusic = document.getElementById('background-music');
    const musicButton = document.getElementById('music-button');

    window.showForm = function(type) {
        document.getElementById('form-type').value = type;
        formContainer.style.display = 'block';
    };

    window.hideForm = function() {
        formContainer.style.display = 'none';
    };

    window.submitForm = function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.innerText = 'Email envoyé avec succès!';
                formMessage.style.color = 'green';
                formMessage.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    formContainer.style.display = 'none';
                    formMessage.style.display = 'none';
                }, 3000);
            } else {
                formMessage.innerText = 'Erreur lors de l\'envoi de l\'email: ' + data.error;
                formMessage.style.color = 'red';
                formMessage.style.display = 'block';
            }
        })
        .catch(error => {
            formMessage.innerText = 'Erreur lors de l\'envoi de l\'email: ' + error.message;
            formMessage.style.color = 'red';
            formMessage.style.display = 'block';
        });
    };

    window.toggleMusic = function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicButton.innerText = 'Arrêter la musique';
        } else {
            backgroundMusic.pause();
            musicButton.innerText = 'Écouter de la musique';
        }
    };

    // Validations en temps réel pour les champs du formulaire
    contactForm.addEventListener('input', function(event) {
        const target = event.target;
        if (target.validity.valid) {
            target.style.borderColor = 'green';
        } else {
            target.style.borderColor = 'red';
        }
    });

    // Accessibilité : Ajout des attributs ARIA
    contactForm.setAttribute('role', 'form');
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.setAttribute('aria-required', 'true');
    });

    // Animation hover sur les boutons
    document.querySelectorAll('.buttons').forEach(button => {
        button.addEventListener('mouseover', function() {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s';
        });
        button.addEventListener('mouseout', function() {
            button.style.transform = 'scale(1)';
        });
    });
});