// ACTIONS

// ACTIONS TYPE
export const EMAIL_LOGED = 'EMAIL_LOGED';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

// ACTIONS CREATORS
export const emailLoged = (param) => ({
  type: EMAIL_LOGED,
  payload: param,
});

export const removeExpense = (param) => ({
  type: REMOVE_EXPENSE,
  payload: param,
});
