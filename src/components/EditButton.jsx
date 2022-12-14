import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditButton extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="edit-btn"
      >
        Editar

      </button>
    );
  }
}

export default connect()(EditButton);
