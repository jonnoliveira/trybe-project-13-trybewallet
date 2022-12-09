// REDUCER WALLET

import {
  REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED,
} from '../actions/requestAPI';

const INITIAL_STATE = {
  isFatching: false,
  errorMessage: '',
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFatching: true,
    };
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFatching: false,
      currencies: action.payload,
    };
  case REQUEST_FAILED:
    return {
      ...state,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
