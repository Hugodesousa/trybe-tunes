import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
// import Load from './Load';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      fav: false,
    };
  }

  checkFav = async () => {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState({
      fav: true,
      loading: false,
    });
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, fav } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    return (
      <div>
        {/* {loading ? <p>Carregando...</p>
          : (
            <> */}
        <p>
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            type="checkbox"
            id="fav"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.checkFav }
            checked={ fav }
          />
        </label>
        {/*
            </>
          )} */}
      </div>);
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,

};

export default MusicCard;
