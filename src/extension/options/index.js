const getStorage = (key = null) => {
  return new Promise(resolve => {
    chrome.storage.sync.get(key, item => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
};

const setStorage = (key, data) => {
  return new Promise(resolve => {
    chrome.storage.sync.set(
      {
        [key]: data,
      },
      () => resolve()
    );
  });
};

const renderDataManagement = (tablo_tab, tablo_cart) => {
  const code = JSON.stringify({ tablo_tab, tablo_cart });
  document.querySelector('#backupCode').value = code;
};

const renderBasicSetting = (tablo_app = null) => {
  if (tablo_app) {
    if (tablo_app.openLink.link === '_blank') {
      document.querySelector('#openLinkBlank').checked = 'true';
    } else {
      document.querySelector('#openLinkSelf').checked = 'true';
    }
    if (tablo_app.openLink.tab === '_blank') {
      document.querySelector('#openTabBlank').checked = 'true';
    } else {
      document.querySelector('#openTabSelf').checked = 'true';
    }
  } else {
    setStorage('tablo_app', {
      openLink: {
        link: '_blank',
        tab: '_blank',
      },
    });
    document.querySelector('#openLinkBlank').checked = 'true';
    document.querySelector('#openTabBlank').checked = 'true';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    const { tablo_cart, tablo_tab, tablo_app } = await getStorage();

    renderDataManagement(tablo_tab, tablo_cart);
    renderBasicSetting(tablo_app);
  })();
});
