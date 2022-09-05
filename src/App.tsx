/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Filter } from './types/Filter';
import { actions as loadingActions } from './store/loadingReducer';
import { actions as currentTodoReducer } from './store/currentTodoReducer';
import { actions } from './store/TodosReducer';
import { useTypedSelector } from './components/hooks/useTypedSelector';
import {
  Loader, TodoFilter, TodoList, TodoModal,
} from './components/index';

export const App: React.FC = () => {
  const todos = useTypedSelector(state => state.todo);
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  const isLoading = useTypedSelector(state => state.loading);
  const selectedTodo = useTypedSelector(state => state.todoId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    dispatch(actions.getTodos());

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
  }, [filteredBy, query, todos]);

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
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeFilteredBy={changeFilteredBy}
                changeQuery={changeQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={visibleTodos} selectUser={selectUser} />
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
