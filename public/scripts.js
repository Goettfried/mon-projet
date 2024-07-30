document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.getElementById('form-container');
    const contactForm = document.getElementById('contact-form');
    const showWorkButton = document.getElementById('showWork');
    const showStaffButton = document.getElementById('showStaff');
    
    function showForm(type) {
        formContainer.classList.remove('hidden');
        contactForm.dataset.type = type;
        document.getElementById('choice').value = type;
    }

    function hideForm() {
        formContainer.classList.add('hidden');
        contactForm.reset();
    }

    showWorkButton.addEventListener('click', () => showForm('work'));
    showStaffButton.addEventListener('click', () => showForm('staff'));

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            choice: formData.get('choice')
        };

        try {
            const response = await fetch('/.netlify/functions/sendTestEmail', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.message);
            hideForm();
        } catch (error) {
            alert('Erreur lors de l\'envoi de l\'email : ' + error.message);
        }
    });

    document.addEventListener('click', function(e) {
        if (!formContainer.contains(e.target) && !e.target.matches('button')) {
            hideForm();
        }
    });
});