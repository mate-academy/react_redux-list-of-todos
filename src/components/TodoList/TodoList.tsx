import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
} from '../../features/todos';
import { getTodos, getUser } from '../../api';
import { RootState } from '../../app/store';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { setCurrentTodo } from '../../features/currentTodo';
import { TodoModal } from '../TodoModal';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos,
  );
  const { status, query } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchTodosStart());
      try {
        const todosData = await getTodos();

        dispatch(fetchTodosSuccess(todosData));
      } catch (fetchError) {
        dispatch(fetchTodosFailure('Error fetching todos'));
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredTodos = todos.filter((todo: Todo) => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleSelectTodo = async (todo: Todo) => {
    if (selectedTodoId === todo.id) {
      setModalOpen(!isModalOpen);
      setSelectedTodoId(selectedTodoId ? null : todo.id);
    } else {
      dispatch(setCurrentTodo(todo));
      const userData = await getUser(todo.userId);

      setCurrentUser(userData);
      setSelectedTodoId(todo.id);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentUser(null);
    setSelectedTodoId(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="notification is-danger">{error}</p>
      ) : filteredTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map((todo: Todo) => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          selectedTodoId === todo.id && isModalOpen
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && currentTodo && (
        <TodoModal onClose={handleCloseModal} user={currentUser} />
      )}
    </>
  );
};
