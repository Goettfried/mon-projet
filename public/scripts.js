function showForm(type) {
    document.getElementById('form-container').style.display = 'flex';
    document.getElementById('form-type').value = type;
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
}

function sendEmail() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    var type = document.getElementById('form-type').value;

    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message,
            type: type
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('E-mail envoyé avec succès !');
            hideForm();
        } else {
            alert('Erreur lors de l\'envoi de l\'e-mail.');
        }
    }).catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi de l\'e-mail.');
    });
}

function toggleMusic() {
    var audio = document.getElementById('background-music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

document.addEventListener('click', function (event) {
    var isClickInsideForm = document.getElementById('form-container').contains(event.target);
    var isClickInsideButton = event.target.classList.contains('buttons');

    if (!isClickInsideForm && !isClickInsideButton) {
        hideForm();
    }
});