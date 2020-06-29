import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import {
  addFavoris,
  getFavoris,
  deleteFavoris,
} from "../actions/annonceActions";
import PropTypes from "prop-types";

class AnnoncesList extends Component {
  addFavoris = (idannonce) => {
    const body = { idannonce: idannonce, iduser: this.props.user.user._id };
    this.props.addFavoris(body);
  };

  deleteFavoris = (idannonce) => {
    const body = { idannonce: idannonce, iduser: this.props.user.user._id };
    this.props.deleteFavoris(body);
  };

  componentDidMount() {
    if (this.props.user.isAuthenticated)
      this.props.getFavoris(this.props.user.user._id);
  }

  render() {
    const { annonces } = this.props.annonce;
    const array = Array.from(annonces);
    return (
      <>
        {array.map((annonce, i) => (
          <div key={i} className="col-xl-4 col-md-6 col-lg-4">
            <div className="single_property">
              <div className="property_thumb">
                <div className="property_tag">
                  {!this.props.user
                    .isAuthenticated ? null : this.props.favoris.some(
                      (el) => el === annonce._id
                    ) ? (
                    <i
                      onClick={() => this.deleteFavoris(annonce._id)}
                      style={{ color: "#dc3545" }}
                      className="heart fa fa-heart"
                    ></i>
                  ) : (
                    <i
                      onClick={() => this.addFavoris(annonce._id)}
                      className="heart fa fa-heart-o"
                    ></i>
                  )}
                </div>
                <img src={annonce.photos[0].url} alt={annonce.photos[0].name} />
              </div>
              <div className="property_content">
                <div className="main_pro">
                  <h3>
                    <a href={"/annonce/" + annonce._id}>{annonce.titre}</a>
                  </h3>
                  <div className="mark_pro">
                    <img src="/img/svg_icon/location.svg" alt="" />
                    <span>
                      {" " +
                        annonce.adresse.adr +
                        ", " +
                        annonce.adresse.ville.nomVille}
                    </span>
                  </div>
                  <span className="amount">
                    {" "}
                    <NumberFormat
                      value={annonce.prix}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" DH"}
                    />
                  </span>
                </div>
              </div>
              <div className="footer_pro">
                <ul>
                  <li>
                    <div className="single_info_doc">
                      <img src="/img/svg_icon/square.svg" alt="" />
                      <span>{annonce.surface} m²</span>
                    </div>
                  </li>
                  {annonce.type === "Terrain" ||
                  annonce.type === "Bureaux" ? null : (
                    <>
                      <li>
                        <div className="single_info_doc">
                          <img src="/img/svg_icon/bed.svg" alt="" />
                          <span>{annonce.nbrChambres} Chambres</span>
                        </div>
                      </li>

                      <li>
                        <div className="single_info_doc">
                          <img src="/img/svg_icon/bath.svg" alt="" />
                          <span>{annonce.nbrSallesDeBain} Salles de bain</span>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

AnnoncesList.propTypes = {
  addFavoris: PropTypes.func.isRequired,
  getFavoris: PropTypes.func.isRequired,
  deleteFavoris: PropTypes.func.isRequired,
  favoris: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  favoris: state.favoris,
  user: state.user,
});

export default connect(mapStateToProps, {
  addFavoris,
  deleteFavoris,
  getFavoris,
})(AnnoncesList);
