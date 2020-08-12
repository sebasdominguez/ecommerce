import React from "react";
import ListUser from "../components/ListUsers";
import { connect } from "react-redux";
import { fetchUsers, deleteUser, promoteAdmin } from "../store/actions/Users";
class AdminUser extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    {
      console.log("Login:", this.props.login);
    }
    return (
      <div className="categoriesContainer">
        <ListUser
          users={this.props.users.filter(
            (x) => x.id != this.props.login.data.dataUser.id
          )}
          removeUser={this.props.deleteUser}
          upgradeUser={this.props.promoteAdmin}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.user.users,
    login: state.login,
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    deleteUser: (idUser) => {
      dispatch(deleteUser(idUser));
    },
    promoteAdmin: (idUser) => {
      dispatch(promoteAdmin(idUser));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
