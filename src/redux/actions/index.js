export const ADD_COLUMN = "ADD_COLUMN";
export const ADD_ROW = "ADD_ROW";
export const REMOVE_ROW = "REMOVE_ROW";
export const SET_DRAG_STATUS = "SET_DRAG_STATUS";

export function addColumn(test) {
  console.log("addColumn");
  return {
    type: ADD_COLUMN
  };
}

export function addRow(col, row) {
  console.log("addRow", col, row);
  return {
    type: ADD_ROW,
    col,
    row
  };
}

export function removeRow() {
  console.log("removeRow");
  return {
    type: REMOVE_ROW
  };
}

export function setDragStatus(col, row, item) {
  console.log("setDragStatus", col, row, item);
  return {
    type: SET_DRAG_STATUS,
    col,
    row,
    item
  };
}
