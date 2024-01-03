/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { RootState } from './app/store';
import { User } from './types/User';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const thisTodo: Todo | null
  = useSelector((state: RootState) => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsLoadingModal(true);

    if (thisTodo) {
      getUser(thisTodo.userId).then((data) => (
        setUser(data)
      )).finally(() => setIsLoadingModal(false));
    }
  }, [thisTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos: </h1>

            <div className="block">
              <TodoFilter todos={todos} />
            </div>

            <div className="block">
              {isLoading ? <Loader />
                : <TodoList user={user} />}
            </div>
          </div>
        </div>
      </div>

      {thisTodo && <TodoModal thisTodo={thisTodo} isLoading={isLoadingModal} user={user} />}
    </>
  );
};
