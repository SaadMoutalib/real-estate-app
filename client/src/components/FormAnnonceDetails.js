import React, { Component } from "react";
import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

export class FormAnnonceDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleAdresseChange, handleChange } = this.props;
    return (
      <Form>
        <Row>
          <h1>Details de l'annonce</h1>
        </Row>
        <hr />
        <Row>
          <Col>
            <Row>
              <h4>Type du bien</h4>
            </Row>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      onChange={handleChange("type")}
                      value="Appartement"
                    />
                    Appartement
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      onChange={handleChange("type")}
                      value="Villa"
                    />
                    Villa
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      onChange={handleChange("type")}
                      value="Maison"
                    />
                    Maison
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      onChange={handleChange("type")}
                      value="Terrain"
                    />
                    Terrain
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      onChange={handleChange("type")}
                      value="Bureaux"
                    />
                    Bureaux
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      onChange={handleChange("type")}
                      value="Riad"
                    />
                    Riad
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <h4>Etat du bien</h4>
            </Row>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="etat"
                      onChange={handleChange("etat")}
                      value="Nouveau"
                    />
                    Nouveau
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="etat"
                      onChange={handleChange("etat")}
                      value="Bon etat"
                    />
                    Bon état
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="etat"
                      onChange={handleChange("etat")}
                      value="A renover"
                    />
                    A renover
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Row>
              <h4>Emplacement</h4>
            </Row>
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label>Adresse</Label>
                  <Input
                    type="text"
                    name="adresse"
                    id="adresse"
                    onChange={handleAdresseChange("adresse")}
                    defaultValue={values.adresse.adresse}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Région</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={handleAdresseChange("region")}
                    defaultValue={values.adresse.region}
                  >
                    <option>Meknes-tafilalt</option>
                    <option>Fes-boulemen</option>
                    <option>Marrakech-Tensift-Al-Haouz</option>
                    <option>Souss-Massa-Draa</option>
                    <option>Tanger-Tetouan</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Ville</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={handleAdresseChange("ville")}
                    defaultValue={values.adresse.ville}
                  >
                    <option>Meknes</option>
                    <option>Fes</option>
                    <option>Rabat</option>
                    <option>Casablanca</option>
                    <option>Tanger</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Quartier</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={handleAdresseChange("quartier")}
                    defaultValue={values.adresse.quartier}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button onClick={this.continue}>Suivant</Button>
      </Form>
    );
  }
}

export default FormAnnonceDetails;
