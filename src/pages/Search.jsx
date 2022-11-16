import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../Components/Load';
import '../style/search.css';

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
    console.log(result);
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
      <div data-testid="page-search" className="allSearch">

        <Header className="headerSpace" />

        {loading ? <Load />
          : (
            <Container className="searchContainer">
              <div>
                <h1>Pesquisar</h1>
                <form>
                  <label htmlFor="inputsearch">
                    <input
                      id="inputsearch"
                      type="text"
                      data-testid="search-artist-input"
                      onChange={ this.input }
                      value={ valueSearch }
                      placeholder="Pesquise por um artista, album ou música"
                    />
                  </label>
                  <Button
                    type="button"
                    id="searchButton"
                    data-testid="search-artist-button"
                    onClick={ this.request }
                    disabled={ stateButton }
                  >
                    Pesquisar
                  </Button>

                </form>
              </div>
            </Container>
          )}
        <Container>
          <Row>

            {albuns.length > 0
              ? (
                <h2>
                  {`Resultado de álbuns de: ${endValueSearch}`}
                </h2>)
              : <> </>}
          </Row>
          <div className="resultContainer">
            {result
              ? (

                albuns
                  .map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
                    <Link
                      className="linkCard"
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                      key={ collectionId }
                    >
                      <Card
                        className="cardResult"
                        style={ { width: '18rem' } }
                        key={ collectionId }
                      >
                        <Card.Img variant="top" src={ artworkUrl100 } />
                        <Card.Body>
                          <Card.Title>{artistName}</Card.Title>
                          <Card.Text>{ collectionName }</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))
              )
              : <> Nenhum álbum foi encontrado </>}
          </div>
        </Container>
      </div>
    );
  }
}
export default Search;
