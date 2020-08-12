import { BRING_REVIEW } from "../constans";
import { SET_REVIEW, SET_IDS } from "../constans";

const intialState = {
  reviews: [],
  data: {},
  listaIds: [],
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case BRING_REVIEW:
      return { ...state, reviews: action.reviews };
    case SET_REVIEW:
      return { ...state, data: action.data };
    case SET_IDS:
      return { ...state, listaIds: action.listaIds };
    default:
      return state;
  }
}
