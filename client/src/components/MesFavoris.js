import React, { Component } from "react";
import { connect } from "react-redux";
import { getAnnoncesFavoris } from "../actions/annonceActions";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";
import AnnoncesList from "./AnnoncesList";
import AddProperty from "./AddProperty";

class MesFavoris extends Component {
  componentWillMount() {
    this.props.getAnnoncesFavoris(this.props.user.user._id);
  }

  render() {
    const { annonces, loading } = this.props.annonce;
    const array = Array.from(annonces);
    return (
      <>
        <div style={{ paddingTop: "50px" }} className="popular_property">
          <div className="container">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner color="secondary" />
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="section_title mb-40 text-center">
                      <h4>
                        {annonces.length === 0
                          ? "Aucune annonce trouvée"
                          : " Vous avez " + annonces.length + " favoris"}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <AnnoncesList annonce={this.props.annonce}></AnnoncesList>
                </div>
              </>
            )}
          </div>
        </div>
        <AddProperty></AddProperty>
      </>
    );
  }
}

MesFavoris.propTypes = {
  getAnnoncesFavoris: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  annonce: state.annonce,
  user: state.user,
});

const MesFavorisWithRouter = withRouter(MesFavoris);

export default connect(mapStateToProps, { getAnnoncesFavoris })(
  MesFavorisWithRouter
);
