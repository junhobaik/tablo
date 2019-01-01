document.addEventListener('DOMContentLoaded', () => {
  let title,
    url,
    favIconUrl,
    isReady = false;

  chrome.tabs.getSelected(null, function(tab) {
    title = tab.title;
    url = tab.url;
    favIconUrl = tab.favIconUrl || undefined;
    isReady = true;

    const img = document.querySelector('.link img');

    console.log(favIconUrl);
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

  document.querySelector('.add-button').addEventListener('click', e => {
    console.log('click');

    if (isReady) {
      chrome.storage.sync.get('tablo_cart', function(items) {
        const cart = items.tablo_cart;
        chrome.storage.sync.set(
          {
            tablo_cart: [
              ...cart,
              {
                title,
                url,
                favIconUrl,
              },
            ],
          },
          () => {}
        );
      });
    } else {
      alert('fail');
    }
  });
});
