import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Load from '../Components/Load';

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
      });
    };

    render() {
      const { stateButton, valueLogin, loading, onLogin } = this.state;
      return (
        <div data-testid="page-login">
          {loading ? <Load status={ onLogin } />
            : (
              <>
                <h1>Login</h1>
                <input
                  type="text"
                  data-testid="login-name-input"
                  onChange={ this.checkButton }
                  value={ valueLogin }
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ stateButton }
                  onClick={ this.user }
                >
                  Entrar
                </button>

              </>)}
        </div>
      );
    }
}
export default Login;
