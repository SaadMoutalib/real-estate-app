import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAnnonces } from "../actions/annonceActions";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
} from "reactstrap";

import PropTypes from "prop-types";
const spinner = (
  <Fragment>
    <div className="d-flex justify-content-center">
      <span className="spinner-border"></span>
    </div>
  </Fragment>
);

class AnnoncesList extends Component {
  componentDidMount() {
    this.props.getAnnonces();
    console.log(this.props.annonce);
  }

  render() {
    const { annonces, loading } = this.props.annonce;
    return (
      <div>
        {loading && spinner}

        <Row>
          {annonces.map((annonce) => (
            <Col key={annonce.idannonces} xs="3">
              <Card>
                <CardImg top width="100%" src="" alt="Card image cap" />
                <CardBody>
                  <CardTitle>{annonce.titre}</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>{annonce.description}</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

AnnoncesList.propTypes = {
  getAnnonces: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  annonce: state.annonce,
});

export default connect(mapStateToProps, { getAnnonces })(AnnoncesList);
