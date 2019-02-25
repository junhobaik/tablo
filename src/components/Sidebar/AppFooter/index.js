import React, { Component } from 'react';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import manifest from '../../../manifest.json';

class AppFooter extends Component {
  settingClick = () => {
    // eslint-disable-next-line no-undef
    chrome.tabs.create({ url: '/options.html' });
  };

  render() {
    return (
      <div id="AppFooter">
        <div className="app-title">
          <h1>Tablo</h1>
          <span>{`v${manifest.version}`}</span>
        </div>
        <div className="footer-side">
          <div
            className="app-setting"
            onClick={this.settingClick}
            role="presentation"
          >
            <Fa className="no-event" icon="cog" />
          </div>
        </div>
      </div>
    );
  }
}

export default AppFooter;
