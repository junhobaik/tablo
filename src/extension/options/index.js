document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('tablo_cart', function(items) {
    const cart = items.tablo_cart;

    chrome.storage.sync.get('tablo_tab', function(items) {
      const tab = items.tablo_tab;

      const code = JSON.stringify({ tab, cart });

      document.querySelector('#backupCode').value = code;
    });
  });

  chrome.storage.sync.get('tablo_app', i => {
    console.log(i.tablo_app);
    if (i.tablo_app) {
      if (i.tablo_app.aTarget === '_blank') {
        document.querySelector('#openBlank').checked = 'true';
      } else {
        document.querySelector('#openSelf').checked = 'true';
      }
    } else {
      chrome.storage.sync.set(
        {
          tablo_app: {
            aTarget: '_blank',
          },
        },
        () => {}
      );
    }
  });
});
