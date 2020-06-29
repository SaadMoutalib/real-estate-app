import React, { Component } from "react";

import AnnonceList from "./AnnoncesList";
import SliderArea from "./SliderArea";
import { getAnnonces } from "../actions/annonceActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import AddProperty from "./AddProperty";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    this.props.getAnnonces();
  }

  render() {
    const { annonces, loading } = this.props.annonce;
    return (
      <>
        <SliderArea />
        <div>
          <div className="popular_property">
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
                        <h3>Annonces Populaire</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {annonces.length === 0 ? (
                      <div className="col-xl-12 text-center">
                        <h4> Aucune annonce trouvée</h4>
                      </div>
                    ) : (
                      <AnnonceList annonce={this.props.annonce} />
                    )}
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="more_property_btn text-center">
                        <a href="/annonces" className="boxed-btn3-line">
                          Plus d'annonces
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="team_area">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="section_title mb-40 text-center">
                    <h3>Explorer les annonces de chaque villes</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6">
                  <div className="single_team">
                    <div className="team_thumb">
                      <Link to="/annonces?ville=Casablanca">
                        <img src="/img/cities/casablanca.jpg" alt="" />
                      </Link>
                    </div>
                    <div className="team_info text-center">
                      <h3>Casablanca</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6">
                  <div className="single_team">
                    <div className="team_thumb">
                      <Link to="/annonces?ville=Marrakesh">
                        <img src="/img/cities/marrakesh.jpg" alt="" />
                      </Link>
                    </div>
                    <div className="team_info text-center">
                      <h3>Marrakesh</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6">
                  <div className="single_team">
                    <div className="team_thumb">
                      <Link to="/annonces?ville=Tanger">
                        <img src="/img/cities/tanger.jpg" alt="" />
                      </Link>
                    </div>
                    <div className="team_info text-center">
                      <h3>Tanger</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6">
                  <div className="single_team">
                    <div className="team_thumb">
                      <Link to="/annonces?ville=Rabat">
                        <img src="/img/cities/rabat.jpg" alt="" />
                      </Link>
                    </div>
                    <div className="team_info text-center">
                      <h3>Rabat</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AddProperty></AddProperty>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  getAnnonces: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  annonce: state.annonce,
});

const HomeWithRouter = withRouter(Home);

export default connect(mapStateToProps, { getAnnonces })(HomeWithRouter);
