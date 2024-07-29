document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire de soumission du formulaire de contact
    document.getElementById('contact-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const type = this.dataset.type;

        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        const data = {
            name: name,
            email: email,
            message: message,
            type: type
        };

        console.log('Sending data:', data);

        try {
            const response = await fetch('/.netlify/functions/sendTestEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Erreur inconnue');
            }

            const result = await response.json();
            alert('Email envoyé avec succès : ' + result.message);
        } catch (error) {
            alert('Erreur lors de l\'envoi de l\'email : ' + error.message);
        }
    });

    // Fonction pour afficher le formulaire de contact
    function showForm(type) {
        console.log('Showing form for:', type);
        document.getElementById('form-container').style.display = 'block';
        document.getElementById('contact-form').dataset.type = type;
    }

    // Ajouter des écouteurs d'événements aux boutons pour afficher le formulaire
    document.getElementById('showWork').addEventListener('click', function() {
        showForm('work');
    });

    document.getElementById('showStaff').addEventListener('click', function() {
        showForm('staff');
    });

    // Fonction pour jouer de la musique
    function playMusic() {
        const audio = document.getElementById('background-music');
        if (audio.paused) {
            audio.play();
            console.log('Playing music');
        } else {
            audio.pause();
            console.log('Pausing music');
        }
    }

    // Ajouter un écouteur d'événement au bouton de lecture de musique
    document.querySelector('.audio-control button').addEventListener('click', playMusic);
});