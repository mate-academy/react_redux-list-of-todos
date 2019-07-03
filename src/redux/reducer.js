import { DATA_REQUESTED, DATA_LOADED } from './action';

const initialState = {
  dataRequested: false,
  todosWithUser: null
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case DATA_REQUESTED:
      return {
        ...state,
        dataRequested: true
      }

    case DATA_LOADED:
      return {
        ...state,
        todosWithUser: payload
      }

    default:
      return state
  }
}