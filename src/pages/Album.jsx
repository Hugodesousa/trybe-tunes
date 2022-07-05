import React, { Component } from 'react';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Load from '../Components/Load';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
      musics: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getList(id);
    // this.setState({
    //   idAlbum: id,
    // });
  }

  // shouldComponentUpdate() {

  // }

  getList = async (id) => {
    const request = await getMusics(id);
    console.log(request);
    this.setState({
      info: request[0],
      musics: request.slice(1),
    });
  }

  render() {
    const { musics, info } = this.state;

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
              {}
            </div>

          )}
      </div>
    );
  }
}
export default Album;
