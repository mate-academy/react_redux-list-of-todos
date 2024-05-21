import React from 'react';
import { ToDo } from '../Todo/Todo';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { State } from '../../features/filter';

export const TodoList: React.FC = () => {
  const todosList: Todo[] | null = useAppSelector(state => state.todos);
  const filterSettings = useAppSelector(state => state.filter);

  function prepareList(list: Todo[], settings: State) {
    let preparedList = [...list];

    if (settings.query) {
      preparedList = preparedList.filter(todo =>
        todo.title.toLowerCase().includes(settings.query.toLowerCase().trim()),
      );
    }

    switch (settings.status) {
      case 'active':
        preparedList = preparedList.filter(todo => !todo.completed);
        break;

      case 'completed':
        preparedList = preparedList.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return preparedList;
  }

  if (todosList) {
    const preparedList = prepareList(todosList, filterSettings);

    return (
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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {preparedList.map(todo => (
            <ToDo todo={todo} key={todo.id} />
          ))}
        </tbody>
      </table>
    );
  } else {
    return;
  }
};
