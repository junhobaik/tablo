/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  let loadedTitle;
  let loadedUrl;
  let favIconUrl;
  let isReady = false;

  chrome.tabs.getSelected(null, tab => {
    loadedTitle = tab.title;
    loadedUrl = tab.url;
    favIconUrl = tab.favIconUrl || undefined;
    isReady = true;

    const img = document.querySelector('.link img');

    if (favIconUrl !== undefined) {
      img.src = favIconUrl;
    } else {
      const noFavicon = document.querySelector('.no-favicon');
      img.style.display = 'none';
      noFavicon.style.display = 'flex';
      noFavicon.querySelector('span').innerHTML = title[0].toUpperCase();
    }
    document.querySelector('.link .link-title').innerHTML = title;
  });

  document.querySelector('.add-button').addEventListener('click', () => {
    if (isReady) {
      chrome.storage.sync.get('tablo_cart', items => {
        const cart = items.tablo_cart;
        chrome.storage.sync.set(
          {
            tablo_cart: [
              ...cart,
              {
                title: loadedTitle,
                url: loadedUrl,
                favIconUrl,
              },
            ],
          },
          () => {}
        );
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('ERROR');
    }
  });
});
