document.getElementById('y').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const statusBox = document.getElementById('contactStatus');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      if (statusBox) {
        statusBox.textContent = 'Preencha todos os campos antes de enviar.';
        statusBox.className = 'contact-status error';
      }
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Enviando...';
    }

    if (statusBox) {
      statusBox.textContent = 'Enviando sua mensagem...';
      statusBox.className = 'contact-status';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/zeuvastec@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: 'Contato pelo site Zeuvastec Technology',
          _replyto: email
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Não foi possível enviar a mensagem.');
      }

      form.reset();

      if (statusBox) {
        statusBox.textContent = 'Mensagem enviada com sucesso para zeuvastec@gmail.com.';
        statusBox.className = 'contact-status success';
      }
    } catch (error) {
      if (statusBox) {
        statusBox.innerHTML =
          'Não foi possível enviar automaticamente. ' +
          '<a href="mailto:zeuvastec@gmail.com">Clique aqui para abrir seu e-mail</a>.';
        statusBox.className = 'contact-status error';
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'Enviar mensagem';
      }
    }
  });
}
