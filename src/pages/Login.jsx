import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Load from '../Components/Load';
import { createUser } from '../services/userAPI';
import '../style/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      stateButton: true,
      valueLogin: '',
      loading: false,
      onLogin: false,
    };
  }

    checkButton = ({ target }) => {
      const minLogin = 3;
      this.setState({
        valueLogin: target.value,
      });

      if (target.value.length >= minLogin) {
        return this.setState({
          stateButton: false,
        });
      }
      return this.setState({
        stateButton: true,
      });
    };

    user = async () => {
      const { valueLogin } = this.state;
      this.setState({
        loading: true,
      });
      const login = { name: valueLogin };
      await createUser(login);
      this.setState({
        onLogin: true,
        // loading: false,
      });
    };

    render() {
      const { stateButton, valueLogin, loading, onLogin } = this.state;
      if (onLogin === true) {
        return <Redirect to="/search" />;
      }
      return (
        <div data-testid="page-login" className="AllBody">
          {loading ? <Load />
            : (
              <Container className="loginContainer">
                <div className="quadrado">

                  <Row>
                    <h1>Login</h1>
                  </Row>
                  <Row>
                    <input
                      type="text"
                      data-testid="login-name-input"
                      onChange={ this.checkButton }
                      value={ valueLogin }
                      placeholder="Qual seu nome?"
                    />
                    <Button
                      variant="primary"
                      type="button"
                      data-testid="login-submit-button"
                      disabled={ stateButton }
                      onClick={ this.user }
                    >
                      Entrar
                    </Button>
                  </Row>
                </div>

              </Container>)}
        </div>
      );
    }
}
export default Login;
