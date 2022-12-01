/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// import { useDispatch } from 'react-redux';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { Todo } from './types/Todo';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
// import { actions as currentTodo } from './features/currentTodo';

// local test and no users server copy
// import { dataFromServer } from './myLocalServer';
import { useAppSelector } from './app/hooks';

// console.log(dataFromServer);

export const App: React.FC = () => {
  const dispatch = useDispatch();

  // const todos = useAppSelector((state) => state.todos);
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [statusSelect, setStatusSelect] = useState('all');
  // const [query, setQuery] = useState<string>('');

  // const filterBySearch = (todoTitle: string, queryText: string) => {
  //   return todoTitle.toLowerCase().includes(queryText);
  // };

  const selectedTodo = useAppSelector(state => state.currentTodo);

  // что нужно сделать чтобы по несколько раз мой statusSelect не генерился useCallback useMemo?
  // возможно это прийдется перенести в туду лист так как нет в нем смысла тут кроме лоудера
  useEffect(() => {
    (async () => {
      try {
        const allTodos = await getTodos();

        // const allTodos = dataFromServer;
        // имея екшен из конкретного файла оно понимает что надо к конкретному редюсеру подключится?
        dispatch(todosActions.setTodos(allTodos));
        // setTodos(
        //   todos.filter((todo) => {
        //     const { title, completed } = todo;

        //     switch (statusSelect) {
        //       case 'active':
        //         return completed && filterBySearch(title, query);

        //       case 'completed':
        //         return !completed && filterBySearch(title, query);

        //       default:
        //         return todo && filterBySearch(title, query);
        //     }
        //   }),
        // );

        setIsLoading(true);
      } catch {
        // eslint-disable-next-line no-console
        console.log('Check your internnet connection');
      }
    })();
  }, []);
  // }, [statusSelect, query]);

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
              {isLoading ? (
                <TodoList />
                // <TodoList
                //   // todos={todos}
                //   // setSelectedTodo={setSelectedTodo}
                //   // selectedTodo={selectedTodo}
                // />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        // <TodoModal
        //   // selectedTodo={selectedTodo}
        //   // setSelectedTodo={setSelectedTodo}
        // />
        <TodoModal />
      )}
    </>
  );
};
