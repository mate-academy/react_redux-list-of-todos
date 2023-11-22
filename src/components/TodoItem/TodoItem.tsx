import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions as CurrentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);
  const currentSelected = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setTodoSelected(currentSelected);
  }, [currentSelected]);

  const setCurrentTodo = (currTodo: Todo) => {
    dispatch(CurrentTodoActions.setTodo(currTodo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setCurrentTodo(todo)}
        >
          <span className="icon">
            <i
              className={`far ${todo.id === todoSelected?.id ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
