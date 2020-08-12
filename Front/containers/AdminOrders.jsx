import React from "react";
import ListarOrdenes from "../components/ListarOrdenes";
import VerProductos from "../components/VerProductos";
import VerUser from "../components/VerUser";
import { connect } from "react-redux";
import { bringOrders, bringProductsAndUser } from "../store/actions/Users";
class AdminOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.bringOrders();
  }
  render() {
    {
      console.log("Props orders:", this.props);
      console.log("Props recien:", this.props.orders);
    }
    return (
      <div className="contenedorOrdenes">
        <ListarOrdenes
          orders={this.props.orders}
          listInfo={this.props.bringProductsAndUser}
        />
        {this.props.products.length == 0 ? null : (
          <VerProductos productos={this.props.products} />
        )}
        {this.props.user.length == 0 ? null : (
          <VerUser user={this.props.user} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.user.orders,
    products: state.user.data[0],
    user: state.user.data[1],
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    bringOrders: () => {
      dispatch(bringOrders());
    },
    bringProductsAndUser: (idCart, idUser) => {
      dispatch(bringProductsAndUser(idCart, idUser));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
