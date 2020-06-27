import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { getAnnonce, clearAnnonces } from "../actions/annonceActions";
import NumberFormat from "react-number-format";
import Map from "./Map";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import PropTypes from "prop-types";
import AddProperty from "./AddProperty";

const spinner = (
  <Fragment>
    <div className="col-md-12">
      <div className="d-flex justify-content-center">
        <span className="spinner-border">loading...</span>
      </div>
    </div>
  </Fragment>
);

class AnnoncePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      animating: false,
      items: [],
    };
  }

  componentDidMount() {
    this.props.getAnnonce(this.props.match.params.annonceId);
  }

  componentWillUnmount() {
    this.props.clearAnnonces();
  }

  next = () => {
    const { annonce } = this.props;
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === annonce.annonces["photos"].length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    const { annonce } = this.props;
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? annonce.annonces["photos"].length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  fonctionalites = (fonctionalite) => {
    return (
      <>
        <b>jardin &nbsp;</b>
        {fonctionalite.jardin ? (
          <i class="fa fa-check fa-green" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times fa-red" aria-hidden="true"></i>
        )}
        &nbsp; <b>terasse &nbsp;</b>
        {fonctionalite.terasse ? (
          <i class="fa fa-check fa-green" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times fa-red" aria-hidden="true"></i>
        )}
        &nbsp; <b>garage &nbsp;</b>
        {fonctionalite.garage ? (
          <i class="fa fa-check fa-green" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times fa-red" aria-hidden="true"></i>
        )}
        &nbsp; <b>ascenseur &nbsp;</b>
        {fonctionalite.ascenseur ? (
          <i class="fa fa-check fa-green" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times fa-red" aria-hidden="true"></i>
        )}
        &nbsp; <b>concierge &nbsp;</b>
        {fonctionalite.concierge ? (
          <i class="fa fa-check fa-green" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times fa-red" aria-hidden="true"></i>
        )}
        &nbsp; <b>piscine &nbsp;</b>
        {fonctionalite.piscine ? (
          <i class="fa fa-check fa-green" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times fa-red" aria-hidden="true"></i>
        )}
      </>
    );
  };

  render() {
    const { activeIndex } = this.state;
    const { annonces, loading } = this.props.annonce;
    const items = annonces["photos"] ? annonces["photos"] : [];
    const {
      titre,
      prix,
      tel,
      type,
      description,
      surface,
      nbrChambres,
      nbrSallesDeBain,
      nbrPieces,
      photos,
      adresse,
      fonctionalite,
    } = annonces;

    return (
      <div>
        <div className="property_details_banner">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-md-8 col-lg-6">
                <div className="comfortable_apartment">
                  <h4>{titre}</h4>
                  {typeof adresse === "undefined" ? (
                    spinner
                  ) : (
                    <p>
                      <img src="/img/svg_icon/location.svg" alt="" />

                      {adresse.adr + ", " + adresse.ville.nomVille}
                    </p>
                  )}
                  <div className="quality_quantity d-flex">
                    <div className="single_quantity">
                      <img src="/img/svg_icon/color_box.svg" alt="" />
                      <span>{surface + " m²"} </span>
                    </div>
                    {type === "Terrain" ? null : (
                      <>
                        <div className="single_quantity">
                          <img src="/img/svg_icon/living-room.svg" alt="" />
                          <span>{nbrPieces + " Pieces"} </span>
                        </div>
                        {type === "Bureaux" ? null : (
                          <>
                            <div className="single_quantity">
                              <img src="/img/svg_icon/color_bed.svg" alt="" />
                              <span>{nbrChambres + " Chambres"} </span>
                            </div>
                          </>
                        )}
                        <div className="single_quantity">
                          <img src="/img/svg_icon/color_bath.svg" alt="" />
                          <span>{nbrSallesDeBain + " Salles de bain"} </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-4 col-lg-6">
                <div className="prise_quantity">
                  <h4>
                    <NumberFormat
                      value={prix}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" DH"}
                    />
                  </h4>
                  <a href="#">
                    <i className="fa fa-phone"></i> {tel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="property_details">
          <div className="container">
            <div className="row">
              {typeof photos === "undefined" ? (
                spinner
              ) : (
                <>
                  <div className="col-xl-12">
                    <div className="property_banner">
                      <Carousel>
                        {photos.map((photo, i) => (
                          <div key={i}>
                            <img src={photo.url} alt={photo.name} />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </>
              )}

              <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div className="details_info">
                  <h4>Description</h4>
                  <p>{description}</p>
                </div>
                <div className="details_info">
                  <h4>Fonctionalitées</h4>
                  {typeof fonctionalite === "undefined"
                    ? "loading..."
                    : this.fonctionalites(fonctionalite)}
                </div>
                <section className="contact-section">
                  <div className="d-none d-sm-block">
                    <Map
                      lat={33.8777261}
                      long={-5.5504494}
                      isMarkerShown
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    ></Map>
                  </div>
                </section>
                <div className="contact_field">
                  <h3>Contact Us</h3>
                  <form action="#">
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <input type="text" placeholder="Your Name" />
                      </div>
                      <div className="col-xl-6 col-md-6">
                        <input type="email" placeholder="Email" />
                      </div>
                      <div className="col-xl-12">
                        <input type="number" placeholder="Phone no." />
                      </div>
                      <div className="col-xl-12">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div className="col-xl-12">
                        <div className="send_btn">
                          <button type="submit" className="send_btn">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddProperty></AddProperty>
      </div>
    );
  }
}

AnnoncePage.propTypes = {
  getAnnonce: PropTypes.func.isRequired,
  clearAnnonces: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  annonce: state.annonce,
});

export default connect(mapStateToProps, { getAnnonce, clearAnnonces })(
  AnnoncePage
);
