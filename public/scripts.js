function showForm(option) {
    const formContainer = document.getElementById('form-container');
    const contactForm = document.getElementById('contact-form');
    formContainer.style.display = 'block';
    contactForm.setAttribute('data-option', option);
  }
  
  function hideForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.style.display = 'none';
  }
  
  document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const form = event.target;
    const option = form.getAttribute('data-option');
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      option: option
    };
  
    try {
      const response = await fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        alert('Email envoyé avec succès!');
        form.reset();
        hideForm();
      } else {
        alert('Erreur lors de l\'envoi de l\'email: ' + response.statusText);
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    }
  });
  
  document.addEventListener('click', function (event) {
    const formContainer = document.getElementById('form-container');
    if (!formContainer.contains(event.target) && formContainer.style.display === 'block') {
      hideForm();
    }
  });
  
  function playPauseMusic() {
    const music = document.getElementById('background-music');
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  }  