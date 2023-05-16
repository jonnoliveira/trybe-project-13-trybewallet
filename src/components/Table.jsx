import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

import '../css/Table.css';

const REAL = 'Real';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="table-title">Descrição</th>
              <th className="table-title">Tag</th>
              <th className="table-title">Método de pagamento</th>
              <th className="table-title">Valor</th>
              <th className="table-title">Moeda</th>
              <th className="table-title">Câmbio utilizado</th>
              <th className="table-title">Valor convertido</th>
              <th className="table-title">Moeda de conversão</th>
              <th className="table-title">Editar/Excluir</th>
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
              }) => (
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.defaultProps = {
  expenses: [],
};
Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps)(Table);
