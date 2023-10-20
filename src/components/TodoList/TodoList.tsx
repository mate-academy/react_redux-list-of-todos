import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { Loader } from '../Loader';

export const TodoList = (
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const filter = useAppSelector((state) => state.filter);
  const query = useAppSelector((state) => state.filter.query);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const filteredTodos = todos.filter((todo) => {
    const isMatchingStatus
      = (filter.status === 'active' && !todo.completed)
      || (filter.status === 'completed' && todo.completed)
      || filter.status === 'all';

    if (!query.trim()) {
      return isMatchingStatus;
    }

    return todo.title
      .toLowerCase()
      .includes(query.toLowerCase()) && isMatchingStatus;
  });

  const handleViewButtonClick = (selectedTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(selectedTodo));
  };

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);
  const hasMatchingTodos = filteredTodos
    .some((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));

  let contentToRender = null;

  if (isInitialLoad) {
    contentToRender = <Loader />;
  } else if (hasMatchingTodos) {
    contentToRender = (
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
          {filteredTodos.map((todo) => {
            const isTodoClicked = todo.id === currentTodo?.id;

            return (
              <tr
                data-cy="todo"
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <th>
                      <span className="icon">
                        <i className="fas fa-check" />
                      </span>
                    </th>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleViewButtonClick(todo)}
                  >
                    <span className="icon">
                      {!isTodoClicked ? (
                        <i className="far fa-eye" />
                      ) : (
                        <i className="far fa-eye-slash" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {contentToRender}
      {!isInitialLoad && !hasMatchingTodos && (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
        </p>
      )}
    </>
  );
};
