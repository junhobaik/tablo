/* eslint-disable camelcase */
/* eslint-disable no-alert, no-restricted-globals */
/* eslint-disable no-undef */

const getStorage = (key = null) => {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get(key, item => {
      // eslint-disable-next-line no-unused-expressions
      key ? resolve(item[key]) : resolve(item);
    });
  });
};

const setStorage = (key, data) => {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
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
    // openLink Setting
    if (tablo_app.openLink) {
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
        ...tablo_app,
        openLink: {
          link: '_blank',
          tab: '_blank',
        },
      });
    }

    // scroll Setting
    if (tablo_app.scroll) {
      if (tablo_app.scroll.xScroll === true) {
        document.querySelector('#enableScrollX').checked = 'true';
      } else {
        document.querySelector('#disableScrollX').checked = 'true';
      }

      if (tablo_app.scroll.xScrollSpeed) {
        document.querySelector('#speedScrollX').value =
          tablo_app.scroll.xScrollSpeed;
      }
    } else {
      setStorage('tablo_app', {
        ...tablo_app,
        scroll: {
          xScroll: true,
          xScrollSpeed: 30,
        },
      });
    }
  } else {
    // init default data
    setStorage('tablo_app', {
      openLink: {
        link: '_blank',
        tab: '_blank',
      },
      scroll: {
        xScroll: true,
        xScrollSpeed: 30,
      },
    });
    document.querySelector('#openLinkBlank').checked = 'true';
    document.querySelector('#openTabBlank').checked = 'true';
    document.querySelector('#enableScrollX').checked = 'true';
    document.querySelector('#speedScrollX').value = '30';
  }
};

const addEventBasicSetting = tablo_app => {
  document.querySelector('.link-open').addEventListener('change', e => {
    setStorage('tablo_app', {
      openLink: {
        link: e.target.value,
        tab: tablo_app.openLink.tab,
      },
    });
  });

  document.querySelector('.tab-links-open').addEventListener('change', e => {
    setStorage('tablo_app', {
      openLink: {
        link: tablo_app.openLink.link,
        tab: e.target.value,
      },
    });
  });

  document
    .querySelector('.x-scroll-use-setting')
    .addEventListener('change', e => {
      setStorage('tablo_app', {
        ...tablo_app,
        scroll: {
          ...tablo_app.scroll,
          xScroll: e.target.value === 'enable',
        },
      });
    });

  document
    .querySelector('.x-scroll-speed-setting')
    .addEventListener('change', e => {
      setStorage('tablo_app', {
        ...tablo_app,
        scroll: {
          ...tablo_app.scroll,
          xScrollSpeed: e.target.value,
        },
      });
    });
};

const addEventDataManagement = () => {
  document.querySelector('.reset-button').addEventListener('click', () => {
    if (confirm('RESET ALL DATA!, Are you sure?')) {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.clear();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });

  document.querySelector('.restore-button').addEventListener('click', () => {
    if (
      confirm(
        'Are you sure?, If an error occurs after restore, reset the data.'
      )
    ) {
      const { tablo_tab, tablo_cart } = JSON.parse(
        document.querySelector('#restoreCode').value
      );

      setStorage('tablo_cart', tablo_cart);
      setStorage('tablo_tab', tablo_tab);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    const { tablo_cart, tablo_tab, tablo_app } = await getStorage();

    renderDataManagement(tablo_tab, tablo_cart);
    renderBasicSetting(tablo_app);
    addEventBasicSetting(tablo_app);
    addEventDataManagement();
  })();
});
