/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

export const App: React.FC = () => {
  const [queryTodoList, setQueryTodoList] = useState<Todo[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isTodoListLoading, setIsTodoListLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos().then(res => {
      setQueryTodoList(res);
      setTodoList(res);
      setIsTodoListLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo.userId).then(res => {
      setCurrentUser(res);
    });
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isTodoListLoading && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter
                    queryTodoList={queryTodoList}
                    setTodoList={setTodoList}
                  />
                </div>
              </>
            )}

            <div className="block">
              {isTodoListLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todoList={todoList}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={currentUser}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
