document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const type = document.querySelector('input[name="type"]:checked').value;
  
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, message, type }),
    });
  
    const result = await response.text();
    alert(result);
  });  
