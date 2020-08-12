import { TRAE_CATEGORY, SET_CATEGORY } from "../constans";
import axios from "axios";
import { giveMeProducts } from "../actions/Products";
const findCate = (categorys) => ({
  type: TRAE_CATEGORY,
  categorys,
});

const actualCategory = (oneCategory) => ({
  type: SET_CATEGORY,
  oneCategory,
});

export const categorySend = (name) => (dispatch) => {
  return axios
    .post("/api/categorys", name)
    .then((categorys) => dispatch(findCate(categorys.data)));
};

export const findCategorys = () => (dispatch) => {
  return axios
    .get("/api/categorys")
    .then((categorysFound) => dispatch(findCate(categorysFound.data)));
};

export const setCategory = (selectedCategory) => (dispatch) => {
  dispatch(actualCategory(selectedCategory));
};

export const removeCategory = (name) => (dispatch) => {
  return axios
    .delete("/api/categorys", {
      headers: {
        Authorization: "algoaca",
      },
      data: {
        source: name,
      },
    })
    .then(() => {
      dispatch(findCategorys());
    });
};

/* export function setCategory(selectedCategory) {
  dispatch(actualCategory(selectedCategory));
  dispatch(giveMeProducts({ title: "", id: selectedCategory }));

   return (dispatch) => {
    dispatch(actualCategory(selectedCategory));
    setTimeout(() => {
      //Me aseguro que el dispatch anterior realmente surga efecto
      dispatch(giveMeProducts({ title: "", id: selectedCategory }));
    }, 500);
  }; 
} */
