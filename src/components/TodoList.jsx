import React from 'react';
import TodoItemHandler from './TodoItemHandler';

export default function TodoList(props) {
  const {
    requested, data, loadData, sortData,
  } = props;
  if (!requested) {
    return (
      <div className="load-data-container">
        <button type="button" onClick={loadData} className="ui massive button">Load ToDo list</button>
      </div>
    );
  }

  if (data === null) {
    return <button type="button" className="ui loading button ui massive button" disabled />;
  }

  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th onClick={() => sortData('title')} className="thead">What to do?</th>
          <th onClick={() => sortData('userName')} className="thead">Who to do?</th>
          <th onClick={() => sortData('status')} className="thead">Whether done</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map((todo, index) => <TodoItemHandler todo={todo} index={index} key={todo.id} />)}
      </tbody>
    </table>
  );
}
