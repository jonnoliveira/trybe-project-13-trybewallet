import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <figure>
          <img src="https://cdn.pixabay.com/photo/2018/10/03/11/31/wallet-3721156_1280.png" alt="Uma carteira em desnho com dinheiro saindo" width="100px" />
          <h1>Bem vindo(a) de volta!</h1>
        </figure>
        <div>
          <div>
            <p data-testid="email-field">
              {email}
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              Despesas Totais: 0
            </p>
          </div>
          <div>
            <p data-testid="header-currency-field">
              BRL
            </p>
          </div>

        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
