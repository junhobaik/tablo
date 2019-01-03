import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  setEditStatus,
  clearEditStatus,
  setRemoveRow,
  setRemoveCol,
} from '../../../redux/actions';

class Setting extends Component {
  compMouseEnter = e => {
    this.props.onSetEditStatus(
      parseInt(this.props.col),
      parseInt(this.props.row)
    );
  };

  clickRemove = e => {
    if (this.props.row !== undefined) {
      this.props.onSetRemoveRow();
    } else {
      this.props.onSetRemoveCol();
    }
  };

  clickModify = e => {
    const link = e.target.parentNode.parentNode.parentNode;

    const editInputs = document.querySelectorAll('.edit');
    for (let v of editInputs) {
      v.style.display = 'none';
    }
    const titles = document.querySelectorAll('.title');
    for (let v of titles) {
      v.style.display = 'inline';
    }

    if (this.props.row !== undefined) {
      const titleText = link.querySelector('a>.title-text');
      const titleEdit = link.querySelector('a>.title-edit');

      titleText.style.display = 'none';
      titleEdit.style.display = 'inline';
      titleEdit.focus();
    } else {
      const tabTitle = link.querySelector('.tab-title');
      const tabTitleEdit = link.querySelector('.tab-title-edit');

      tabTitle.style.display = 'none';
      tabTitleEdit.style.display = 'inline';
      tabTitleEdit.focus();
    }
  };

  render() {
    return (
      <div className="setting-component" onMouseEnter={this.compMouseEnter}>
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
    onSetRemoveCol: () => dispatch(setRemoveCol()),
  };
};

Setting = connect(
  null,
  mapDispatchToProps
)(Setting);

export default Setting;
