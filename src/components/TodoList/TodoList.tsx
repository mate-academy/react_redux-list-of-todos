/* eslint-disable */
import React, { useEffect } from 'react';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { setUser } from '../../features/userSlice';
import classNames from 'classnames';
import { filterByStatus } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TodoList: React.FC<Props> = ({setIsLoading}) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filteredTodos = useAppSelector(state => state.filter.filteredTodos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  useEffect(() => {
  dispatch(filterByStatus(todos));
  }, [dispatch, todos, status, query]);

  const handleSelectTodo = async(id: number) => {
    setIsLoading('modal');
    const selected = todos.find(todo => todo.id === id);

    if (!selected) return;
    dispatch(setCurrentTodo(selected));

      try {
        const result = await getUser(selected.userId);
        dispatch(setUser(result));
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(null)
      }
  }

  return (
    <>
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
          {filteredTodos.map(todo => {
            return (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({"has-background-info-light" : selectedTodo?.id === todo.id})}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed &&
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  }
                </td>
                <td className="is-vcentered is-expanded">
                  <p className= {todo.completed ? "has-text-success" : "has-text-danger"}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleSelectTodo(todo.id)}
                  >
                    <span className="icon">
                      {selectedTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                       <i className="far fa-eye" />
                      )}

                    </span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};
