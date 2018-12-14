import { ADD_COLUMN } from "../actions";
import { combineReducers } from "redux";

const tabInitialState = {
  tabList: [
    {
      num: 1,
      title: "dummy 1",
      tabs: [
        {
          id: 1,
          title: "dummy 1",
          url: "#",
          favIconUrl: "#"
        },
        {
          id: 2,
          title: "dummy 2",
          url: "#",
          favIconUrl: "#"
        },
        {
          id: 3,
          title: "dummy 3",
          url: "#",
          favIconUrl: "#"
        }
      ]
    },
    {
      num: 2,
      title: "dummy 2",
      tabs: [
        {
          id: 1,
          title: "dummy 1",
          url: "#",
          favIconUrl: "#"
        },
        {
          id: 2,
          title: "dummy 2",
          url: "#",
          favIconUrl: "#"
        },
        {
          id: 3,
          title: "dummy 3",
          url: "#",
          favIconUrl: "#"
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
            num: state.tabList.length + 1,
            title: `New column`,
            tabs: []
          }
        ]
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
    default:
      return state;
  }
};

const tabReducer = combineReducers({
  tab,
  extra
});

export default tabReducer;
