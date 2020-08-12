import {
  TRAE_PRODUCTS,
  TRAE_PRODUCT,
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  TRAE_PRODUCTS_BY_TITLE,
  CHECKOUT,
  GET_ORDERS
} from "../constans";
import axios from "axios";
import { setCategory } from "../actions/Category";

const findProducts = (products) => ({
  type: TRAE_PRODUCTS,
  products,
});
const findTitle = (titleProducts) => ({
  type: TRAE_PRODUCTS_BY_TITLE,
  titleProducts,
});

const findProduct = (product) => ({
  type: TRAE_PRODUCT,
  product,
});

export const subtractQuantity = (id)=>{
  return { type: SUB_QUANTITY,
  id,
  }
};

export const addQuantity = (id)=>{
  return { type: ADD_QUANTITY,
  id,
  }
};


const checkOutCart = (obj) => ({
  type: CHECKOUT,
  obj,
});

const findOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});


export const findProductsByCategory = (categoryId) => (dispatch) => {
  axios
    .get(`/api/products/categorys/${categoryId}`)
    .then((listProductsByCate) =>
      dispatch(findProductsByCate(listProductsByCate))
    );
};


export const giveMeProducts = ({ title, id }) => (dispatch) => {
  console.log("Title y selectedCategory:", title, id);
  axios.post("/api/products", { title, id }).then((listProducts) => {
    console.log("Los productos son:", listProducts);
    dispatch(findProducts(listProducts.data));
    setCategory(id);
  });
};

export const giveTheProduct = (productId) => (dispatch) => {
  axios
    .get(`/api/products/${productId}`)
    .then((product) => dispatch(findProduct(product.data)));
};

export const giveMeAllProducts = () => (dispatch) => {
  axios
    .get("/api/products/")
    .then((products) => dispatch(findProducts(products.data)));
};

export const creatingProduct = (info)=> dispatch => {
 
  axios.post('/api/products/create', info)
}

export const addToCartBack = (obj) => () => {
  axios.post("/api/cart", obj)
};


export const deletingProduct = (info) => (dispatch) =>{
  console.log(info.id)
   axios
  .delete("/api/products/delete", ({
    headers: {
      Authorization: "algoaca",
    },
    data: {
      source: info.id,
    },
  }))
}
 export const updatingProduct = (info) => dispatch =>{
   console.log(info, '<----- info que le esta llegando al axios')
   axios.put(`/api/products/delete`, info)
 }
 

//actions
export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};

//remove item action
export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};

export const checkOut = (id) => (dispatch) => {
  axios.put("/api/cart", id)
  .then((res) => {
    let objVaciarCart ={}
    dispatch(checkOutCart(objVaciarCart))});
};

export const getLastOrders = (userId)=> (dispatch) =>{
    console.log("UserId!!!!!!!!", userId)
    axios.post("/api/cart/orders", userId)
    .then((ordersList)=> {
    console.log("ordersList.data!!!!!!!!", ordersList.data)
    dispatch(findOrders(ordersList.data))})
}
