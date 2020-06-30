import React, { Component } from "react";
import FormAnnonceDetails from "./WizardSteps/FormAnnonceDetails";
import FormImmobilierDetails from "./WizardSteps/FormImmobilierDetails";
import FormUserInput from "./WizardSteps/FormUserInput";
import ConfirmForm from "./WizardSteps/ConfirmForm";
import FormSuccess from "./WizardSteps/FormSuccess";

class AnnonceWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      type: "",
      etat: "",
      adresse: {
        adresse: "",
        ville: null,
        region: null,
      },
      fonctionalite: {
        jardin: false,
        piscine: false,
        terasse: false,
        garage: false,
        ascenseur: false,
        concierge: false,
      },
      surface: 0,
      prix: 0,
      nbrPieces: 0,
      nbrChambres: 0,
      nbrSallesDeBain: 0,
      titre: "",
      description: "",
      tel: "",
      pictures: {
        files: [],
        urls: [],
      },
    };
  }

  handleFonctionalite = (input) => (e) => {
    this.setState({
      fonctionalite: {
        ...this.state.fonctionalite,
        [input]: !this.state.fonctionalite[input],
      },
    });
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
    e.persist();
    const { value } = e.target;
    this.setState({ [input]: value });
  };

  handleAdresseChange = (input) => (e) => {
    e.persist();
    const { value } = e.target;
    if (input !== "adresse") {
      let obj = JSON.parse(value);
      this.setState({
        adresse: { ...this.state.adresse, [input]: obj },
      });
    } else {
      this.setState({
        adresse: { ...this.state.adresse, [input]: value },
      });
    }
  };

  onDrop = (file, url) => {
    this.setState({
      pictures: { ...this.state.pictures, files: file, urls: url },
    });
  };

  componentDidMount() {
    document.title = "Ajouter Annonce - Maroc Estate";
  }

  Step = (values, step) => {
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
            handleFonctionalite={this.handleFonctionalite}
            values={values}
          />
        );
      case 3:
        return (
          <FormUserInput
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            onDrop={this.onDrop}
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
  };

  render() {
    const { step } = this.state;
    const {
      type,
      etat,
      adresse,
      fonctionalite,
      surface,
      prix,
      nbrPieces,
      nbrChambres,
      nbrSallesDeBain,
      titre,
      description,
      tel,
      pictures,
    } = this.state;
    const values = {
      type,
      etat,
      adresse,
      fonctionalite,
      surface,
      prix,
      nbrPieces,
      nbrChambres,
      nbrSallesDeBain,
      titre,
      description,
      tel,
      pictures,
    };

    return (
      <>
        <div style={{ padding: "50px" }} className="container">
          <div className="row">
            <div className="col-lg-12">
              <div style={{ paddingBottom: "50px" }} className="text-center">
                <span className={"step " + (step >= 1 && "active")}> </span>
                <span className={"step " + (step >= 2 && "active")}> </span>
                <span className={"step " + (step >= 3 && "active")}></span>
                <span className={"step " + (step == 4 && "active")}></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 mb-5 mb-lg-0">
              {this.Step(values, step)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AnnonceWizard;
