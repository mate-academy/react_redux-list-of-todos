import React from 'react';
import { connect } from 'react-redux';
import { todoSort } from '../../actions/action-creaters';

function Sorter({ todoSort }) {
  return (
    <select defaultValue="none" name="" id="" onChange={(event) => todoSort(event.target.value)}>
      <option value="none" disabled></option>
      <option value="title">Title</option>
      <option value="user">User</option>
      <option value="completed">Completed</option>
    </select>
  );
}

const mapDispatchToProps = {
  todoSort,
};

export default connect(null, mapDispatchToProps)(Sorter);
