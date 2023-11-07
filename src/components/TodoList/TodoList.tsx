import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  filter: string,
  query: string,
  onChosenTodo: (todo: Todo) => void,
  crossClicked: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  query,
  onChosenTodo,
  crossClicked,
}) => {
  let filteredTodos = [...todos];
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  if (filter !== Status.ALL) {
    const completed = filter === Status.COMPLETED;

    filteredTodos = filteredTodos.filter(
      todo => todo.completed === completed,
    );
  }

  if (query) {
    filteredTodos = filteredTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const selectButtonClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const handleSelectButton = (todo: Todo) => {
    onChosenTodo(todo);
    selectButtonClick(todo);
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map((todo: Todo) => {
          const { id, title, completed } = todo;
          const higtlightEye = selectedTodo?.id === id && crossClicked;

          return (
            <tr
              data-cy="todo"
              className={higtlightEye ? 'has-background-info-light' : ''}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectButton(todo)}
                >
                  <span className="icon">
                    <i className={`far fa-eye${higtlightEye ? '-slash' : ''}`} />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
