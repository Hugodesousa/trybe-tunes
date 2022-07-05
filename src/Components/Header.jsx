import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
    });
  };

  render() {
    const { userName } = this.state;
    const minName = 3;
    return (
      <header data-testid="header-component" className="header">
        {userName.length < minName
          ? <Load />
          : (
            <p data-testid="header-user-name">
              {` Usuario:
            ${userName}`}
            </p>)}
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Search
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favorites
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Profile
        </Link>
      </header>
    );
  }
}
export default Header;
