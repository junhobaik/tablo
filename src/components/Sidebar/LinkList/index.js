import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setDragStatus } from "../../../redux/actions";
import "./index.scss";

class LinkList extends Component {
  constructor(props) {
    super(props);
    this.dragStart = this.dragStart.bind(this);
  }

  dragStart(event) {
    console.log("dargStart", event.target);
    const row = parseInt(event.target.attributes.row.value);
    this.props.onSetDragStatus(null, null, this.props.list[row]);
  }

  render() {
    const linkList = (this.props.list || []).map((v, i) => {
      return (
        <li
          className="link"
          key={"link-" + i}
          draggable="true"
          onDragStart={this.dragStart}
          row={i}
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
          <a href={v.url} target="_blank" draggable="false">
            <span className="link-title">{v.title}</span>
          </a>
        </li>
      );
    });

    return (
      <div className="link-list-component">
        <div className="link-list-title">
          <p>{this.props.title || "NO TITLE"}</p>
        </div>
        <ul className="list">{linkList}</ul>
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

LinkList.propTypes = {};

LinkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkList);

export default LinkList;
