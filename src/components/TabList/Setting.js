import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import {
  setEditStatus,
  clearEditStatus,
  setRemoveRow,
  setRemoveCol
} from "../../redux/actions";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.clickRemove = this.clickRemove.bind(this);
  }

  clickRemove(e) {
    console.log("clickRemove()", e.target, this.props.col, this.props.row);

    const col = parseInt(this.props.col);
    const row = parseInt(this.props.row);

    this.props.onSetEditStatus(col, row);
    if (row !== NaN) {
      this.props.onSetRemoveRow();
    } else {
      this.props.onSetRemoveCol();
    }
    this.props.onClearEditStatus();
  }

  render() {
    return (
      <div className="setting-component">
        <div className="remove" onClick={this.clickRemove}>
          <Fa className="no-event" icon="trash-alt" />
        </div>
        <div className="modify">
          <Fa className="no-event" icon="edit" />
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onSetEditStatus: (col, row) => dispatch(setEditStatus(col, row)),
    onClearEditStatus: () => dispatch(clearEditStatus()),
    onSetRemoveRow: () => dispatch(setRemoveRow()),
    onSetRemoveCol: () => dispatch(setRemoveCol())
  };
};

let mapStateToProps = state => {
  return {
    settingStatus: state.tab.settingStatus
  };
};

Setting.propTypes = {};

Setting = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default Setting;
