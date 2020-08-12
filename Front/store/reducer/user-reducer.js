import { GET_USERS, SET_ORDERS, SET_DATA } from "../constans";

const intialState = {
  users: [],
  orders: [],
  data: [[], []],
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.list };
    case SET_ORDERS:
      return { ...state, orders: action.list };
    case SET_DATA:
      return { ...state, data: action.list };
    default:
      return state;
  }
}
