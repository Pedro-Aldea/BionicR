let currentFontSize = 16;

document.addEventListener('DOMContentLoaded', function() {
  const contentElement = document.getElementById('content');
  const pageTitleElement = document.getElementById('page-title');
  const toggleThemeButton = document.getElementById('toggle-theme');
  const increaseFontButton = document.getElementById('increase-font');
  const decreaseFontButton = document.getElementById('decrease-font');

  window.addEventListener('message', function(event) {
    contentElement.innerHTML = event.data.content;
    pageTitleElement.textContent = `Bionic Reading - ${event.data.title}`;
  });

  toggleThemeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
  });

  increaseFontButton.addEventListener('click', function() {
    changeFontSize(1);
  });

  decreaseFontButton.addEventListener('click', function() {
    changeFontSize(-1);
  });

  function changeFontSize(delta) {
    currentFontSize = Math.max(12, Math.min(24, currentFontSize + delta));
    contentElement.style.fontSize = `${currentFontSize}px`;
  }
});