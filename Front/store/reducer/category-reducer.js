import { TRAE_CATEGORY, SET_CATEGORY } from "../constans";

const initialState = {
  categorys: [],
  selectedCategory: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TRAE_CATEGORY:
      return { ...state, categorys: action.categorys };
    case SET_CATEGORY:
      console.log("En el reducer:", action);
      return { ...state, selectedCategory: action.oneCategory };
    default:
      return state;
  }
}
