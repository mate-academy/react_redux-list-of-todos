// Редукторы определяют, как изменяется состояние приложения в ответ на действия, отправленные в store
import { LOAD, DISPLAY, REMOVE, SORT } from './actions';
const initialState = {
  data: null,
  requested: false
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true
      };
    case DISPLAY:
      return {
        ...state,
        data: action.data
      }
    case REMOVE:
      return {
        ...state,
        data: state.data.filter((post, index) => index !== action.index)
      }
    case SORT:
      const dataItems = [...state.data];
      dataItems.sort((x, y) => x[action.field].localeCompare(y[action.field]));
      return {
        ...state,
        data: dataItems
      }
    default:
      return state;
  }
}
