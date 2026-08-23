document.getElementById('y').textContent = new Date().getFullYear();
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const subject = encodeURIComponent('Contato pelo site Zeuvastec Technology');
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);
    window.location.href = `mailto:zeuvastec@gmail.com?subject=${subject}&body=${body}`;
  });
}
