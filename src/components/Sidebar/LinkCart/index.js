import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { setDragStatus } from '../../../redux/actions';
import './index.scss';

class LinkCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const updateCartList = list => {
      this.setState({
        list,
      });
    };

    // eslint-disable-next-line no-undef
    chrome.storage.sync.get('tablo_cart', i => {
      if (i.tablo_cart) {
        this.setState({
          list: i.tablo_cart,
        });
      } else {
        const list = [
          {
            title: "HUNDRED's Blog",
            url: 'https://junhobaik.github.io',
            favIconUrl: '',
          },
        ];

        // eslint-disable-next-line no-undef
        chrome.storage.sync.set(
          {
            tablo_cart: list,
          },
          () => {
            this.setState({
              list,
            });
          }
        );
      }
    });
    // eslint-disable-next-line no-undef
    chrome.storage.onChanged.addListener(changes => {
      if (changes.tablo_cart) updateCartList(changes.tablo_cart.newValue);
    });
  }

  linkDragStart = e => {
    const { list } = this.state;
    const { onSetDragStatus } = this.props;

    const row = parseInt(e.target.attributes.row.value, 10);

    onSetDragStatus('link', null, null, list[row]);
  };

  removeLink = e => {
    const { list } = this.state;
    const row = parseInt(e.target.parentNode.attributes.row.value, 10);
    list.splice(row, 1);

    // eslint-disable-next-line no-undef
    chrome.storage.sync.set(
      {
        tablo_cart: list,
      },
      () => {
        this.setState({
          list,
        });
      }
    );
  };

  render() {
    const { list } = this.state;
    const linkList = (list || []).map((v, i) => {
      return (
        // TODO: key lodash camelcase
        <li
          className="link"
          key={`link-${v.title}`}
          draggable="true"
          onDragStart={this.linkDragStart}
          row={i}
        >
          <a
            href={v.url}
            target="_blank"
            draggable="false"
            rel="noopener noreferrer"
          >
            <div className="favicon">
              {v.favIconUrl ? (
                <img src={v.favIconUrl} alt="favicon" draggable="false" />
              ) : (
                <div className="noFavIcon">
                  <span>{v.title[0]}</span>
                </div>
              )}
            </div>
            <span className="link-title">{v.title}</span>
          </a>

          <div
            className="link-remove"
            onClick={this.removeLink}
            role="presentation"
          >
            <Fa icon="minus-circle" />
          </div>
        </li>
      );
    });

    return (
      <div id="LinkCart">
        <div className="link-list-title">
          <Fa icon="shopping-cart" />
          <h2>Cart</h2>
        </div>
        <div className="link-list">
          <ul className="list">{linkList}</ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetDragStatus: (dragEl, col, row, item) =>
      dispatch(setDragStatus(dragEl, col, row, item)),
  };
};

LinkCart.propTypes = {
  onSetDragStatus: PropTypes.func.isRequired,
};

LinkCart = connect(
  null,
  mapDispatchToProps
)(LinkCart);

export default LinkCart;
