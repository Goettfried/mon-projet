function showForm(type) {
    document.getElementById('form-container').style.display = 'flex';
    document.getElementById('form-type').value = type;
}

function closeForm() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('contact-form').reset();
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formType = document.getElementById('form-type').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
        formType,
        name,
        email,
        message
    };

    fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeForm();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur lors de l\'envoi du message.');
    });
});