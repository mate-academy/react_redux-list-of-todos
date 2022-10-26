/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { Filter } from './types/Filter';
import { RootState } from './app/store';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const currentTodo = useAppSelector<RootState>(state => state.currentTodo);
  const dispatch = useDispatch();

  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.all);
  const [selectedQuery, setSelectedQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setSelectedQuery={setSelectedQuery}
                selectedQuery={selectedQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    selectedFilter={selectedFilter}
                    selectedQuery={selectedQuery}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.userId && (
        <TodoModal
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
