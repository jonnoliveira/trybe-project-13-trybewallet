// ACTION

const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

function requestStarted() {
  return {
    type: REQUEST_STARTED,
  };
}

function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: Object.keys(currencies),
  };
}

function requestFailed(error) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

// export function fetchCurrencyAPI() {
//   return (dispatch) => {
//     dispatch(requestStarted());
//     fetch(CURRENCIES_API)
//       .then((response) => response.json())
//       .then((currencies) => dispatch(requestSuccessful(currencies)))
//       .catch((error) => dispatch(requestFailed(error)));
//   };
// }

export function fetchCurrencyAPI() {
  return async (dispatch) => {
    dispatch(requestStarted());
    try {
      const response = await fetch(CURRENCIES_API);
      const currencies = await response.json();
      delete currencies.USDT;
      dispatch(requestSuccessful(currencies));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}
