import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        {userName.length < minName
          ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{userName}</p>}
      </header>
    );
  }
}
export default Header;
