import React from "react";
import AddCategories from "../components/AddCategory";
import ListAndRemoveCategories from "../components/ListAndRemoveCategories";
import { connect } from "react-redux";
import {
  categorySend,
  findCategorys,
  removeCategory,
} from "../store/actions/Category";

class AdminCategories extends React.Component {
  componentDidMount() {
    this.props.findCategorys();
  }

  render() {
    return (
      <div className="categoriesContainer">
        <AddCategories categorySend={this.props.categorySend} />
        <ListAndRemoveCategories
          categories={this.props.categories.slice(1)}
          removeCategory={this.props.removeCategory}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categorys.categorys,
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    categorySend: (name) => {
      dispatch(categorySend(name));
    },
    findCategorys: () => {
      dispatch(findCategorys());
    },
    removeCategory: (name) => {
      dispatch(removeCategory(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);
