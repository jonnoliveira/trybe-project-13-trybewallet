import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailLoged } from '../redux/actions';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  btnLoginValidation = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;

    // VALIDAÇÃO DO EMAIL
    const emailPattern = (
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    );
    const validEmail = emailPattern.test(email);

    // VALIDAÇÃO PASSWORD
    const validPassword = password.length >= MIN_LENGTH;

    if (validEmail === true && validPassword === true) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.btnLoginValidation();
    });
  };

  toGlobalState = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(
      emailLoged(email),
    );
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <section>
        <div>
          <img src="https://cdn.pixabay.com/photo/2018/10/03/11/31/wallet-3721156_1280.png" alt="Login" width="100px" />
          <h1>Faça seu login:</h1>
          <label htmlFor="email">
            Email:
            {' '}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="joao@teste.com"
              onChange={ this.onChangeHandler }
              data-testid="email-input"
            />
          </label>

          <label htmlFor="password">
            Senha:
            {' '}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua melhor senha"
              onChange={ this.onChangeHandler }
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.toGlobalState }
          >
            Entrar

          </button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
