import React from "react";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import LastOrders from "../components/LastOrders";
import { getLastOrders } from "../store/actions/Products";

const mapStateToProps = function (state, ownProps) {
  console.log(ownProps.match.params.id);
  return {
    orders: state.products.lastOrders,
    id: ownProps.match.params.id,
    login: state.login.data
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  ownProps;
  return {
    getOrders: (id) => {
      dispatch(getLastOrders(id));
    }
  };
};

class LastOrderContainer extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log(this.props.id, "ID de LAST-ORDERS");
    this.props.getOrders(this.props.id);
  }

  render() {
    return(
      <div>
        <LastOrders orders={this.props.orders}/>;
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LastOrderContainer);
