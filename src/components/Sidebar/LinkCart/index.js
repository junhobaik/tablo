import React, { Component } from 'react';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { setDragStatus } from '../../../redux/actions';
import { connect } from 'react-redux';
import './index.scss';

class LinkCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  linkDragStart = e => {
    const row = parseInt(e.target.attributes.row.value);
    this.props.onSetDragStatus('link', null, null, this.state.list[row]);
  };

  componentDidMount() {
    const updateCartList = list => {
      this.setState({
        list,
      });
    };

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

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if (changes.tablo_cart) updateCartList(changes.tablo_cart.newValue);
    });
  }

  removeLink = e => {
    const row = parseInt(e.target.parentNode.attributes.row.value);
    const list = this.state.list;
    list.splice(row, 1);

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
    const linkList = (this.state.list || []).map((v, i) => {
      return (
        <li
          className="link"
          key={'link-' + i}
          draggable="true"
          onDragStart={this.linkDragStart}
          row={i}
        >
          <a href={v.url} target="_blank" draggable="false">
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

          <div className="link-remove" onClick={this.removeLink}>
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

let mapDispatchToProps = dispatch => {
  return {
    onSetDragStatus: (dragEl, col, row, item) =>
      dispatch(setDragStatus(dragEl, col, row, item)),
  };
};

LinkCart = connect(
  null,
  mapDispatchToProps
)(LinkCart);

export default LinkCart;
