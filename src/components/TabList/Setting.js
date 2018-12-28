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
    this.clickModify = this.clickModify.bind(this);
    this.compMouseEnter = this.compMouseEnter.bind(this);
    this.compMouseLeave = this.compMouseLeave.bind(this);
  }

  compMouseEnter(e){
    console.log('compMouseEnter');
    const col = parseInt(this.props.col);
    const row = parseInt(this.props.row);
    this.props.onSetEditStatus(col, row);
  }
  compMouseLeave(e){
    console.log('compMouseLeave');
    this.props.onClearEditStatus();
  }
  clickRemove(e) {
    console.log("clickRemove()", e.target, this.props.col, this.props.row);

    if (this.props.row !== undefined) {
      this.props.onSetRemoveRow();
    } else {
      this.props.onSetRemoveCol();
    }
  }
  clickModify(e){
    console.log("clickModify()", e.target, this.props.col, this.props.row);
  }

  render() {
    return (
      <div className="setting-component" onMouseEnter={this.compMouseEnter} onMouseLeave={this.compMouseLeave}>
        <div className="remove" onClick={this.clickRemove}>
          <Fa className="no-event" icon="trash-alt" />
        </div>
        <div className="modify" onClick={this.clickModify}>
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
