import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useMemo, useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { actions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const todosFromServer = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserloaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(newTodos => {
        dispatch(actions.loadTodos(newTodos));
      })
      .finally(() => setIsloading(false));
  }, [dispatch]);

  // const filterTodos = useMemo(() => {
  //   (currentTodos: Todo[]) => {
  //     if (query) {
  //       return currentTodos
  //         .filter(todo => {
  //           switch (status) {
  //             case 'all':
  //               return currentTodos;

  //             case 'active':
  //               return !todo.completed;

  //             case 'completed':
  //               return todo.completed;

  //             default:
  //               return;
  //           }
  //         })
  //         .filter(todo =>
  //           todo.title.toLowerCase().includes(query.toLowerCase()),
  //         );
  //     } else {
  //       return currentTodos.filter(todo => {
  //         switch (status) {
  //           case 'all':
  //             return currentTodos;

  //           case 'active':
  //             return !todo.completed;

  //           case 'completed':
  //             return todo.completed;

  //           default:
  //             return;
  //         }
  //       });
  //     }
  //   };
  // }, [query, status]);

  const filterTodos = (currentTodos: Todo[]) => {
    if (query) {
      return currentTodos
        .filter(todo => {
          switch (status) {
            case 'all':
              return currentTodos;

            case 'active':
              return !todo.completed;

            case 'completed':
              return todo.completed;

            default:
              return;
          }
        })
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    } else {
      return currentTodos.filter(todo => {
        switch (status) {
          case 'all':
            return currentTodos;

          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return;
        }
      });
    }
  };

  const filteredTodos = useMemo(
    () => filterTodos(todosFromServer),
    [filterTodos, todosFromServer],
  );

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="block">
                <TodoFilter />
              </div>
              <div className="block">
                <TodoList
                  setIsTodoModalOpen={setIsTodoModalOpen}
                  setSelectedUser={setSelectedUser}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                  setIsUserloaded={setIsUserloaded}
                  todos={filteredTodos}
                />
                {isTodoModalOpen && (
                  <TodoModal
                    setIsTodoModalOpen={setIsTodoModalOpen}
                    setSelectedUser={setSelectedUser}
                    setSelectedTodo={setSelectedTodo}
                    selectedUser={selectedUser}
                    selectedTodo={selectedTodo}
                    setIsUserloaded={setIsUserloaded}
                    isUserLoaded={isUserLoaded}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
