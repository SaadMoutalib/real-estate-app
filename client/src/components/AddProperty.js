import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddProperty extends Component {
  render() {
    const { user, isAuthenticated } = this.props.user;
    return (
      <div className="contact_action_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-7">
              <div className="action_heading">
                <h3>Ajoutez votre propriété à vendre</h3>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="call_add_action">
                <span>+212 575 963 212</span>
                <Link
                  className="boxed-btn3-line"
                  to={isAuthenticated ? "/profile/post/" + user._id : "/login"}
                >
                  Ajouter une annonce
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProperty.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AddProperty);
