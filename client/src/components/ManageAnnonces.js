import React, { Component } from "react";
import { connect } from "react-redux";
import { getAnnoncesOfUser } from "../actions/annonceActions";
import PropTypes from "prop-types";
import { Spinner, Form } from "reactstrap";
import moment from "moment";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { deleteAnnonce } from "../actions/annonceActions";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

const options = [
  { value: "En cours", label: "En cours" },
  { value: "Actif", label: "Actif" },
  { value: "Expirée", label: "Expirée" },
  { value: "Inactif", label: "Inactif" },
];

class ManageAnnonces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      modal: false,
    };
  }

  handleDelete = (id) => {
    this.props.deleteAnnonce(id);
  };

  handleModify = (annonce) => {};

  badge = (status) => {
    if (status === "En cours") return "badge-warning";
  };

  handleSelectChange = (e) => {
    var filter = {};
    try {
      this.setState({ filter: e.value });
      filter = { filter: e.value };
    } catch (e) {
      this.setState({ filter: "" });
      filter = {};
    }

    const stringified = queryString.stringify(filter);

    this.props.location.search = stringified;
    this.props.history.push(`${this.props.match.url}?${stringified}`);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.getAnnoncesOfUser(
        this.props.user.user._id,
        queryString.parse(this.props.location.search)
      );
    }
  }

  componentWillMount() {
    this.props.getAnnoncesOfUser(
      this.props.user.user._id,
      queryString.parse(this.props.location.search)
    );
  }

  render() {
    const { annonces, loading } = this.props.annonce;
    const array = Array.from(annonces);
    return (
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Vos annonces </div>
          <div className="list-group list-group-flush">
            <div className="col">
              <Form>
                <Select
                  name="filter"
                  options={options}
                  onChange={this.handleSelectChange}
                  defaultValue={this.state.filter}
                  placeholder="Status..."
                  isClearable={true}
                />
              </Form>
            </div>
          </div>
        </div>
        <div id="page-content-wrapper">
          {loading ? (
            <div
              style={{ paddingTop: "200px" }}
              className="d-flex justify-content-center"
            >
              <Spinner color="secondary" />
            </div>
          ) : array.length == 0 ? (
            <div style={{ paddingTop: "200px" }}>
              <h4 className="text-center">Aucune annonce trouvée</h4>
            </div>
          ) : (
            array.map((annonce, i) => (
              <div key={i} className="card">
                <div className="card-horizontal">
                  <div className="img-square-wrapper">
                    <img
                      src={annonce.photos[0].url}
                      alt={annonce.photos[0].name}
                    />
                  </div>

                  <div className="card-body">
                    <div>
                      <small className="text-muted">
                        date creation :{" "}
                        {moment(annonce.date_creation).format("YYYY/MM/DD")}
                      </small>
                      <div
                        className={`badge ${this.badge(
                          annonce.status
                        )} text-wrap float-right`}
                        style={{ width: "6rem" }}
                      >
                        {annonce.status}
                      </div>
                    </div>
                    <h4 className="card-title">{annonce.titre}</h4>
                    <div className="adresse">
                      <img src="/img/svg_icon/location.svg" alt="" />
                      <span>
                        {" " +
                          annonce.adresse.adr +
                          ", " +
                          annonce.adresse.ville.nomVille}
                      </span>
                    </div>
                    <span className="prix">
                      <NumberFormat
                        value={annonce.prix}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" DH"}
                      />
                    </span>
                    <p className="card-text">{annonce.description}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <ul className="list-inline ">
                    <li className="list-inline-item">
                      <div className="single_info_doc">
                        <img src="/img/svg_icon/square.svg" alt="" />
                        <span>{" " + annonce.surface} m²</span>
                      </div>
                    </li>
                    {annonce.type === "Terrain" ? null : (
                      <>
                        {annonce.type === "Bureaux" ? null : (
                          <>
                            <li className="list-inline-item">
                              <div className="single_info_doc">
                                <img src="/img/svg_icon/bed.svg" alt="" />
                                <span>
                                  {" " + annonce.nbrChambres} Chambres
                                </span>
                              </div>
                            </li>
                          </>
                        )}
                        <li className="list-inline-item">
                          <div className="single_info_doc">
                            <img src="/img/svg_icon/bath.svg" alt="" />
                            <span>
                              {" " + annonce.nbrSallesDeBain} Salles de bain
                            </span>
                          </div>
                        </li>
                      </>
                    )}

                    <div className="float-right">
                      <li className="list-inline-item">
                        <button
                          type="button"
                          onClick={() => this.handleDelete(annonce._id)}
                          className="btn btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

ManageAnnonces.propTypes = {
  getAnnoncesOfUser: PropTypes.func.isRequired,
  deleteAnnonce: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  annonce: state.annonce,
  user: state.user,
});

const ManageAnnoncesWithRouter = withRouter(ManageAnnonces);

export default connect(mapStateToProps, { deleteAnnonce, getAnnoncesOfUser })(
  ManageAnnoncesWithRouter
);
