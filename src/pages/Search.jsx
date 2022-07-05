import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../Components/Load';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: '',
      stateButton: true,
      loading: false,
      result: 'INITIAL',
      albuns: [],
      endValueSearch: '',
    };
  }

  request = async () => {
    const { valueSearch } = this.state;
    this.setState({
      loading: true,
    });
    const result = await searchAlbumsAPI(valueSearch);
    this.setState({
      endValueSearch: valueSearch,
      valueSearch: '',
      loading: false,
    });
    if (result.length === 0) {
      return this.setState({
        result: false,
      });
    }
    return this.setState({
      result: true,
      albuns: result,
    });
  }

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
    const { valueSearch,
      stateButton,
      loading,
      result,
      albuns,
      endValueSearch } = this.state;

    return (
      <div data-testid="page-search">

        <Header />

        {loading ? <Load />
          : (
            <>
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
                  onClick={ this.request }
                  disabled={ stateButton }
                >
                  Pesquisar
                </button>

              </form>
              <div>
                { }
              </div>
            </>
          )}

        {albuns.length > 0
          ? (
            <p>
              {`Resultado de álbuns de: ${endValueSearch}`}
            </p>)
          : <> </>}

        {result
          ? (

            albuns.map(({ collectionId, collectionName }) => (
              <div
                key={ collectionId }
              >
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  {collectionName}
                </Link>
              </div>))
          )
          : <> Nenhum álbum foi encontrado </>}

      </div>
    );
  }
}
export default Search;
