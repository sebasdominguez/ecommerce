import React from "react";
import { connect } from "react-redux";
import NavBarAdmin from "../components/NavBarAdmin";
import AdminProductsContainer from "./AdminProducts";
import AdminCategories from "../containers/AdminCategories";
import AdminUser from "../containers/AdminUser";
import Gif from "../components/assets/tubrr-082.gif";
import AdminOrders from "../containers/AdminOrders";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
    this.selectedItem = this.selectedItem.bind(this);
  }

  selectedItem(item) {
    this.setState({ selected: item });
  }
  render() {
    return (
      <div>
        <NavBarAdmin props={this.props} selected={this.selectedItem} />
        {this.state.selected == "products" ? <AdminProductsContainer /> : null}
        {this.state.selected == "categories" ? <AdminCategories /> : null}
        {this.state.selected == "users" ? <AdminUser /> : null}
        {this.state.selected == "orders" ? <AdminOrders /> : null}{" "}
        <img width="100%" height="100%" src={Gif} />
        {/*Esto lo vemos despues*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login.data,
    products: state.products.products,
    items: state.products.addedItems,
    isAdmin: state.login.data.dataUser.isAdmin,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
