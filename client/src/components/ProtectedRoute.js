import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const { isAuthenticated, isLoading } = this.props.user;

    return (
      <Route
        path={this.props.path}
        render={(data) =>
          isLoading ? (
            <Spinner style={{ left: "50%" }} size="lg" color="black"></Spinner>
          ) : isAuthenticated ? (
            <this.props.component {...data}></this.props.component>
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
