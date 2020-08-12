import { GET_USERS, SET_ORDERS, SET_DATA } from "../constans";
import axios from "axios";

const listUsers = (list) => ({
  type: GET_USERS,
  list,
});

const setOrders = (list) => ({
  type: SET_ORDERS,
  list,
});

const dataProductUser = (list) => ({
  type: SET_DATA,
  list,
});

export const fetchUsers = () => (dispatch) => {
  return axios
    .get("/api/users")
    .then((lista) => dispatch(listUsers(lista.data)));
};

export const deleteUser = (idUser) => (dispatch) => {
  return axios
    .delete(`/api/users/${idUser}`)
    .then(() => dispatch(fetchUsers()));
};

export const promoteAdmin = (idUser) => (dispatch) => {
  return axios
    .post("/api/users/promoteAdmin", {
      secret: "UpgradeToAdmin",
      idUser: idUser,
    })
    .then(() => {
      dispatch(fetchUsers());
    });
};

export const bringOrders = () => (dispatch) => {
  return axios.get("/api/cart/orders").then((listaOrdenes) => {
    dispatch(setOrders(listaOrdenes.data));
  });
};

export const bringProductsAndUser = (cartId, userId) => (dispatch) => {
  return axios.get(`/api/cart/orders/${cartId}/${userId}`).then((info) => {
    dispatch(dataProductUser(info.data));
  });
};
