import React from "react";
import { connect } from "react-redux";
import Input from "../components/Input";
import Products from "../components/Products";
import { giveMeProducts,findProductsByCategory } from "../store/actions/Products";
import { findCategorys, setCategory } from "../store/actions/Category";


class ProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: "",
      categoryId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setCategoryState = this.setCategoryState.bind(this);
    //this.handleBringCate = this.handleBringCate.bind(this)
  }
  componentDidMount() {
    this.props.findCategorys();
  }

  setCategoryState(value) {
    this.setState({
      categoryId: value,
    });
  }

  handleChange(event) {
    const title = event.target.value;

    console.log("Title en products container:", title);
    console.log(
      "Selected category en products container:",
      this.state.categoryId
    );
    this.props.giveMeProducts({
      title: title,
      id: this.state.categoryId,
    });

    this.setState({ valueSearch: title });
  }

 

  render() {
    return (
      <div>
        <Input
          handleChange={this.handleChange}
          handleCategorys={this.props.categorys}
          valueSearch={this.state.valueSearch}
          setCategory={this.props.setCategory}
          setCategoryState={this.setCategoryState}
          // handleBringCate = {this.handleBringCate}
        />

        <Products products={this.props.products} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.categorys.categorys);
  return {
    products: state.products.products,
    categorys: state.categorys.categorys,
    selectedCategory: state.categorys.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  giveMeProducts: (products) => dispatch(giveMeProducts(products)),
  findCategorys: () => dispatch(findCategorys()),
  setCategory: (id) => dispatch(setCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
