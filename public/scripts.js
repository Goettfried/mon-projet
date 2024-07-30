// scripts.js

function showForm(type) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-container').dataset.type = type;
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('contact-form').reset();
}

// Event listener to hide the form when clicking outside
document.addEventListener('click', function(event) {
    let formContainer = document.getElementById('form-container');
    if (!formContainer.contains(event.target) && formContainer.style.display === 'block') {
        hideForm();
    }
});

// Prevent resizing of textarea
document.getElementById('message').style.resize = 'none';

// Update music button functionality
function playMusic() {
    let music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const type = document.getElementById('form-container').dataset.type;

    const data = {
        name,
        email,
        message,
        type
    };

    try {
        const response = await fetch('/.netlify/functions/sendTestEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            hideForm();
        } else {
            alert('Erreur lors de l\'envoi de l\'email: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erreur lors de l\'envoi de l\'email');
    }
});