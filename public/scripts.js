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
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
      option: form.getAttribute('data-option')
    };
  
    try {
      const response = await fetch('/.netlify/functions/sendTestEmail', {
        method: 'POST',
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Email envoyé avec succès !');
        form.reset();
        hideForm();
      } else {
        alert(`Erreur lors de l'envoi de l'email: ${result.error}`);
      }
    } catch (error) {
      alert(`Erreur lors de l'envoi de l'email: ${error.message}`);
    }
  });
  
  document.addEventListener('click', function (event) {
    const formContainer = document.getElementById('form-container');
    const target = event.target;
    if (!formContainer.contains(target) && formContainer.style.display === 'block') {
      hideForm();
    }
  });
  
  function playPauseMusic() {
    const audio = document.getElementById('background-music');
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }  