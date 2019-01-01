export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ROW = 'ADD_ROW';
export const REMOVE_ROW = 'REMOVE_ROW';
export const SET_DRAG_STATUS = 'SET_DRAG_STATUS';
export const CLEAR_DRAG_STATUS = 'CLEAR_DRAG_STATUS';
export const SET_EDIT_STATUS = 'SET_EDIT_STATUS';
export const CLEAR_EDIT_STATUS = 'CLEAR_EDIT_STATUS';
export const SET_REMOVE_ROW = 'SET_REMOVE_ROW';
export const SET_REMOVE_COL = 'SET_REMOVE_COL';
export const SUBMIT_EDIT_TITLE = 'SUBMIT_EDIT_TITLE';
export const SUBMIT_EDIT_TAB_TITLE = 'SUBMIT_EDIT_TAB_TITLE';
export const LOAD_TABS = 'LOAD_TABS';

export function addColumn(test) {
  return {
    type: ADD_COLUMN,
  };
}

export function addRow(col, row) {
  return {
    type: ADD_ROW,
    col,
    row,
  };
}

export function removeRow() {
  return {
    type: REMOVE_ROW,
  };
}

export function setDragStatus(col, row, item) {
  return {
    type: SET_DRAG_STATUS,
    col,
    row,
    item,
  };
}

export function clearDragStatus() {
  return {
    type: CLEAR_DRAG_STATUS,
  };
}

export function setEditStatus(col, row) {
  return {
    type: SET_EDIT_STATUS,
    col,
    row,
  };
}

export function clearEditStatus() {
  return {
    type: CLEAR_EDIT_STATUS,
  };
}

export function setRemoveRow() {
  return {
    type: SET_REMOVE_ROW,
  };
}

export function setRemoveCol() {
  return {
    type: SET_REMOVE_COL,
  };
}
export function submitEditTitle(title) {
  return {
    type: SUBMIT_EDIT_TITLE,
    title,
  };
}
export function submitEditTabTitle(title) {
  return {
    type: SUBMIT_EDIT_TAB_TITLE,
    title,
  };
}

export function loadTabs(state) {
  return {
    type: LOAD_TABS,
    state,
  };
}
