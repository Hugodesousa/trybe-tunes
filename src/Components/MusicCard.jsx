import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

// import Load from './Load';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      fav: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.saveList();
  }

  saveList = async () => {
    const requestFav = await getFavoriteSongs();
    this.setState({ favorites: requestFav }, () => {
      const { favorites } = this.state;
      const { music } = this.props;
      favorites.forEach((fav) => {
        if (fav.trackId === music.trackId) {
          this.setState({
            fav: true,
          });
        }
      });
    });
  };

  checkFav = async () => {
    const { fav } = this.state;
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    if (fav) {
      await removeSong(music);
      this.setState({
        fav: false,
        loading: false,
      });
    } else {
      await addSong(music);
      this.setState({
        fav: true,
        loading: false,
      });
    }
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId, artworkUrl100 } = music;
    const { loading, fav } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    return (
      <Card
        style={ { width: '21rem' } }
        className="cardResult"
      >
        <Card.Img variant="top" src={ artworkUrl100 } />
        <Card.Body>
          <Card.Title>{trackName}</Card.Title>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <Card.Footer>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.checkFav }
                checked={ fav }
              />
            </label>
          </Card.Footer>
        </Card.Body>
      </Card>);
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
