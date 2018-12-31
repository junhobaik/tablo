import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import LinkList from "../LinkList";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    const updateList = list => {
      this.setState({
        list
      })
    }

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

  render() {
    return (
      <div id="LinkCart">
        <LinkList title="Link Cart" list={this.state.list} />
      </div>
    );
  }
}

index.propTypes = {};

export default index;
