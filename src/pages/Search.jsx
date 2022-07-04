import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: '',
      stateButton: true,
      loading: false,
      result: 'INITIAL',
      albuns: [],
      test: '',
    };
  }

  // componentDidUpdate() {
  //   console.log('deu');
  // }

  request = async () => {
    const { valueSearch } = this.state;
    this.setState({
      loading: true,
    });
    const result = await searchAlbumsAPI(valueSearch);
    // const test = valueSearch;
    this.setState({
      test: valueSearch,
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

  // resultRequest = () => {
  //   return <p> Resultado de álbuns de: { valueSearch } </p>
  // }

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
    const { valueSearch, stateButton, loading, result, albuns, test } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <p>Carregando...</p>
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
                {}
              </div>
            </>
          )}
        {albuns.length > 0
          ? (
            <p>
              {`Resultado de álbuns de: ${test}`}
            </p>)
          : <> </>}
        { result
          ? (

            albuns.map((albun) => (
              <div
                key={ albun.collectionId }
              >
                <Link
                  to={ `/album/${albun.collectionId}` }
                  data-testid={ `link-to-album-${albun.collectionId}` }
                >
                  { albun.collectionName }
                </Link>
              </div>))
          )
          : <> Nenhum álbum foi encontrado </> }

      </div>
    );
  }
}
export default Search;
