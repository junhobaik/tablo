document.addEventListener("DOMContentLoaded", () => {
  let title,
    url,
    favIconUrl,
    isReady = false;

  chrome.tabs.getSelected(null, function(tab) {
    title = tab.title;
    url = tab.url;
    favIconUrl = tab.favIconUrl;
    isReady = true;

    if (favIconUrl !== undefined)
      document.querySelector(".link img").src = favIconUrl;
    document.querySelector(".link .link-title").innerHTML = title;
  });

  document.querySelector(".add-button").addEventListener("click", e => {
    console.log('click');

    if (isReady) {
      chrome.storage.sync.get("tablo_cart", function(items) {
        const cart = items.tablo_cart;
        chrome.storage.sync.set(
          {
            tablo_cart: [
              ...cart,
              {
                title, 
                url,
                favIconUrl
              }
            ]
          },
          () => {}
        );
      });
    } else {
      alert("fail");
    }
  });
});
