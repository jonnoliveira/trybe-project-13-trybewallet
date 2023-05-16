import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import account from '../images/account.svg';
import money from '../images/money.svg';

import '../css/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    // CALCULAR O VALOR FINAL SOMANDO 'VALUE' DE CADA DESPESA:
    const price = expenses.reduce((sum, expense) => (
      sum + expense.value * expense.exchangeRates[expense.currency].ask), 0).toFixed(2);

    return (
      <header className="header-container">
        <div className="header-container-title">
          <p>Trybe</p>
          <h1>wallet</h1>
        </div>
        <h2>Bem vindo(a) de volta!</h2>
        <div className="header-info-container">
          <div className="header-info-icons">
            <img src={ account } alt="account icon" />
            <p data-testid="email-field">
              {email}
            </p>
          </div>
          <div className="header-info-icons">
            <img src={ money } alt="Money icon" />
            <p data-testid="total-field">
              Total em despesas:
              {' '}
              { price }
              {' '}
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
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
