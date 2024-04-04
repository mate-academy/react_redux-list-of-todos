/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getTodos } from '../../api';
type Props = {
  loader: boolean;
  setLoader: (loader: boolean) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoList: React.FC<Props> = ({ loader, setLoader, setModal }) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector((state: RootState) => state.todos);
  const add = (value: Todo) => dispatch(actions.addTodo(value));

  const status = useSelector<RootState>(state => state.filter.status);
  const text = useSelector<RootState, string>(state => state.filter.text);
  const { id: currentId } =
    useSelector((state: RootState) => state.currentTodo) || {};

  const handliClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
    setModal(true);
  };

  useEffect(() => {
    if (visibleTodos) {
      setLoader(false);
    }
  }, [visibleTodos]);

  useEffect(() => {
    getTodos().then((todos: Todo[]) => {
      console.log(todos);

      todos.forEach(todo => add(todo));
    });
  }, []);

  useEffect(() => {
    let newTodos = [...todos];

    if (status === 'all') {
      newTodos = todos;
    }

    if (status === 'active') {
      newTodos = todos.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      newTodos = todos.filter(todo => todo.completed);
    }

    if (text) {
      newTodos = newTodos.filter(todo => todo.title.includes(text));
    }

    setVisibleTodos(newTodos);
  }, [status, text, todos]);

  return (
    <>
      {!visibleTodos.length && loader && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {visibleTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr data-cy="todo" key={id}>
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
                    className={classNames({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon" onClick={() => handliClick(todo)}>
                      {currentId === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
