import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense } from '../redux/actions/index';
import edit from '../images/edit.svg';

import '../css/EditButton.css';

class EditButton extends Component {
  handleEditExpense = () => {
    const { dispatch, id } = this.props;

    dispatch(editExpense(id));
  };

  render() {
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ this.handleEditExpense }
        className="edit-button"
      >
        <img src={ edit } alt="Edit icon" />
      </button>
    );
  }
}

EditButton.propTypes = {
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EditButton);
