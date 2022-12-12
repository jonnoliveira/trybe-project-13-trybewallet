// ACTIONS

// import { requestStarted, requestFailed, CURRENCIES_API } from './requestAPI';

// ACTIONS TYPE
export const EMAIL_LOGED = 'EMAIL_LOGED';

// ACTIONS CREATORS
export const emailLoged = (param) => ({
  type: 'EMAIL_LOGED',
  payload: param,
});
