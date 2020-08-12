import { REGISTER_USER } from "../constans";

const initialState = {
  data: { dataUser: {}, failRegister: false, redirect: false },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, data: action.data };
    default:
      return state;
  }
}
