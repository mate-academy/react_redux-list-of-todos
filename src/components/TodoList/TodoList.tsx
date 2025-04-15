/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { setTodos } from '../../features/todos';
import { Status } from '../../types/Status';

type Props = {
  setListLoader: (val: boolean) => void
}

export const TodoList: React.FC<Props> = ({setListLoader}) => {
  const dispatch = useDispatch()
  const todos = useAppSelector(store => store.todos)
  const {query, status} = useAppSelector(store => store.filter)
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | []>([])


  const filterTodos = (query: string, status: Status) => {
    let visibleTodos = [...todos]

    if (status) {
      switch (status) {
        case 'all':
          visibleTodos = visibleTodos;
          break;

        case 'active':
          visibleTodos = visibleTodos.filter(todo => !todo.completed)
          break;

        case 'completed':
          visibleTodos = visibleTodos.filter(todo => todo.completed)
          break;
      }
    }

    if (query) {
      visibleTodos = visibleTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.trim().toLowerCase())
      })
    }

    setVisibleTodos(visibleTodos)
  }

  const receiveData = async () => {
    setListLoader(true)
    try {
      const todos: Todo[] = await getTodos()
      dispatch(setTodos(todos))
    } catch {
      console.error('cannot load todos!')
    } finally {
      setListLoader(false)
    }
  }

  useEffect(() => {
    if (!todos.length) {
      receiveData()
    }
  }, [])

  useEffect(() => {
    filterTodos(query, status as Status)
  }, [query, status])

  return (
    <>
        {visibleTodos.length === 0 ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ) : (
          <table className="table is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>#</th>

                <th>
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>

                <th>Title</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {visibleTodos.map(todo => {
                return <TodoItem todo={todo} key={todo.id}/>
              })}
            </tbody>
          </table>
        )}
    </>
  );
};
