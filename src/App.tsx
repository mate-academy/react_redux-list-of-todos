/* eslint-disable */
import React, {
  // useCallback,
  useEffect,
  useMemo,
  // useMemo,
  useState
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { isArray } from 'cypress/types/lodash';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const {todos}  = useAppSelector(state => state.todos);
  const setTodos = (list: Todo[]) => dispatch(actions.setTodos(list));
  const [showLoader, setShowLoader] = useState(false);
  // console.log(todos);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter: {
    query: string,
    status: string,
  } = useAppSelector(state => state.filter);
  const state = useAppSelector(state => state)
  console.log(state, 'whole state');
  
  useEffect(() => {
    setShowLoader(true);
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .finally(() => setShowLoader(false));
  }, []);

  useMemo(() => {
    if (todos) {
      setVisibleTodos(todos);
    }
  }, [todos])
  
  if (todos) {
    // console.log( Object.values(todos), 'todos');
  }
  useMemo(() => {
    // console.log(todos, 'todos in memo');
    
    if (todos) {
      let copy: Todo[] = [...Object.values(todos) as Todo[]];
      // console.log(copy, 'tds');

      // copy = [...Object.values(todos) as Todo[]];
    
      if (filter.query.length > 0) {
        copy = visibleTodos.filter(
          elem => elem.title.toLocaleLowerCase().includes(
            filter.query.toLocaleLowerCase(),
          ))
        // console.log(copy, 'copy in if');
      
      }
      if (filter.status === 'completed') {
        copy = visibleTodos.filter(
          elem => elem.completed === false
        )
      }
      if (filter.status === 'active') {
        copy = visibleTodos.filter(
          elem => elem.completed === true
        )
      }
      setVisibleTodos(copy);

    }

  }, [filter.status, filter.query]);
  // console.log(visibleTodos,filter.query,todos, 'visibletodos');
  
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {currentTodo && <TodoModal todo={currentTodo} />}
              {showLoader && <Loader />}
              <TodoList todoList={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
