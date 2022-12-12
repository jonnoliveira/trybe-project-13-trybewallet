import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toExpenses, fetchCurrencyAPIToExpenses } from '../redux/actions/requestAPI';

const ALIMENTAÇÃO = 'Alimentação';
const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTAÇÃO,
    description: '',
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;

    this.setState({
      [name]: value,
    });
  };

  toGlobalState = async () => {
    const { dispatch } = this.props;
    const { id, value, currency, method, tag, description } = this.state;
    const exchangeRates = await fetchCurrencyAPIToExpenses();

    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };

    dispatch(
      toExpenses(expense),
    );

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÃO,
      description: '',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <section>
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            type="number"
            name="value"
            id="value"
            placeholder="Digite um valor"
            data-testid="value-input"
            onChange={ this.onChangeHandler }
            value={ value }

          />
        </label>

        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.onChangeHandler }
            value={ currency }
          >
            {
              Object.keys(currencies).map((coin, index) => (
                <option key={ index }>{coin}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          {' '}
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.onChangeHandler }
            value={ method }
          >
            {
              METHODS.map((methods, index) => (
                <option key={ index } value={ methods }>{methods}</option>
              ))

            }
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          {' '}
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.onChangeHandler }
            value={ tag }

          >
            {
              TAGS.map((tg, index) => (
                <option key={ index } value={ tg }>{tg}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Comente aqui"
            data-testid="description-input"
            onChange={ this.onChangeHandler }
            value={ description }

          />
        </label>
        <button type="button" onClick={ this.toGlobalState }>Adicionar despesa</button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    USD: PropTypes.objectOf(PropTypes.string), // <<<<<<<<<<<<<<<<< rever
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
