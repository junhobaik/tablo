import { ADD_COLUMN, ADD_ROW, REMOVE_ROW, SET_DRAG_STATUS, CLEAR_DRAG_STATUS } from "../actions";
import { combineReducers } from "redux";

let tabInitialState = JSON.parse(localStorage.getItem('tablo')) || {
  dragStatus: {
    dragData: null,
    dragCol: null,
    dragRow: null
  },
  tabList: [
    {
      title: "Column 1",
      tabs: [
        {
          title: "HUNDRED's Blog",
          url: "https://junhobaik.github.io",
          favIconUrl: ""
        }
      ]
    }
  ]
};

const tab = (state = tabInitialState, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList,
          {
            title: `New column`,
            tabs: []
          }
        ]
      });
    case ADD_ROW:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, action.col),
          {
            title: state.tabList[action.col].title,
            tabs: [
              ...state.tabList[action.col].tabs.slice(0, action.row),
              state.dragStatus.dragData,
              ...state.tabList[action.col].tabs.slice(action.row)
            ]
          },
          ...state.tabList.slice(action.col + 1)
        ]
      });
    case REMOVE_ROW:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, state.dragStatus.dragCol),
          {
            title: state.tabList[state.dragStatus.dragCol].title,
            tabs: [
              ...state.tabList[state.dragStatus.dragCol].tabs.slice(
                0,
                state.dragStatus.dragRow
              ),
              ...state.tabList[state.dragStatus.dragCol].tabs.slice(
                state.dragStatus.dragRow + 1
              )
            ]
          },
          ...state.tabList.slice(state.dragStatus.dragCol + 1)
        ]
      });
    case SET_DRAG_STATUS:
      return Object.assign({}, state, {
        dragStatus: {
          dragData: action.item,
          dragCol: action.col,
          dragRow: action.row
        }
      });
    default:
      return state;
  }
};

const extraInitialState = {
  value: "extra"
};

const extra = (state = extraInitialState, action) => {
  switch (action.type) {
    case CLEAR_DRAG_STATUS:
      return Object.assign({}, state, {
        dragStatus: {
          dragData: null,
          dragCol: null,
          dragRow: null
        }
      });
    default:
      return state;
  }
};

const tabReducer = combineReducers({
  tab,
  extra
});

export default tabReducer;
