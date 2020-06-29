import React, { Component } from "react";
import AnnoncesList from "./AnnoncesList";
import { getAnnonces } from "../actions/annonceActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import SearchForm from "./SearchForm";
import AddProperty from "./AddProperty";
const queryString = require("query-string");

class Annonces extends Component {
  componentDidMount() {
    this.props.getAnnonces(queryString.parse(this.props.location.search));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.getAnnonces(queryString.parse(this.props.location.search));
    }
  }

  render() {
    const { annonces, loading } = this.props.annonce;
    return (
      <>
        <div className="slider_area">
          <div className="single_slider single_slider2  d-flex align-items-center property_bg overlay2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-10 offset-xl-1">
                  <div className="property_wrap">
                    <div className="slider_text text-center justify-content-center">
                      <h3>Rechercher une propriété</h3>
                    </div>
                    <div className="property_form">
                      <SearchForm></SearchForm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popular_property plus_padding">
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
                          : annonces.length + " Annonces trouvées"}
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

Annonces.propTypes = {
  getAnnonces: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  annonce: state.annonce,
});

export default connect(mapStateToProps, { getAnnonces })(Annonces);
