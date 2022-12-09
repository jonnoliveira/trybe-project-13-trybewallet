import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    currency: 'USD',
    paymentMethod: 'Dinheiro',
    tags: 'Alimentação',
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

  render() {
    const { currencies } = this.props;
    const { currency, paymentMethod, tags } = this.state;
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
              currencies.map((coin, index) => (
                <option key={ index }>{coin}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de pagamento:
          {' '}
          <select
            name="paymentMethod"
            id="paymentMethod"
            data-testid="method-input"
            onChange={ this.onChangeHandler }
            value={ paymentMethod }
          >
            {
              METHODS.map((method, index) => (
                <option key={ index } value={ method }>{method}</option>
              ))

            }
          </select>
        </label>

        <label htmlFor="tags">
          Tag:
          {' '}
          <select
            name="tags"
            id="tags"
            data-testid="tag-input"
            onChange={ this.onChangeHandler }
            value={ tags }

          >
            {
              TAGS.map((tag, index) => (
                <option key={ index } value={ tag }>{tag}</option>
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
          />
        </label>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
