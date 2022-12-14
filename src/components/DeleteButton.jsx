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

DeleteButton.defaultProps = {
  expenses: [],
};

DeleteButton.propTypes = {
  expenses: PropTypes.instanceOf(Array),
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DeleteButton);
