import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Load extends Component {
  render() {
    const { status } = this.props;
    return (
      <div>
        {!status
          ? <h1 className="loading">Carregando...</h1>
          : <Redirect to="/search" />}
      </div>
    );
  }
}

Load.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default Load;
