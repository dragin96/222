console.log('Content script loaded');

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'auto-field';
    input.value = 'autofilled';
    form.appendChild(input);
  });
});
