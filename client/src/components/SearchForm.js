import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { Form, FormGroup, Label, Row, Button } from "reactstrap";
import { getVilles } from "../actions/adresseActions";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import queryString from "query-string";

const optionsType = [
  { value: "Appartement", label: "Appartement" },
  { value: "Villa", label: "Villa" },
  { value: "Maison", label: "Maison" },
  { value: "Terrain", label: "Terrain" },
  { value: "Bureaux", label: "Bureaux" },
  { value: "Riad", label: "Riad" },
];

const optionsNbrChambres = [
  { value: 1, label: "1 chambre ou plus" },
  { value: 2, label: "2 chambres ou plus" },
  { value: 3, label: "3 chambres ou plus" },
  { value: 4, label: "4 chambres ou plus" },
  { value: 5, label: "5 chambres ou plus" },
  { value: 6, label: "6 chambres ou plus" },
  { value: 7, label: "7 chambres ou plus" },
  { value: 8, label: "8 chambres ou plus" },
  { value: 9, label: "9 chambres ou plus" },
  { value: 10, label: "10 chambres ou plus" },
];

const optionsNbrSDB = [
  { value: 1, label: "1 salle de bain ou plus" },
  { value: 2, label: "2 salles de bain ou plus" },
  { value: 3, label: "3 salles de bain ou plus" },
  { value: 4, label: "4 salles de bain ou plus" },
  { value: 5, label: "5 salles de bain ou plus" },
  { value: 6, label: "6 salles de bain ou plus" },
  { value: 7, label: "7 salles de bain ou plus" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 191,
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.4)",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "#C7C7C7";

    return { ...provided, opacity, color, transition };
  },
  menu: (provided) => ({
    ...provided,
    fontSize: "0.8rem",
  }),
  input: (provided) => ({
    color: "#C7C7C7",
  }),
  menuList: (provided) => ({
    ...provided,
    height: "180px",
  }),
};

var query = {};

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prix: { min: 0, max: 20000000 },
      surface: { min: 0, max: 300 },
      nbrChambres: 0,
      nbrSDB: 0,
      type: "",
      ville: "",
    };
  }

  componentDidMount() {
    this.props.getVilles();
    query = queryString.parse(this.props.location.search);
  }

  handleSelectChange = (input) => (e) => {
    try {
      this.setState({ [input]: e.value });
      query = { ...query, [input]: e.value };
    } catch (e) {
      query = { ...query, [input]: undefined };
      this.setState({ [input]: "" });
    }
    console.log(query);
    const stringified = queryString.stringify(query);

    this.props.location.search = stringified;

    this.props.history.push(`/annonces?${stringified}`);
  };

  handleRangeChange = (input) => (e) => {
    this.setState({ [input]: e });
    query = {
      ...query,
      [input + "Min"]: e.min,
      [input + "Max"]: e.max,
    };
    const stringified = queryString.stringify(query);

    this.props.location.search = stringified;
    this.props.history.push(`/annonces?${stringified}`);
  };

  render() {
    const { villes, loading } = this.props.adresse;
    const { location } = this.props;
    const parsed = queryString.parse(location.search);

    const optionsVilles = [];
    villes.map((ville, id) => {
      optionsVilles.push({
        value: ville.nomVille,
        label: ville.nomVille,
      });
    });

    return (
      <div>
        <Form>
          <div className="col-xl-12">
            <Row>
              <FormGroup className="single-field max_width">
                <Label for="ville">Ville</Label>
                <Select
                  name="ville"
                  styles={customStyles}
                  isDisabled={loading}
                  isLoading={loading}
                  options={optionsVilles}
                  onChange={this.handleSelectChange("ville")}
                  value={optionsVilles.find((op) => {
                    return op.value === parsed.ville;
                  })}
                  isClearable={true}
                />
              </FormGroup>
              <FormGroup className="single-field max_width">
                <Label for="type">Type</Label>
                <Select
                  name="type"
                  styles={customStyles}
                  options={optionsType}
                  onChange={this.handleSelectChange("type")}
                  value={optionsType.find((op) => {
                    return op.value === parsed.type;
                  })}
                  isClearable={true}
                />
              </FormGroup>

              <FormGroup className="single-field min_width">
                <Label for="nbrChambres">Chambres</Label>
                <Select
                  name="nbrChambres"
                  styles={customStyles}
                  options={optionsNbrChambres}
                  onChange={this.handleSelectChange("nbrChambres")}
                  value={optionsNbrChambres.find((op, id) => {
                    return op.value == parsed.nbrChambres;
                  })}
                  isClearable={true}
                />
              </FormGroup>
              <FormGroup className="single-field min_width">
                <Label for="nbrSDB">Salles de bain</Label>
                <Select
                  name="nbrSDB"
                  styles={customStyles}
                  options={optionsNbrSDB}
                  onChange={this.handleSelectChange("nbrSDB")}
                  value={optionsNbrSDB.find((op) => {
                    return op.value == parsed.nbrSDB;
                  })}
                  isClearable={true}
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup
                style={{ width: "300px" }}
                className="single-field max_width"
              >
                <Label for="prix">Prix (millions DH)</Label>
                <InputRange
                  name="prix"
                  formatLabel={(value) => `${value / 1000000} m`}
                  maxValue={100000000}
                  minValue={0}
                  step={500000}
                  value={this.state.prix}
                  onChange={this.handleRangeChange("prix")}
                />
              </FormGroup>
              <FormGroup
                style={{ width: "300px" }}
                className="single-field max_width"
              >
                <Label for="surface">Surface (m²)</Label>
                <InputRange
                  formatLabel={(value) => `${value} m²`}
                  name="surface"
                  maxValue={2000}
                  minValue={0}
                  step={20}
                  value={this.state.surface}
                  onChange={this.handleRangeChange("surface")}
                />
              </FormGroup>
              <div className="serach_icon">
                <Button
                  style={{
                    background: "#FD8E5E",
                    width: "191px",
                    marginTop: "20px",
                    borderColor: "#fd8e5e",
                  }}
                >
                  <i className="ti-search">{"    "}</i>
                  <span>Rechercher</span>
                </Button>
              </div>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  getVilles: PropTypes.func.isRequired,
  adresse: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adresse: state.adresse,
});

const SearchFormWithRouter = withRouter(SearchForm);

export default connect(mapStateToProps, { getVilles })(SearchFormWithRouter);
