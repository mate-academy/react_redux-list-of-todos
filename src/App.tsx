import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Filter } from './Filter';

import { selectors } from './store';
import { Todo } from './types/Todo';
import { actions as loadingActions } from './store/loading';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectFilter, setSelectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const isLoadedTodos = useSelector(selectors.isLoading);
  const selectedTodo = useSelector(selectors.getTodo);

  useEffect(() => {
    getTodos().then(todoList => {
      setTodos(todoList);
      setVisibleTodos(todoList);
      dispatch(loadingActions.startLoading());
    });
  }, []);

  const findTitle = (title: string) => {
    const params = searchQuery.toLowerCase();

    return title.toLowerCase().includes(params);
  };

  const filteredTodos = todos.filter(todo => {
    switch (selectFilter) {
      case Filter.all:
        return findTitle(todo.title);

      case Filter.active:
        return !todo.completed && findTitle(todo.title);

      case Filter.completed:
        return todo.completed && findTitle(todo.title);

      default:
        return todo;
    }
  });

  useEffect(() => setVisibleTodos(filteredTodos), [searchQuery, selectFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSaveOption={setSelectFilter}
                onSaveQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {!isLoadedTodos
                ? <Loader />
                : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
