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
  MOVE_INSIDE_ROW,
  MOVE_COL,
} from '../actions';

const tabInitialState = {
  settingStatus: {
    col: null,
    row: null,
  },
  dragStatus: {
    dragEl: null,
    dragCol: null,
    dragRow: null,
    dragData: null,
  },
  tabList: [
    {
      title: 'Welcome!',
      tabs: [
        {
          title: 'Github - junhobaik',
          url: 'https://github.com/junhobaik',
          favIconUrl: 'https://github.githubassets.com/favicon.ico',
        },
      ],
    },
  ],
};

function moveTabItem(state, action) {
  const { tabList, dragStatus } = state;
  const { dragCol } = dragStatus;
  const { dropCol } = action;

  let temp = [...tabList.slice(0, dragCol), ...tabList.slice(dragCol + 1)];

  temp = [...temp.slice(0, dropCol), tabList[dragCol], ...temp.slice(dropCol)];

  return { ...state, tabList: [...temp] };
}

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

    case MOVE_INSIDE_ROW:
      return Object.assign({}, state, {
        tabList: [
          ...state.tabList.slice(0, state.dragStatus.dragCol),
          {
            title: state.tabList[state.dragStatus.dragCol].title,
            tabs: [
              ...state.tabList[state.dragStatus.dragCol].tabs.slice(
                0,
                state.dragStatus.dragRow < action.dropRow
                  ? state.dragStatus.dragRow
                  : state.dragStatus.dragRow + 1
              ),
              ...state.tabList[state.dragStatus.dragCol].tabs.slice(
                state.dragStatus.dragRow < action.dropRow
                  ? state.dragStatus.dragRow + 1
                  : state.dragStatus.dragRow + 2
              ),
            ],
          },
          ...state.tabList.slice(state.dragStatus.dragCol + 1),
        ],
      });

    case SET_DRAG_STATUS:
      return Object.assign({}, state, {
        dragStatus: {
          dragEl: action.dragEl,
          dragCol: action.col,
          dragRow: action.row,
          dragData: action.item,
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
          dragEl: null,
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

    case MOVE_COL:
      return moveTabItem(state, action);

    default:
      return state;
  }
};

export default tab;
