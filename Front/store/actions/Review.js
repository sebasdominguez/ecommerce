import { SET_REVIEW } from "../constans";
import { BRING_REVIEW, SET_IDS } from "../constans";
import axios from "axios";

const setReview = (data) => ({
  type: SET_REVIEW,
  data,
});

const findReview = (reviews) => ({
  type: BRING_REVIEW,
  reviews,
});

const productosIds = (listaIds) => ({
  type: SET_IDS,
  listaIds,
});

export const BringMeReviews = (ProductId) => (dispatch) => {
  axios.get(`/api/reviews/${ProductId}`).then((ReviewList) => {
    dispatch(findReview(ReviewList.data));
  });
};

export const setearIds = (listaIDs) => (dispatch) => {
  dispatch(productosIds(listaIDs));
};

export const setearReview = ({
  idUser,
  idProduct,
  ratingUser,
  commentUser,
}) => (dispatch) => {
  Promise.all([
    setReview({
      idUser,
      idProduct,
      ratingUser,
      commentUser,
    }),
    ,
    axios.post(`/api/reviews/${idProduct}`, {
      idUser,
      ratingUser,
      commentUser,
    }),
  ]).then(() => {
    dispatch(BringMeReviews(idProduct));
  });
};
