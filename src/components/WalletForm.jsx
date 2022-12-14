import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toExpenses, fetchCurrencyAPIToExpenses } from '../redux/actions/requestAPI';
import { saveEditedExpense } from '../redux/actions';

const ALIMENTAÇÃO = 'Alimentação';
const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
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
    const { dispatch, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const exchangeRates = await fetchCurrencyAPIToExpenses();

    const expense = {
      id: expenses.length,
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

    this.setState(() => ({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÃO,
      description: '',
    }));
  };

  handleEditExpense = () => {
    const { dispatch } = this.props;

    dispatch(saveEditedExpense(this.state));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
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
              currencies.map((coin) => (
                <option key={ coin }>{coin}</option>
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
              METHODS.map((methods) => (
                <option key={ methods } value={ methods }>{methods}</option>
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
              TAGS.map((tg) => (
                <option key={ tg } value={ tg }>{tg}</option>
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
        <button
          type="button"
          onClick={ editor
            ? this.handleEditExpense
            : this.toGlobalState }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

WalletForm.defaultProps = {
  expenses: [],
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.instanceOf(Array),

};

export default connect(mapStateToProps)(WalletForm);
