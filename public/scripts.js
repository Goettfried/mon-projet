document.addEventListener('click', function(event) {
    var isClickInsideForm = document.getElementById('formContainer').contains(event.target);
    var isClickInsideButton = event.target.classList.contains('showForm');
    if (!isClickInsideForm && !isClickInsideButton) {
        hideForm();
    }
});

function showForm(type) {
    var form = document.getElementById('contactForm');
    form.classList.remove('hidden');
    form.classList.add('visible');
}

function hideForm() {
    var form = document.getElementById('contactForm');
    form.classList.add('hidden');
    form.classList.remove('visible');
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
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email envoyé avec succès !');
            hideForm();
        } else {
            alert('Erreur lors de l\'envoi de l\'email: ' + data.error);
        }
    })
    .catch(error => {
        alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    });
}