import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonGroup,
} from "reactstrap";

export class FormImmobilierDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <Form>
        <Row>
          <h1>Details du bien</h1>
        </Row>
        <hr />
        <Row>
          <Col>
            <FormGroup>
              <Label>Surface</Label>
              <InputGroup>
                <Input
                  type="text"
                  name="surface"
                  id="surface"
                  onChange={handleChange("surface")}
                  value={values.surface}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>m²</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Prix</Label>
              <InputGroup>
                <Input
                  type="text"
                  name="prix"
                  id="prix"
                  onChange={handleChange("prix")}
                  value={values.prix}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>DH</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Pièces</Label>
              <Input
                type="number"
                defaultValue="1"
                min="1"
                name="nbrPieces"
                id="nbrPieces"
                onChange={handleChange("nbrPieces")}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Chambres</Label>
              <Input
                type="number"
                defaultValue="1"
                min="1"
                name="nbrChambres"
                id="nbrChambres"
                onChange={handleChange("nbrChambres")}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Salles de bains</Label>
              <Input
                type="number"
                defaultValue="1"
                min="1"
                name="nbeSDB"
                id="nbeSDB"
                onChange={handleChange("nbeSDB")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <h3>Fonctionalité</h3>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <ButtonGroup>
                    <Button color="primary">Jardin</Button>
                    <Button color="primary">Terrasse</Button>
                    <Button color="primary">Garage</Button>
                    <Button color="primary">Ascenseur</Button>
                    <Button color="primary">Concierge</Button>
                    <Button color="primary">Piscine</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            <Button onClick={this.back}>Precedent</Button>
          </Col>
          <Col xs="auto">
            <Button onClick={this.continue}>Suivant</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default FormImmobilierDetails;
