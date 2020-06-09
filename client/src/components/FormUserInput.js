import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

export class FormUserInput extends Component {
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
          <h1>Information complémentaire</h1>
        </Row>
        <hr />
        <FormGroup>
          <Label>Titre</Label>
          <Input
            type="text"
            name="titre"
            id="titre"
            onChange={handleChange("titre")}
            defaultValue={values.titre}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tel</Label>
          <Input
            type="text"
            name="tel"
            id="tel"
            onChange={handleChange("tel")}
            defaultValue={values.tel}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            onChange={handleChange("description")}
            defaultValue={values.description}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Image</Label>
          <Input type="file" name="image" id="exampleFile" />
          <FormText color="muted">Choisissez une image.</FormText>
        </FormGroup>
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

export default FormUserInput;
