/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as loadingActions } from './store/loadingReducer';
import { actions as currentTodoReducer } from './store/currentTodoReducer';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { selectors } from './store';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  const isLoading = useSelector(selectors.getLoading);
  const selectedTodo = useSelector(selectors.getTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadingActions.startLoading());
      setTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    };

    loadTodos();
    dispatch(loadingActions.finishLoading());
  }, []);

  const changeFilteredBy = (filterType: string) => {
    setFilteredBy(filterType);
  };

  const changeQuery = (input: string) => {
    setQuery(input);
  };

  const handleQueryFiltering = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    switch (filteredBy) {
      case Filter.ALL:
        setVisibleTodos(todos.filter(todo => handleQueryFiltering(todo.title)));
        break;

      case Filter.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed && handleQueryFiltering(todo.title)));
        break;

      case Filter.COMPLETED:
        setVisibleTodos(todos.filter(todo => todo.completed && handleQueryFiltering(todo.title)));
        break;

      default:
        break;
    }
  }, [filteredBy, query]);

  const selectUser = (id: number, todoId: number) => {
    setUserId(id);
    dispatch(currentTodoReducer.setTodo(todoId));
  };

  const usersTodo = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">{`Todos: ${filteredBy}`}</h1>

            <div className="block">
              <TodoFilter
                changeFilteredBy={changeFilteredBy}
                changeQuery={changeQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectUser={selectUser}
              />
            </div>
          </div>
        </div>
      </div>

      {!!userId && (
        <TodoModal
          todo={usersTodo}
          selectedUser={userId}
          selectUser={selectUser}
        />
      )}
    </>
  );
};

export default App;
