import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import ProductosMain from "../components/ProductosMain";
import { giveMeAllProducts } from "../store/actions/Products";
import Carrousel from "./Carrousel";
import Gif from '../components/assets/tubrr-082.gif'

import {
  addToCart,
  addToCartBack,
  addQuantity,
  subtractQuantity,
  getLastOrders,
} from "../store/actions/Products";



const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login.data,
    products: state.products.products,
    items: state.products.addedItems,
    total: state.products.total,
    isAdmin: state.login.data.dataUser.isAdmin,
    idUser: state.login.data.dataUser.id,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  giveMeAllProducts: () => dispatch(giveMeAllProducts()),
  addToCart: (itemID) => dispatch(addToCart(itemID)),
  addToCartBack: (obj) => dispatch(addToCartBack(obj)),
  addQuantity: (id, obj) => dispatch(addQuantity(id, obj)),
  subtractQuantity: (id, obj) => dispatch(subtractQuantity(id, obj)),
  getLastOrders: (idUser) => dispatch(getLastOrders(idUser)),
});

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      price: 0,
      UserId: 0,
      adress: "",
      ProductId: 0,
      total: 0,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this);
  }

  componentDidMount() {
    this.props.giveMeAllProducts();

    this.props.getLastOrders({ UserId: this.props.idUser });
  }

  componentDidUpdate(prevProps) {
    if (this.state.UserId !== 0) this.props.addToCartBack(this.state);
  }

  handleAddToCart(id) {
    let item = this.props.products.find((element) => element.id == id);
    this.setState({
      UserId: this.props.login.dataUser.id,
      adress: this.props.login.dataUser.adress,
      quantity: 1,
      ProductId: item.id,
      price: item.price,
      total: this.props.total + item.price,
    });
    this.props.addToCart(id);
  }

  //to add the quantity
  handleAddQuantity(id) {
    let item = this.props.items.find((element) => element.id == id);
    this.setState({
      UserId: this.props.login.dataUser.id,
      adress: this.props.login.dataUser.adress,
      quantity: item.quantity + 1,
      ProductId: item.id,
      price: item.price,
      total: this.props.total + item.price,
    });
    this.props.addQuantity(id);
  }

  //to substruct from the quantity
  handleSubtractQuantity(id) {
    let item = this.props.items.find((element) => element.id == id);
    this.setState({
      UserId: this.props.login.dataUser.id,
      adress: this.props.login.dataUser.adress,
      quantity: item.quantity - 1,
      ProductId: item.id,
      price: item.price,
      total: this.props.total - item.price,
    });
    this.props.subtractQuantity(id);
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}></NavBar>
        <div className="img">
          <img
            src={Gif}
            width="250px"
            height="250px"
          />
        </div>
        <div className="header">
          <h1 className="titulo">
            Tomate Una
          </h1>
            <small className='chico'> o mas de una!</small>
        </div>

        <Carrousel />
        <ProductosMain
          user={this.props.login}
          tileData={this.props.products}
          addToCart={this.handleAddToCart}
          items={this.props.items}
          add={this.handleAddQuantity}
          rest={this.handleSubtractQuantity}
        ></ProductosMain>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
