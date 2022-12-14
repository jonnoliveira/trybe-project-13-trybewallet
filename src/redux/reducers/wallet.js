// REDUCER WALLET

import {
  REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED, EXPENSES,
} from '../actions/requestAPI';

import { REMOVE_EXPENSE, EDIT_EXPENSE, SAVE_EDIT_EXPENSE } from '../actions/index';

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
      currencies: Object.keys(action.payload),
    };
  case REQUEST_FAILED:
    return {
      ...state,
      errorMessage: action.payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit)
          ? ({ id: expense.id, ...action.payload, exchangeRates: expense.exchangeRates })
          : expense)),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
