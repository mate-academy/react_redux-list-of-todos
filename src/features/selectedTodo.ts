import { Todo } from '../types/Todo';

type SetSelectedTodo = {
  type: 'set';
  payload: Todo | null;
};

const setSelected = (value: Todo | null): SetSelectedTodo => ({
  type: 'set',
  payload: value,
});

const setSelectedReducer = (
  // eslint-disable-next-line
  todo = null,
  action: SetSelectedTodo,
): Todo | null => {
  switch (action.type) {
    case 'set':
      return action.payload;
    default:
      return todo;
  }
};

export const action = { setSelected };
export default setSelectedReducer;
