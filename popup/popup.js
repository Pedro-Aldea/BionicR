document.addEventListener('DOMContentLoaded', function() {
  const activateButton = document.getElementById('activateButton');
  
  activateButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "activate_bionic_reading"}, function(response) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            showStatus('Error: Could not activate Bionic Reading', 'error');
          } else if (response && response.success) {
            console.log("Bionic reading activated successfully");
            showStatus('Bionic Reading activated!', 'success');
          } else {
            console.error("Failed to activate bionic reading");
            showStatus('Error: Failed to activate Bionic Reading', 'error');
          }
        });
      } else {
        console.error("No active tab found");
        showStatus('Error: No active tab found', 'error');
      }
    });
  });

  function showStatus(message, type) {
    const statusElement = document.createElement('p');
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    document.querySelector('.container').appendChild(statusElement);
    setTimeout(() => statusElement.remove(), 3000);
  }
});