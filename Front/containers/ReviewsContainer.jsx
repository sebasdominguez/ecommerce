import React from "react";
import { connect } from "react-redux";
import InputReview from "../components/InputReview";
import ListaDeReviews from "../components/ListaDeReviews";
import {
  BringMeReviews,
  setearReview,
  setearIds,
} from "../store/actions/Review";

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.productId,
    user: state.login.data.dataUser,
    isLogged: state.login.data.redirect,
    productId: state.products.product.id,
    reviews: state.reviews.reviews,
    orders: state.products.lastOrders,
    listaIds: state.reviews.listaIds,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  BringMeReviews: (id) => dispatch(BringMeReviews(id)),
  setearReview: (data) => dispatch(setearReview(data)),
  setearIds: (listaIds) => dispatch(setearIds(listaIds)),
});

class ReviewsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.generarIdProductos = this.generarIdProductos.bind(this);
  }
  componentDidMount() {
    this.props.BringMeReviews(this.props.id);
    this.generarIdProductos();
  }

  generarIdProductos() {
    var orders = this.props.orders;
    console.log("ORDERS:", orders);
    var idProductos = [];
    for (var i = 0; i < orders.length; i++) {
      for (var j = 0; j < orders[i].Products.length; j++) {
        idProductos.push(orders[i].Products[j].id);
      }
    }

    console.log("Id products:", idProductos);

    this.props.setearIds(idProductos);
  }

  render() {
    return (
      <div>
        {console.log("ListaIDS:", this.props.listaIds)}
        {console.log("ID:", this.props.id)}
        {this.props.listaIds.includes(Number(this.props.id)) ? (
          <InputReview
            setearReview={this.props.setearReview}
            idProduct={this.props.productId}
            dataUser={this.props.user}
          />
        ) : null}
        {this.props.reviews.length > 0 ? (
          <ListaDeReviews reviews={this.props.reviews} />
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
