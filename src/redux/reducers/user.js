// REDUCER USER

import { EMAIL_LOGED } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_LOGED:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
