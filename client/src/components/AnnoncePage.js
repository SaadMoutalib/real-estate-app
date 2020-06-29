import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { getAnnonce, clearAnnonces } from "../actions/annonceActions";
import NumberFormat from "react-number-format";
import Map from "./Map";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import PropTypes from "prop-types";
import AddProperty from "./AddProperty";

import { AvForm, AvField } from "availity-reactstrap-validation";
import { Alert, Spinner, Row, Col } from "reactstrap";
import emailjs from "emailjs-com";

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
      loading: false,
      message: "",
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  beforeSubmit = (event) => {
    event.persist();
  };

  sendEmail(event, values) {
    event.preventDefault();
    this.setState({ loading: true });

    emailjs
      .sendForm(
        "gmail",
        "template_btLsUfOA",
        event.target,
        "user_enuAZWcVYOwv64ST7gpWc"
      )
      .then(
        (result) => {
          this.setState({ loading: false, message: result.text });
        },
        (error) => {
          this.setState({ loading: false, message: error.text });
        }
      );
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
        <h4>Fonctionalitées</h4>
        <Row className="justify-content-center">
          <Col>
            <p>
              jardin
              {fonctionalite.jardin ? (
                <i className="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </p>
          </Col>
          <Col>
            <p>
              terasse
              {fonctionalite.terasse ? (
                <i className="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </p>
          </Col>
          <Col>
            <p>
              garage
              {fonctionalite.garage ? (
                <i className="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </p>
          </Col>
          <Col>
            <p>
              ascenseur
              {fonctionalite.ascenseur ? (
                <i className="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </p>
          </Col>
          <Col>
            <p>
              concierge
              {fonctionalite.concierge ? (
                <i className="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </p>
          </Col>
          <Col>
            <p>
              piscine
              {fonctionalite.piscine ? (
                <i className="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </p>
          </Col>
        </Row>
      </>
    );
  };

  render() {
    const { activeIndex } = this.state;
    const { annonces, loading } = this.props.annonce;

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
      user,
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
                  {type === "Terrain"
                    ? null
                    : typeof fonctionalite === "undefined"
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
                  <h3></h3>
                  <AvForm
                    onValidSubmit={this.sendEmail}
                    beforeSubmitValidation={this.beforeSubmit}
                  >
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <AvField
                          type="text"
                          name="from_name"
                          id="name"
                          type="text"
                          placeholder="Entrez votre nom"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                            pattern: {
                              value: "^[A-Za-z ]+$",
                              errorMessage:
                                "Ce champs doit contenir que des lettres.",
                            },
                          }}
                        />
                      </div>
                      <input
                        type="hidden"
                        name="to_email"
                        value={typeof user != "undefined" ? user.email : null}
                      />
                      <input
                        type="hidden"
                        name="to_name"
                        value={
                          typeof user != "undefined"
                            ? user.firstname + " " + user.lastname
                            : null
                        }
                      />
                      <div className="col-xl-6 col-md-6">
                        <AvField
                          type="email"
                          name="from_email"
                          placeholder="Email"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                            email: {
                              value: true,
                              errorMessage: "Email invalid.",
                            },
                          }}
                        />
                      </div>
                      <div className="col-xl-12">
                        <AvField
                          type="number"
                          placeholder="Numero de tel."
                          name="tel"
                          id="tel"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                          }}
                        />
                      </div>
                      <div className="col-xl-12">
                        <AvField
                          type="textarea"
                          name="message"
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Message"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                            minLength: {
                              value: 10,
                              errorMessage:
                                "Your name must be between 20 and 255 characters",
                            },
                            maxLength: {
                              value: 255,
                              errorMessage:
                                "Your name must be between 20 and 255 characters",
                            },
                          }}
                        />
                      </div>
                      <div className="col-xl-12">
                        <div className="send_btn">
                          <button type="submit" className="send_btn">
                            {this.state.loading ? (
                              <Spinner size="sm" color="dark" />
                            ) : (
                              <span>Envoyer</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </AvForm>
                  {this.state.message == "OK" ? (
                    <Alert color="success">
                      Votre e-mail a bien été envoyé
                    </Alert>
                  ) : this.state.message != "" ? (
                    <Alert color="danger">
                      Une erreur s'est produite, votre e-mail n'a pas pu être
                      envoyé
                    </Alert>
                  ) : null}
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
