function showForm(type) {
    document.getElementById('type').value = type;
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
  }
  
  function hideForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('form-container').style.display = 'none';
  }
  
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
  
  function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
  }
  
  function sendEmail(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const name = sanitizeInput(formData.get('name'));
    const email = sanitizeInput(formData.get('email'));
    const phone = sanitizeInput(formData.get('phone'));
    const message = sanitizeInput(formData.get('message'));
    const type = sanitizeInput(formData.get('type'));
  
    if (!validateEmail(email)) {
      alert('Veuillez fournir une adresse email valide.');
      return;
    }
  
    fetch('/api/send-email', {
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
    })
    .then(response => {
      if (response.ok) {
        alert('Email envoyé avec succès.');
        hideForm();
      } else {
        alert('Erreur lors de l\'envoi de l\'email.');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi de l\'email.');
    });
  }
  
  function toggleMusic() {
    const music = document.getElementById('music');
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  }  
