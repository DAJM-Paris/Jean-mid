document.addEventListener('DOMContentLoaded', () => {
  const toggleTheme = document.getElementById('toggle-theme');
  const resetButton = document.getElementById('reset-button');
  const form = document.querySelector('form');
  const banner = document.querySelector('.banner');

  toggleTheme.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
  });

  resetButton.addEventListener('click', () => {
    resetForm();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let promptText = '';
    const textareas = document.querySelectorAll('textarea');
    const selects = document.querySelectorAll('select');
    const hiddenInputs = document.querySelectorAll('input[type="hidden"]');

    textareas.forEach((textarea) => {
      const label = document.querySelector(`label[for='${textarea.id}']`).textContent;
      const value = textarea.value;

      if (value.trim() !== '') {
        promptText += `${label}: ${value}\n`;
      }
    });

    selects.forEach((select) => {
      const label = document.querySelector(`label[for='${select.id}']`).textContent;
      const value = select.value;

      if (value.trim() !== '') {
        promptText += `${label}: ${value}\n`;
      }
    });

hiddenInputs.forEach((input) => {
  const label = input.id;
  const value = input.value;

  if (value.trim() !== '') {
    if (label === 'constraints') {
      promptText += `${value}\n`;
    } else if (label === 'output') {
      promptText += `${value}\n`;
    } else {
      promptText += `${label}: ${value}\n`;
    }
  }
});

    // Remove the line that adds the "Obligation" sentence

    // Copy the text to the clipboard
    navigator.clipboard.writeText(promptText).then(() => {
      banner.hidden = false;
      setTimeout(() => {
        banner.hidden = true;
      }, 3000);
    }, (err) => {
      console.error('Error copying to clipboard:', err);
    });
  });
});

function resetForm() {
  document.querySelector("form").reset();
}
