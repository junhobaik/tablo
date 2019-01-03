import {
  ADD_COLUMN,
  ADD_ROW,
  REMOVE_ROW,
  SET_DRAG_STATUS,
  CLEAR_DRAG_STATUS,
  SET_EDIT_STATUS,
  CLEAR_EDIT_STATUS,
  SET_REMOVE_ROW,
  SET_REMOVE_COL,
  SUBMIT_EDIT_TITLE,
  SUBMIT_EDIT_TAB_TITLE,
  LOAD_TABS,
} from '../actions';

let tabInitialState = {
  settingStatus: {
    col: null,
    row: null,
  },
  dragStatus: {
    dragData: null,
    dragCol: null,
    dragRow: null,
  },
  tabList: [
    {
      title: 'Column 1',
      tabs: [
        {
          title: "HUNDRED's Blog",
          url: 'https://junhobaik.github.io',
          favIconUrl: '',
        },
      ],
    },
  ],
};

const tab = (state = tabInitialState, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList,
          {
            title: `New column`,
            tabs: [],
          },
        ],
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
              ...state.tabList[action.col].tabs.slice(action.row),
            ],
          },
          ...state.tabList.slice(action.col + 1),
        ],
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
              ),
            ],
          },
          ...state.tabList.slice(state.dragStatus.dragCol + 1),
        ],
      });

    case SET_DRAG_STATUS:
      return Object.assign({}, state, {
        dragStatus: {
          dragData: action.item,
          dragCol: action.col,
          dragRow: action.row,
        },
      });

    case SET_EDIT_STATUS:
      return Object.assign({}, state, {
        settingStatus: {
          col: action.col,
          row: action.row,
        },
      });

    case SET_REMOVE_ROW:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, state.settingStatus.col),
          {
            title: state.tabList[state.settingStatus.col].title,
            tabs: [
              ...state.tabList[state.settingStatus.col].tabs.slice(
                0,
                state.settingStatus.row
              ),
              ...state.tabList[state.settingStatus.col].tabs.slice(
                state.settingStatus.row + 1
              ),
            ],
          },
          ...state.tabList.slice(state.settingStatus.col + 1),
        ],
      });

    case SET_REMOVE_COL:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, state.settingStatus.col),
          ...state.tabList.slice(state.settingStatus.col + 1),
        ],
      });

    case SUBMIT_EDIT_TITLE:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, state.settingStatus.col),
          {
            title: state.tabList[state.settingStatus.col].title,
            tabs: [
              ...state.tabList[state.settingStatus.col].tabs.slice(
                0,
                state.settingStatus.row
              ),
              {
                title: action.title,
                url:
                  state.tabList[state.settingStatus.col].tabs[
                    state.settingStatus.row
                  ].url,
                favIconUrl:
                  state.tabList[state.settingStatus.col].tabs[
                    state.settingStatus.row
                  ].favIconUrl,
              },
              ...state.tabList[state.settingStatus.col].tabs.slice(
                state.settingStatus.row + 1
              ),
            ],
          },
          ...state.tabList.slice(state.settingStatus.col + 1),
        ],
      });

    case SUBMIT_EDIT_TAB_TITLE:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, state.settingStatus.col),
          {
            title: action.title,
            tabs: state.tabList[state.settingStatus.col].tabs,
          },
          ...state.tabList.slice(state.settingStatus.col + 1),
        ],
      });

    case CLEAR_DRAG_STATUS:
      return Object.assign({}, state, {
        dragStatus: {
          dragData: null,
          dragCol: null,
          dragRow: null,
        },
      });

    case CLEAR_EDIT_STATUS:
      return Object.assign({}, state, {
        settingStatus: {
          col: null,
          row: null,
        },
      });

    case LOAD_TABS:
      return Object.assign({}, state, action.state);

    default:
      return state;
  }
};

export default tab;
