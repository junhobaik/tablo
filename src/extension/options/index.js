document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('tablo_cart', function(items) {
    const cart = items.tablo_cart;

    chrome.storage.sync.get('tablo_tab', function(items) {
      const tab = items.tablo_tab;

      const code = JSON.stringify({ tab, cart });

      document.querySelector('#backupCode').value = code;
    });
  });
});
