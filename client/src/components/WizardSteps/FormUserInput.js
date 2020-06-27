import React, { Component } from "react";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import { Button, Col, Row, Label } from "reactstrap";
import ImageUploader from "react-images-upload";

export class FormUserInput extends Component {
  continue = (e) => {
    this.props.nextStep();
  };

  back = (e) => {
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, onDrop } = this.props;
    return (
      <AvForm onValidSubmit={this.continue}>
        <Row>
          <h1>Information complémentaire</h1>
        </Row>
        <hr />
        <Row>
          <Col xs="8">
            <AvGroup>
              <Label>Titre</Label>
              <AvInput
                type="text"
                name="titre"
                id="titre"
                onChange={handleChange("titre")}
                defaultValue={values.titre}
                required
              />
              <AvFeedback>Insérez un titre</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label>Tel</Label>
              <AvInput
                type="text"
                name="tel"
                id="tel"
                onChange={handleChange("tel")}
                defaultValue={values.tel}
                required
              />
              <AvFeedback>Insérez un numéro de téléphone</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="exampleText">Description</Label>
              <AvInput
                type="textarea"
                name="description"
                id="description"
                defaultValue={values.description}
                onChange={handleChange("description")}
                required
              />
              <AvFeedback>Insérez une description</AvFeedback>
            </AvGroup>
            <ImageUploader
              defaultImages={values.pictures.urls}
              withIcon={true}
              withPreview={true}
              buttonText="Inserez vos images"
              onChange={onDrop}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
              required
            />
          </Col>
        </Row>
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

export default FormUserInput;
