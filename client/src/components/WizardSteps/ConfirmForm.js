import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Form,
  Spinner,
} from "reactstrap";
import { addAnnonces } from "../../actions/annonceActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import { withRouter } from "react-router-dom";

export class ConfirmForm extends Component {
  constructor(props) {
    super(props);
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  componentDidUpdate() {
    this.props.dispatch(this.props.history.push("/"));
  }

  static propTypes = {
    user: PropTypes.object,
    addAnnonces: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { values } = this.props;
    const { user } = this.props;

    const annonce = {
      titre: values.titre,
      prix: values.prix,
      tel: values.tel,
      surface: values.surface,
      nbrChambres: values.nbrChambres,
      nbrSallesDeBain: values.nbrSallesDeBain,
      nbrPieces: values.nbrPieces,
      type: values.type,
      etat: values.etat,
      description: values.description,
      userid: user.user._id,
      adresse: values.adresse.adresse,
      ville: values.adresse.ville._id,
      fonctionalite: values.fonctionalite,
      pictures: values.pictures,
    };

    this.props.addAnnonces(annonce);
  };

  render() {
    const { values, loading } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <h1>Confirmation</h1>
        </Row>
        <hr />
        <Col>
          <ListGroup>
            <ListGroupItem>
              <b>Type : </b>
              {values.type}
            </ListGroupItem>
            <ListGroupItem>
              <b>Etat : </b>
              {values.etat}
            </ListGroupItem>
            <ListGroupItem>
              <b>Titre : </b>
              {values.titre}
            </ListGroupItem>
            <ListGroupItem>
              <b>Adresse : </b>
              {values.adresse.adresse}
            </ListGroupItem>
            <ListGroupItem>
              <b>Region : </b>
              {values.adresse.region.nomRegion}
            </ListGroupItem>
            <ListGroupItem>
              <b>Ville : </b>
              {values.adresse.ville.nomVille}
            </ListGroupItem>
            <ListGroupItem>
              <b>Description : </b>
              {values.description}
            </ListGroupItem>
            <ListGroupItem>
              <b>Tel : {values.tel}</b>
            </ListGroupItem>
            <ListGroupItem>
              <b>Prix : </b>
              <NumberFormat
                value={values.prix}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" DH"}
              />
            </ListGroupItem>
            <ListGroupItem>
              <b>Surface :</b> {values.surface} m²
            </ListGroupItem>
            {values.type === "Terrain" ? null : (
              <>
                <ListGroupItem>
                  <b>Nombre de pieces : </b>
                  {values.nbrPieces}
                </ListGroupItem>
                {values.type === "Bureaux" ? null : (
                  <>
                    <ListGroupItem>
                      <b> Nombre de chambre : </b>
                      {values.nbrChambres}
                    </ListGroupItem>
                  </>
                )}
                <ListGroupItem>
                  <b> Nombre de salles de bain : </b>
                  {values.nbrSallesDeBain}
                </ListGroupItem>
              </>
            )}
            <ListGroupItem>
              <b>jardin :&nbsp;</b>
              {values.fonctionalite.jardin ? (
                <i class="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times fa-red" aria-hidden="true"></i>
              )}
              &nbsp; <b>terasse :&nbsp;</b>
              {values.fonctionalite.terasse ? (
                <i class="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times fa-red" aria-hidden="true"></i>
              )}
              &nbsp; <b>garage :&nbsp;</b>
              {values.fonctionalite.garage ? (
                <i class="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times fa-red" aria-hidden="true"></i>
              )}
              &nbsp; <b>ascenseur :&nbsp;</b>
              {values.fonctionalite.ascenseur ? (
                <i class="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times fa-red" aria-hidden="true"></i>
              )}
              &nbsp; <b>concierge: &nbsp;</b>
              {values.fonctionalite.concierge ? (
                <i class="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times fa-red" aria-hidden="true"></i>
              )}
              &nbsp; <b>piscine : &nbsp;</b>
              {values.fonctionalite.piscine ? (
                <i class="fa fa-check fa-green" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-times fa-red" aria-hidden="true"></i>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <b>Photos : </b>
              <br />
              <Row>
                {values.pictures.urls.lenght == 0
                  ? null
                  : values.pictures.urls.map((url, id) => (
                      <div key={id} class="row gallery-item">
                        <div class="col-md-4">
                          <img
                            style={{ marginLeft: "20px" }}
                            className="single-gallery-image"
                            src={url}
                          ></img>
                        </div>
                      </div>
                    ))}
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <br />
        <br />
        <Row>
          <Col xs="auto">
            <Button onClick={this.back}>Precedent</Button>
          </Col>
          <Col xs="auto">
            <Button>
              {loading ? (
                <Spinner size="sm" color="white"></Spinner>
              ) : (
                "Confirmer"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.annonce.loading,
});

const ConfirmFormWithRouter = withRouter(ConfirmForm);
export default connect(mapStateToProps, { addAnnonces })(ConfirmFormWithRouter);
