import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import MainContainer from "./MainContainer";
import store from "../store/index";
import Login from "../components/Login";
import Register from "../components/Register";
import ProductsContainer from "../containers/ProductsContainer";
import ProductContainer from "../containers/ProductContainer";
import CartContainer from "../containers/CartContainer";
import AdminContainer from "../containers/AdminContainer";
import LastOrders from "../components/LastOrders";

const mapStateToProps = function (state) {
  return {
    orders: state.products.lastOrders,
  };
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  render() {

    return (
      <Switch>
        <Route exact path="/" render={() => <MainContainer />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/products" component={ProductsContainer} />
        <Route path="/product/:id" component={ProductContainer} />
        <Route path="/cart/orders" render={() => <LastOrders orders={this.props.orders} /> }/>
        <Route path="/cart" component={CartContainer} />
        <Route path="/admin" component={AdminContainer} />
      </Switch>
    );
  }
}

export default connect(mapStateToProps)(Main);
