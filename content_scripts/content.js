chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "activate_bionic_reading") {
    const pageContent = document.body.innerText;
    const bionicContent = convertToBionicReading(pageContent);
    openBionicReadingPage(bionicContent);
    sendResponse({success: true});
  }
  return true;  // Indicates that the response will be sent asynchronously
});

function convertToBionicReading(text) {
  return text.split(' ').map(word => {
    if (word.length <= 3) return word;
    const midpoint = Math.ceil(word.length * 0.6);
    const boldPart = word.slice(0, midpoint);
    const regularPart = word.slice(midpoint);
    return `<strong>${boldPart}</strong>${regularPart}`;
  }).join(' ');
}

function openBionicReadingPage(content) {
  const bionicPage = window.open(chrome.runtime.getURL('bionic.html'), '_blank');
  bionicPage.addEventListener('DOMContentLoaded', () => {
    bionicPage.postMessage({ content: content, title: document.title }, '*');
  });
}