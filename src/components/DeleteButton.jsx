import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions/index';

class DeleteButton extends Component {
  handleDeleteExpense = () => {
    const { id, expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);

    dispatch(
      removeExpense(newExpenses),
    );
  };

  render() {
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ this.handleDeleteExpense }
      >
        Excluir

      </button>
    );
  }
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DeleteButton);
