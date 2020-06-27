import React, { Component } from "react";
import SearchForm from "./SearchForm";

export default class SliderArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="slider_area">
        <div className="single_slider  d-flex align-items-center slider_bg_1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-10 offset-xl-1">
                <div className="slider_text text-center justify-content-center">
                  <h3>Trouver votre maison aujourd'hui</h3>
                  <p>Tout l'immobilier au maroc en vente.</p>
                </div>
                <div className="property_form">
                  <SearchForm></SearchForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
