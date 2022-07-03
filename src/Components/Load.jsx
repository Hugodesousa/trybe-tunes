import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Load extends Component {
  // state= {
  //   load: undefined,
  // }

  // verify = () => {
  //   this.setState({
  //     load: true,
  //   })
  // }

  render() {
    const { status } = this.props;
    return (
      <div>
        {!status
          ? <h1>Carregando...</h1>
          : <Redirect to="/search" />}

      </div>
    );
  }
}

Load.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default Load;
