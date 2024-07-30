document.addEventListener("DOMContentLoaded", function () {
    const forms = {
        workForm: document.getElementById('contactForm'),
        personnelForm: document.getElementById('contactForm')
    };

    window.toggleForm = function (formName) {
        for (let key in forms) {
            forms[key].style.display = key === formName ? 'block' : 'none';
        }
    };

    window.sendEmail = function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                formType: form.getAttribute('data-form-type')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Erreur: ' + data.error);
                } else {
                    alert('Succès: ' + data.message);
                    form.reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erreur lors de l\'envoi de l\'email.');
            });
    };
});