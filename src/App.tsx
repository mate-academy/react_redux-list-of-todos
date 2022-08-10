import './App.scss';
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { Start } from './components/Start';

import { useAppSelector } from './store';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
// import { actions as loadingActions } from './store/_loading';
import { getTodos } from './api';
import { actions as todosActions } from './store/loadTodos';
import { TodoModal } from './components/TodoModal';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector(state => state.loading);

  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos()
      .then(fromServer => dispatch(todosActions.settodos(fromServer)));

    // dispatch(loadingActions.startLoading());
  }, []);

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const todosFilter = (inputType: string, typeSelect: string) => {
    let visibledTodos = [...todos]
      .filter(({ title }) => title.toLowerCase().includes(inputType));

    const filteringVisibleTodos = (condition: boolean) => {
      visibledTodos = todos
        // eslint-disable-next-line max-len
        .filter(({ completed, title }) => completed === condition && title.toLowerCase().includes(inputType));
    };

    if (typeSelect === 'active') {
      filteringVisibleTodos(false);
    }

    if (typeSelect === 'completed') {
      filteringVisibleTodos(true);
    }

    setVisibleTodos(visibledTodos);
  };

  const selectTodoId = (todoId: number) => setSelectedTodoId(todoId);

  return (
    <div className="App">
      <h1 className="content is-medium">Redux list of todos</h1>
      {!loading && <Start title="Start loading" />}

      {loading && (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  getInput={todosFilter}
                />
              </div>

              <div className="block">
                {todos.length < 0
                  ? <Loader />
                  : (
                    <TodoList
                      todos={visibleTodos}
                      onTodoSelected={selectTodoId}
                      selectedTodo={selectedTodoId}
                    />
                  ) }
              </div>

              {selectedTodoId > 0 && (
                <TodoModal
                  todo={visibleTodos.find(todo => todo.id === selectedTodoId)}
                  onTodoSelected={selectTodoId}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
