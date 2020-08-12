import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/Login";
import { failLoginFalse } from "../store/actions/Login";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Redirect } from "react-router-dom";
import Error from "../components/Error";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import NavBar from "../components/NavBar";

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login.data,
  };
};

const mapDispatchToProps = { loginUser, failLoginFalse };

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.submitInfo = this.submitInfo.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  setFalse() {
    this.props.failLoginFalse();
    this.setState({ email: "", password: "" });
  }
  submitInfo(e) {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.props.login.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <NavBar props={this.props} actualPlace={"login"} />
        <div className="contenedorRegister">
          <div style={{ width: "70%" }}>
            <Card>
              <div>
                <img
                  style={{ width: "100%", height: "280px" }}
                  src="https://scontent.faep4-1.fna.fbcdn.net/v/t1.0-9/69712009_972096549799410_4963988776830369792_n.png?_nc_cat=107&_nc_sid=6e5ad9&_nc_ohc=BLWE9QMdglIAX85q_i4&_nc_ht=scontent.faep4-1.fna&oh=68d3a67a640aaa82c3a7dc7b6d47e225&oe=5F1BDD56"
                ></img>
              </div>

              <CardContent>
                <Container maxWidth="sm">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <h2>Login</h2>
                    </Grid>
                    <Grid item xs={12}>
                      <form
                        autoComplete="off"
                        className="loginContainer"
                        action="/api/users/register"
                        method="POST"
                        id="form-register"
                        onSubmit={(e) => {
                          this.submitInfo(e);
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Grid item xs>
                            <TextField
                              required
                              id="outlined-required"
                              label="email"
                              name="email"
                              variant="outlined"
                              value={this.state.email}
                              onChange={this.changeEmail}
                            />
                          </Grid>

                          <Grid item xs>
                            <TextField
                              required
                              id="outlined-password-input"
                              label="Password"
                              type="password"
                              name="password"
                              value={this.state.password}
                              autoComplete="current-password"
                              variant="outlined"
                              onChange={this.changePassword}
                            />
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>

                    <Grid item xs={12}>
                      {this.props.login.failLogin ? (
                        <div>
                          <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<ErrorOutlineIcon></ErrorOutlineIcon>}
                            className="buttonInput"
                            type="submit"
                            form="form-register"
                            label="Submit"
                            onClick={() => this.setFalse()}
                          >
                            Not valid data,click me and try again!
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          endIcon={<Icon>send</Icon>}
                          className="buttonInput"
                          type="submit"
                          form="form-register"
                          label="Submit"
                        >
                          Sing In
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Container>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
