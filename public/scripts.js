document.getElementById('job-seeker-btn').addEventListener('click', function() {
    showForm('job-seeker');
});

document.getElementById('employer-btn').addEventListener('click', function() {
    showForm('employer');
});

document.getElementById('music-btn').addEventListener('click', function() {
    var audio = document.getElementById('background-music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

function showForm(type) {
    var formContainer = document.createElement('div');
    formContainer.id = 'form-container';
    var formHtml = `
        <form id="contact-form">
            <h2>${type === 'job-seeker' ? 'Je recherche du travail' : 'Je recherche du personnel'}</h2>
            <label for="name">Nom:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Envoyer</button>
        </form>
    `;
    formContainer.innerHTML = formHtml;
    document.body.appendChild(formContainer);
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        sendEmail(type);
    });
}

function sendEmail(type) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var emailBody = {
        name: name,
        email: email,
        message: message,
        type: type
    };

    fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify(emailBody)
    })
    .then(response => response.json())
    .then(data => {
        alert('Email envoyé avec succès !');
        document.getElementById('form-container').remove();
    })
    .catch(error => {
        alert('Erreur lors de l\'envoi de l\'email : ' + error.message);
    });
}