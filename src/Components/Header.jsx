import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { getUser } from '../services/userAPI';
import '../style/header.css';

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
      <Nav variant="tabs" data-testid="header-component" className="header">
        <div className="user">
          {userName.length < minName
            ? <p>Carregando...</p>
            : (
              <Nav.Item>
                <h4 data-testid="header-user-name">
                  {` Bem vindo
              ${userName}`}
                </h4>
              </Nav.Item>
            )}
        </div>
        <div className="headerItens">
          <Nav.Item>
            <Nav.Link href="/favorites" data-testid="link-to-favorites">
              Favorites
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" data-testid="link-to-profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" data-testid="link-to-search">Search</Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    );
  }
}
export default Header;
