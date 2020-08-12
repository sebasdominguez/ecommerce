import React from "react";
import { connect } from "react-redux";
import Product from "../components/Product";
import { giveTheProduct, addToCart, addToCartBack, addQuantity, subtractQuantity } from "../store/actions/Products";
import ReviewsContainer from "../containers/ReviewsContainer";
import NavBar from "../components/NavBar";
import Gif from "../components/assets/tubrr-082.gif";

const mapStateToProps = function (state, ownProps) {
  console.log(ownProps.match.params.id);
  return {
    product: state.products.product,
    id: ownProps.match.params.id,
    login: state.login.data,
    items: state.products.addedItems,
    total: state.products.total
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  ownProps;
  return {
    giveTheProduct: (id) => {
      dispatch(giveTheProduct(id));
    },
    addToCart: (itemID) => dispatch(addToCart(itemID)),
    addToCartBack: (obj) => dispatch(addToCartBack(obj)),
    addQuantity: (id, obj) => dispatch(addQuantity(id, obj)),
    subtractQuantity: (id, obj) => dispatch(subtractQuantity(id, obj))
  };
};

class ProductContainer extends React.Component {
  constructor() {
    super();
    this.state = { 
      quantity: 0,
      price: 0,
      UserId: 0, 
      adress: "",
      ProductId: 0,
      total: 0
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this);
  }

  componentDidMount() {
    this.props.giveTheProduct(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.state.UserId !== 0)
      this.props.addToCartBack(this.state);
  }

  handleAddToCart(id) {
    let item = this.props.product
    this.setState({
      UserId: this.props.login.dataUser.id, 
      adress: this.props.login.dataUser.adress,
      quantity:1, 
      ProductId: item.id, 
      price: item.price,
      total: this.props.total+item.price
    })
    this.props.addToCart(id);
  }

  //to add the quantity
  handleAddQuantity(id) {
    let item = this.props.product
    this.setState({
      UserId: this.props.login.dataUser.id, 
      adress: this.props.login.dataUser.adress,
      quantity: item.quantity+1, 
      ProductId: item.id, 
      price: item.price,
      total: this.props.total+item.price
    })
    this.props.addQuantity(id);
  }
  
  //to substruct from the quantity
  handleSubtractQuantity(id) {
   let item = this.props.product
    this.setState({
      UserId: this.props.login.dataUser.id, 
      adress: this.props.login.dataUser.adress,
      quantity: item.quantity-1, 
      ProductId: item.id, 
      price: item.price,
      total: this.props.total-item.price
    })
    this.props.subtractQuantity(id);
  }

 render() {
    return (
      <div>
        <NavBar props={this.props} />

        <div className="productContainer">
          <div className="productSelf">
            <Product
          props={this.props}
          user={this.props.login}
          product={this.props.product}
          addToCart={this.handleAddToCart}
          items={this.props.items} 
          add={this.handleAddQuantity} 
          rest={this.handleSubtractQuantity}
          total={this.props.total}
        ></Product>
          </div>
          <div className="reviewSelf">
            <ReviewsContainer productId={this.props.id} />
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
