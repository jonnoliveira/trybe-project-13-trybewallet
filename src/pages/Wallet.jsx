import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrencyAPI } from '../redux/actions/requestAPI';
import Table from '../components/Table';

import '../css/Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  render() {
    return (
      <section className="wallet-container">
        <div className="wallet-header-form-container">
          <Header />
          <WalletForm />
        </div>
        <div className="wallet-table-container">
          <Table />
        </div>
      </section>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
