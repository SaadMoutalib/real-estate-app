import React, { Component } from "react";
import { Button, Col, Row } from "reactstrap";
import { getVillesByRegion, getRegions } from "../../actions/adresseActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";

export class FormAnnonceDetails extends Component {
  continue = (e) => {
    this.props.nextStep();
  };

  handleChangeRegion = (event) => {
    event.persist();
    const { value } = event.target;
    let region = JSON.parse(value);
    this.props.getVillesByRegion(region.nomRegion);
  };

  componentDidMount() {
    this.props.getRegions();
  }

  onSubmit = (e, errors, v) => {
    console.log(v);
  };

  render() {
    const { values, handleAdresseChange, handleChange } = this.props;
    const { regions, villes, loading } = this.props.adresse;
    return (
      <AvForm onSubmit={this.onSubmit} onValidSubmit={this.continue}>
        <Row>
          <h1>Details de l'annonce</h1>
        </Row>
        <hr />
        <Row>
          <Col>
            <Row>
              <AvRadioGroup
                name="type"
                label="Type du bien"
                required
                errorMessage=" "
                onChange={handleChange("type")}
                defaultValue={values.type}
              >
                <Col>
                  <AvRadio label="Appartement" value="Appartement" />
                  <AvRadio label="Villa" value="Villa" />
                  <AvRadio label="Maison" value="Maison" />
                  <AvRadio label="Terrain" value="Terrain" />
                  <AvRadio label="Bureaux" value="Bureaux" />
                  <AvRadio label="Riad" value="Riad" />
                </Col>
              </AvRadioGroup>
            </Row>
          </Col>
          <Col>
            <Row>
              <AvRadioGroup
                name="etat"
                label="Etat du bien"
                required
                errorMessage=" "
                onChange={handleChange("etat")}
                defaultValue={values.etat}
              >
                <Col>
                  <AvRadio label="Nouveau" value="Nouveau" />
                  <AvRadio label="Bon état" value="Bon état" />
                  <AvRadio label="A rénover" value="A rénover" />
                </Col>
              </AvRadioGroup>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Row>
              <legend>Emplacement</legend>
            </Row>
            <Row>
              <Col xs="6">
                <AvField
                  type="text"
                  name="adresse.adresse"
                  label="Adresse"
                  errorMessage="Saisssez une adresse"
                  onChange={handleAdresseChange("adresse")}
                  defaultValue={values.adresse.adresse}
                  required
                />
                <AvField
                  type="select"
                  name="adresse.region"
                  label="Region"
                  disabled={loading}
                  onChange={(e) => {
                    handleAdresseChange("region")(e);
                    this.handleChangeRegion(e);
                  }}
                  errorMessage="Choisissez une region"
                  required
                  defaultValue={values.adresse.region}
                >
                  <option disabled value="">
                    Sélectionnez une région
                  </option>
                  {regions.map((region) => (
                    <option key={region._id} value={JSON.stringify(region)}>
                      {region.nomRegion}
                    </option>
                  ))}
                </AvField>
                <AvField
                  type="select"
                  name="adresse.ville"
                  label="Ville"
                  disabled={villes.length == 0}
                  required
                  defaultValue={values.adresse.ville}
                  errorMessage="Choisissez une ville"
                  onChange={handleAdresseChange("ville")}
                >
                  <option disabled value="">
                    Sélectionnez une ville
                  </option>
                  {villes.map((ville) => (
                    <option key={ville._id} value={JSON.stringify(ville)}>
                      {ville.nomVille}
                    </option>
                  ))}
                </AvField>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button>Suivant</Button>
      </AvForm>
    );
  }
}

FormAnnonceDetails.propTypes = {
  getRegions: PropTypes.func.isRequired,
  getVillesByRegion: PropTypes.func.isRequired,
  adresse: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adresse: state.adresse,
});

export default connect(mapStateToProps, { getRegions, getVillesByRegion })(
  FormAnnonceDetails
);
