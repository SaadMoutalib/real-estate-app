import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAnnonces } from '../actions/annonceActions';

import PropTypes from 'prop-types';

class Home extends Component {
    
    componentDidMount(){
        this.props.getAnnonces();
    }

    render(){

    }
}

Home.propTypes = {
    getAnnonces : PropTypes.func.isRequired,
    annonce : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    annonce : state.annonce
});

export default connect(mapStateToProps,{getAnnonces})(Home);