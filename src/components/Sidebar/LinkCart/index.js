import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import "./index.scss";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };

    this.removeLink = this.removeLink.bind(this);
  }

  componentDidMount() {
    const updateList = list => {
      this.setState({
        list
      });
    };

    chrome.storage.sync.get("tablo_cart", i => {
      if (i.tablo_cart) {
        console.log("cart, ", i.tablo_cart);
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
        console.log("changes.tablo_cart", changes.tablo_cart);
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
            <p>Cart</p>
          </div>
          <ul className="list">{linkList}</ul>
        </div>
      </div>
    );
  }
}

index.propTypes = {};

export default index;
