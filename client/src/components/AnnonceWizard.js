import React, { Component } from "react";
import FormAnnonceDetails from "./FormAnnonceDetails";
import FormImmobilierDetails from "./FormImmobilierDetails";
import FormUserInput from "./FormUserInput";
import ConfirmForm from "./ConfirmForm";
import FormSuccess from "./FormSuccess";

export class AnnonceWizard extends Component {
  state = {
    step: 1,
    type: "",
    etat: "",
    adresse: {
      adresse: "",
      ville: "",
      region: "",
      quartier: "",
    },
    surface: 0,
    prix: 0,
    nbrPieces: 0,
    nbrChambres: 0,
    nbeSDB: 0,
    titre: "",
    description: "",
    tel: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleAdresseChange = (input) => (e) => {
    this.setState({
      adresse: { ...this.state.adresse, [input]: e.target.value },
    });
  };

  render() {
    const { step } = this.state;
    const {
      type,
      etat,
      adresse,
      surface,
      prix,
      nbrPieces,
      nbrChambres,
      nbeSDB,
      titre,
      description,
      tel,
    } = this.state;
    const values = {
      type,
      etat,
      adresse,
      surface,
      prix,
      nbrPieces,
      nbrChambres,
      nbeSDB,
      titre,
      description,
      tel,
    };
    switch (step) {
      case 1:
        return (
          <FormAnnonceDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleAdresseChange={this.handleAdresseChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormImmobilierDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <FormUserInput
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <ConfirmForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return <FormSuccess />;
    }
  }
}

export default AnnonceWizard;
