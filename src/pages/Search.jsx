import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: '',
      stateButton: true,
    };
  }

  desableButton = () => true

  input = ({ target }) => {
    this.setState({
      valueSearch: target.value,
    });
    if (target.value.length >= 2) {
      return this.setState({
        stateButton: false,
      });
    }
    return this.setState({
      stateButton: true,
    });
  }

  render() {
    const { valueSearch, stateButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <label htmlFor="inputsearch">
            <input
              id="inputsearch"
              type="text"
              data-testid="search-artist-input"
              onChange={ this.input }
              value={ valueSearch }
            />
          </label>
          <button
            type="button"
            id="searchButton"
            data-testid="search-artist-button"
            disabled={ stateButton }
          >
            Pesquisar
          </button>

        </form>

      </div>
    );
  }
}
export default Search;
