import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { setDragStatus } from "../../../redux/actions";
import { connect } from "react-redux";
import "./index.scss";

class LinkCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };

    this.removeLink = this.removeLink.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  dragStart(event) {
    const row = parseInt(event.target.attributes.row.value);
    this.props.onSetDragStatus(null, null, this.state.list[row]);
  }

  componentDidMount() {
    const updateList = list => {
      this.setState({
        list
      });
    };

    chrome.storage.sync.get("tablo_cart", i => {
      if (i.tablo_cart) {
        this.setState({
          list: i.tablo_cart
        });
      } else {
        const list = [
          {
            title: "HUNDRED's Blog, In cart",
            url: "https://junhobaik.github.io",
            favIconUrl: ""
          }
        ];
        chrome.storage.sync.set(
          {
            tablo_cart: list
          },
          () => {
            this.setState({
              list
            });
          }
        );
      }
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if (changes.tablo_cart) {
        updateList(changes.tablo_cart.newValue);
      }
    });
  }

  removeLink(e) {
    const row = parseInt(e.target.parentNode.attributes.row.value);
    const list = this.state.list;
    list.splice(row, 1);

    chrome.storage.sync.set(
      {
        tablo_cart: list
      },
      () => {
        this.setState({
          list
        });
      }
    );
  }

  render() {
    const linkList = (this.state.list || []).map((v, i) => {
      return (
        <li
          className="link"
          key={"link-" + i}
          draggable="true"
          onDragStart={this.dragStart}
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
        <div className="link-list">
          <div className="link-list-title">
            <Fa icon="shopping-cart" />
            <h2>Cart</h2>
          </div>
          <ul className="list">{linkList}</ul>
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onSetDragStatus: (col, row, item) => dispatch(setDragStatus(col, row, item))
  };
};

let mapStateToProps = state => {
  return {};
};

LinkCart.propTypes = {};

LinkCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkCart);

export default LinkCart;
