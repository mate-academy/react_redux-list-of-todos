import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';

const TodoCellCompleted = ({ compl }) => (
  <Table.Cell negative={!compl} positive={compl}>
    <Icon
      color={compl ? 'green' : 'red'}
      name={compl ? 'checkmark' : 'close'}
    />
    {compl ? 'Complebitur' : 'In processus'}
  </Table.Cell>
);

TodoCellCompleted.propTypes = {
  compl: PropTypes.bool.isRequired,
};

export default TodoCellCompleted;
