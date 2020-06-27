import React, { Component } from "react";
import { AvForm, AvGroup, AvInput } from "availity-reactstrap-validation";
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonGroup,
} from "reactstrap";

export class FormImmobilierDetails extends Component {
  continue = (e) => {
    this.props.nextStep();
  };

  back = (e) => {
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, handleFonctionalite } = this.props;
    return (
      <AvForm onValidSubmit={this.continue}>
        <Row>
          <h1>Details du bien</h1>
        </Row>
        <hr />
        <Row>
          <Col>
            <AvGroup>
              <Label>Surface</Label>
              <InputGroup>
                <AvInput
                  type="number"
                  name="surface"
                  onChange={handleChange("surface")}
                  defaultValue={values.surface}
                  min="0"
                  required
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>m²</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </AvGroup>
          </Col>
          <Col>
            <AvGroup>
              <Label>Prix</Label>
              <InputGroup>
                <AvInput
                  type="number"
                  name="prix"
                  id="prix"
                  min="0"
                  onChange={handleChange("prix")}
                  defaultValue={values.prix}
                  required
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>DH</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </AvGroup>
          </Col>
        </Row>
        {values.type === "Terrain" ? null : (
          <>
            <Row>
              <Col>
                <AvGroup>
                  <Label>Pièces</Label>
                  <AvInput
                    type="number"
                    defaultValue={values.nbrPieces}
                    min="0"
                    name="nbrPieces"
                    id="nbrPieces"
                    onChange={handleChange("nbrPieces")}
                    required
                  />
                </AvGroup>
              </Col>
              {values.type === "Bureaux" ? null : (
                <Col>
                  <AvGroup>
                    <Label>Chambres</Label>
                    <AvInput
                      type="number"
                      defaultValue={values.nbrChambres}
                      min="0"
                      name="nbrChambres"
                      id="nbrChambres"
                      onChange={handleChange("nbrChambres")}
                      required
                    />
                  </AvGroup>
                </Col>
              )}
              <Col>
                <AvGroup>
                  <Label>Salles de bains</Label>
                  <AvInput
                    type="number"
                    defaultValue={values.nbrSallesDeBain}
                    min="0"
                    name="nbrSallesDeBain"
                    id="nbrSallesDeBain"
                    onChange={handleChange("nbrSallesDeBain")}
                    required
                  />
                </AvGroup>
              </Col>
            </Row>

            <br />
            <Row>
              <Col>
                <Row>
                  <h3>Fonctionalité</h3>
                </Row>
                <br />
                <Row>
                  <Col>
                    <FormGroup>
                      <ButtonGroup>
                        <Button
                          onClick={handleFonctionalite("jardin")}
                          active={values.fonctionalite.jardin}
                          color="primary"
                        >
                          Jardin
                        </Button>
                        <Button
                          onClick={handleFonctionalite("terasse")}
                          active={values.fonctionalite.terasse}
                          color="primary"
                        >
                          Terrasse
                        </Button>
                        <Button
                          onClick={handleFonctionalite("garage")}
                          active={values.fonctionalite.garage}
                          color="primary"
                        >
                          Garage
                        </Button>
                        <Button
                          onClick={handleFonctionalite("ascenseur")}
                          active={values.fonctionalite.ascenseur}
                          color="primary"
                        >
                          Ascenseur
                        </Button>
                        <Button
                          onClick={handleFonctionalite("concierge")}
                          active={values.fonctionalite.concierge}
                          color="primary"
                        >
                          Concierge
                        </Button>
                        <Button
                          onClick={handleFonctionalite("piscine")}
                          active={values.fonctionalite.piscine}
                          color="primary"
                        >
                          Piscine
                        </Button>
                      </ButtonGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <br />
        <Row>
          <Col xs="auto">
            <Button onClick={this.back}>Precedent</Button>
          </Col>
          <Col xs="auto">
            <Button>Suivant</Button>
          </Col>
        </Row>
      </AvForm>
    );
  }
}

export default FormImmobilierDetails;
