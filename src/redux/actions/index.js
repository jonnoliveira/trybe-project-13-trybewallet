// ACTIONS

// ACTIONS TYPE
export const EMAIL_LOGED = 'EMAIL_LOGED';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';

// ACTIONS CREATORS
export const emailLoged = (param) => ({
  type: EMAIL_LOGED,
  payload: param,
});

export const removeExpense = (param) => ({
  type: REMOVE_EXPENSE,
  payload: param,
});

export const editExpense = (param) => ({
  type: EDIT_EXPENSE,
  payload: param,
});

export const saveEditedExpense = (param) => ({
  type: SAVE_EDIT_EXPENSE,
  payload: param,
});
