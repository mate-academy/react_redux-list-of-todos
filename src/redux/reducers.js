import { REMOVE_ITEM, LOAD_DATA, DISPLAY, SORT } from './actions';

const initialState = {
  items: null,
  requested: false,
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item, index) => action.id !== item.id)
      };
    case LOAD_DATA: 
      return {
      ...state,
        requested: true
    }
    case DISPLAY:
      return {
        ...state,
        items: action.data
      };
    case SORT:
      let newItems = [...state.items];
      
      if (action.data === 'Title' || action.data === 'Author' || action.data === 'Completed') {
        newItems.sort((a,b) => a[action.data.toLowerCase()].localeCompare(b[action.data.toLowerCase()]));
      } else {
        newItems.sort((a,b) => a.id - b.id);
      }

      return {
        ...state,
        items: newItems
      };
    default:
      return state;
  }
}
