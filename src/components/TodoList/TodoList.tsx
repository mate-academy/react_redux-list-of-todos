/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchTodosFailure, fetchTodosStart, fetchTodosSuccess } from '../../features/todos';
import { getTodos, getUser } from '../../api';
import { Loader } from '../Loader';
import { TodoModal } from '../TodoModal';
import { Todo } from '../../types/Todo';
import { fetchCurrentStart,
         fetchCurrentSuccess,
         fetchCurrentFailure,
         } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos)
  const { query, status } = useSelector((state: RootState) => state.filter);
  const { currentTodo } = useSelector((state: RootState) => state.currentTodo)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchTodosStart());
      try {
        const todos = await getTodos();

        dispatch(fetchTodosSuccess(todos));
      } catch (error) {
        dispatch(fetchTodosFailure('Failed to fetch todos'))
      }
    }

    fetchData();
  }, [dispatch])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())

    const matchesStatus =  status === 'all'
    || (status === 'active' && !todo.completed)
    || (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  })

  const openCurrentTodo = async (todo: Todo) => {
    setOpenModal(true)
    dispatch(fetchCurrentStart());
    try {
      const user = await getUser(todo.userId);
      dispatch(fetchCurrentSuccess({ todo, user }));
    } catch (error) {
      dispatch(fetchCurrentFailure());
      console.error('Failed to fetch user', error);
    }
  };

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
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
          {filteredTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
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
                  onClick={() => openCurrentTodo(todo)}
                >
                  <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': !(currentTodo === todo),
                    'fa-eye-slash': currentTodo === todo,
                  })} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal && (
        <TodoModal onClose ={closeModal} />
      )}

    </div>
  );
};
