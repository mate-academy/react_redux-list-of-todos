export const DISPLAY= 'display';
export const LOAD_ITEMS = 'load_items';
export const REMOVE_ITEM = 'remove_item';
export const SORT_TABLE = 'sort_table';
export const CLEAR_ALL = 'clear_all';

function displayAction(data) {
  return {
    type: DISPLAY,
    data
  };
};

export function clearAllAction() {
  return {
    type: CLEAR_ALL
  };
};

export function removeItemAction(id) {
  return {
    type: REMOVE_ITEM,
    id
  };
};

export function sortOfTableAction(value) {
  return {
    type: SORT_TABLE,
    value
  };
};


export function loadAction() {
  return (dispatch) => {
    dispatch({
      type: LOAD_ITEMS
    });
    Promise.all([
      loadApi('https://jsonplaceholder.typicode.com/todos'),
      loadApi('https://jsonplaceholder.typicode.com/users')
    ])
      .then(res => dispatch(displayAction(res)))
  };
};

function loadApi(url) {
  return fetch(url)
    .then(data => data.json())
}
