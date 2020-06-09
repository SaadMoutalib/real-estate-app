import React, { Component } from "react";
import { Button, Col, Row, ListGroup, ListGroupItem } from "reactstrap";

export class ConfirmForm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div>
        <Row>
          <h1>Information complémentaire</h1>
        </Row>
        <hr />
        <Col>
          <ListGroup>
            <ListGroupItem>Type : {values.type}</ListGroupItem>
            <ListGroupItem>Etat : {values.etat}</ListGroupItem>
            <ListGroupItem>Titre : {values.titre}</ListGroupItem>
            <ListGroupItem>Adresse : {values.adresse.adresse}</ListGroupItem>
            <ListGroupItem>Region : {values.adresse.region}</ListGroupItem>
            <ListGroupItem>Ville : {values.adresse.ville}</ListGroupItem>
            <ListGroupItem>Quartier : {values.adresse.quartier}</ListGroupItem>
            <ListGroupItem>Description : {values.description}</ListGroupItem>
            <ListGroupItem>Tel : {values.tel}</ListGroupItem>
            <ListGroupItem>Nombre de pieces : {values.nbrPieces}</ListGroupItem>
            <ListGroupItem>
              Nombre de salles de bain : {values.nbeSDB}
            </ListGroupItem>
            <ListGroupItem>
              Nombre de chambre : {values.nbrChambres}
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
            <Button onClick={this.continue}>Confirmer</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ConfirmForm;
