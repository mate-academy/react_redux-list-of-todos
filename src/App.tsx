/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { setCurrent } from './features/currentTodo';
import { setTodo } from './features/todos';
import { setQuery, setStatus } from './features/filter';
// import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo.currentTodo);
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  // const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTodos().then(data => {
      dispatch(setTodo(data));
      setLoading(false);
    });
  }, [dispatch]);

  const handleShowTodo = (todo: Todo) => {
    dispatch(setCurrent(todo));
    // setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    dispatch(setCurrent(null));
    setIsModalVisible(false);
  };

  const filteredTodos = todos.filter(todo => {
    // active-не завершені

    if (filter === 'active' && todo.completed) {
      return false;
    }

    // completed-завершені
    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    // фільтрація за назваою
    return todo.title.toLowerCase().includes(query.toLowerCase());

    // return true; //all
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onChangeFilter={newFilter => dispatch(setStatus(newFilter))}
                query={query}
                onQueryChange={newQuery => dispatch(setQuery(newQuery))}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && currentTodo && (
        <TodoModal todo={currentTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
