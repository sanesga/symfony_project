import {
  GET_USER_DATA
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      localStorage.setItem('user_data', JSON.stringify(action.payload[0].user[0]));
      return {
        ...state,
        data: action.payload[0].user[0]
      };
    default:
      return state;
  }
};
