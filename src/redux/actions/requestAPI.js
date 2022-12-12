// ACTION

export const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const EXPENSES = 'EXPENSES';

export function requestStarted() {
  return {
    type: REQUEST_STARTED,
  };
}

export function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

export function requestFailed(error) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

export function fetchCurrencyAPI() {
  return async (dispatch) => {
    dispatch(requestStarted());
    try {
      const response = await fetch(CURRENCIES_API);
      const currencies = await response.json();
      delete currencies.USDT; // <<<<< Evitar o filter
      dispatch(requestSuccessful(currencies));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}

// THUNK ACTION CREATOR
export const toExpenses = (param) => ({
  type: 'EXPENSES',
  payload: param,
});

export const fetchCurrencyAPIToExpenses = async () => {
  const response = await fetch(CURRENCIES_API);
  const currencies = await response.json();
  delete currencies.USDT; // <<<<< Evitar o filter
  return currencies;
};
