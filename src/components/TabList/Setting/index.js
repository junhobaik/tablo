import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  setEditStatus,
  clearEditStatus,
  setRemoveRow,
  setRemoveCol,
} from '../../../redux/actions';

class Setting extends Component {
  compMouseEnter = () => {
    const { col, row, onSetEditStatus } = this.props;
    onSetEditStatus(parseInt(col, 10), parseInt(row, 10));
  };

  clickRemove = () => {
    const { row, onSetRemoveCol, onSetRemoveRow } = this.props;
    if (row !== undefined) {
      onSetRemoveRow();
    } else {
      onSetRemoveCol();
    }
  };

  clickModify = e => {
    const { row } = this.props;
    const link = e.target.parentNode.parentNode.parentNode.parentNode;

    const editInputs = document.querySelectorAll('.edit');
    for (const v of editInputs) {
      v.style.display = 'none';
    }
    const titles = document.querySelectorAll('.title');
    for (const v of titles) {
      v.style.display = 'inline';
    }

    if (row !== undefined) {
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
        <div className="remove" onClick={this.clickRemove} role="presentation">
          <Fa className="no-event" icon="trash-alt" />
        </div>
        <div className="modify" onClick={this.clickModify} role="presentation">
          <Fa className="no-event" icon="edit" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetEditStatus: (col, row) => dispatch(setEditStatus(col, row)),
    onClearEditStatus: () => dispatch(clearEditStatus()),
    onSetRemoveRow: () => dispatch(setRemoveRow()),
    onSetRemoveCol: () => dispatch(setRemoveCol()),
  };
};

Setting.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  col: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  row: PropTypes.any,
  onSetEditStatus: PropTypes.func.isRequired,
  onSetRemoveRow: PropTypes.func.isRequired,
  onSetRemoveCol: PropTypes.func.isRequired,
};

Setting.defaultProps = {
  col: undefined,
  row: undefined,
};

Setting = connect(
  null,
  mapDispatchToProps
)(Setting);

export default Setting;
