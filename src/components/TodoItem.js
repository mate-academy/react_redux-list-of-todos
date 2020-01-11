import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { TodosContext } from '../context';
import User from './User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.title}</td>
    <User user={todo.user} />

    {todo.completed
      ? (
        <td className="positive">
          <i className="icon checkmark" />
          Approved
        </td>
      ) : (
        <td className="negative">
          <i className="icon close" />
          In procces
        </td>
      )}
    <td>
      <TodosContext.Consumer>
        {value => (
          <Button icon>
            <Icon name="user delete" onClick={() => value.deleteUser(todo.id)} />
          </Button>
        )}
      </TodosContext.Consumer>

    </td>
  </tr>
);

export default TodoItem;

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};
