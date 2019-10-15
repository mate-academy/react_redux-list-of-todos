import React, {
  useState,
  useEffect,
} from 'react';

import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';
import { store } from '../../store/reducers';

const useTodos = ({ todos }) => {
  const [value, set] = useState(todos);

  return { value, set };
};

const usePattern = ({ filterPattern }) => {
  const [value, set] = useState(filterPattern);

  return { value, set };
};

const TodoList = () => {
  const $todos = useTodos(store.getState());
  const $pattern = usePattern(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      const { todos, filterPattern } = store.getState();

      if (filterPattern === '') {
        $todos.set(todos);
      } else {
        $todos.set(todos.sort((a, b) => {
          if (a[filterPattern] > b[filterPattern]) {
            return 1;
          }

          if (a[filterPattern] < b[filterPattern]) {
            return -1;
          }

          if (a.id > b.id) {
            return 1;
          }

          if (a.id < b.id) {
            return -1;
          }
          return 0;
        }));
        $pattern.set(filterPattern);
      }
    });
  });

  return (
    <div className="todolist">
      {$todos.value.map((todo) => <TodoItem key={todo.id} {...todo} />)}
    </div>
  );
};

export default TodoList;
