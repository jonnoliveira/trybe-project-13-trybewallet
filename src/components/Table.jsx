import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const REAL = 'Real';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map(({
                description,
                tag,
                method,
                value,
                exchangeRates,
                currency,
                id,
              }) => (/* Por que com index não passsa no requisito? */
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{REAL}</td>
                  <td>
                    <EditButton id={ id } expenses={ expenses } />
                    <DeleteButton id={ id } expenses={ expenses } />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf({
    currency: PropTypes.string,
    description: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
    exchangeRates: PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
