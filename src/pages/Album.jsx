import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Load from '../Components/Load';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
      musics: [],
      favorites: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getList(id);
    this.saveList();
  }

  getList = async (id) => {
    const request = await getMusics(id);
    this.setState({
      info: request[0],
      musics: request.slice(1),
    });
  }

  saveList = async () => {
    const requestFav = await getFavoriteSongs();
    this.setState((prev) => ({ favorites: [...prev.favorites, requestFav] }));
  };

  render() {
    const { musics, info, favorites } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics.length === 0
          ? <Load />
          : (
            <div>
              <h1 data-testid="artist-name">
                { info.artistName }
              </h1>
              <h2 data-testid="album-name">
                { info.collectionName}
              </h2>
              {musics.map((music) => (<MusicCard
                music={ music }
                key={ music.trackId }
                favorites={ favorites }
              />))}
            </div>

          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Album;
