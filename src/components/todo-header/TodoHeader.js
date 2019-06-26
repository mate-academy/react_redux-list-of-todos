import React from 'react';
import { Link } from 'react-router-dom';
import './TodoHeader.css';

function TodoHeader(props) {
  return (
    <header className="header-menu">
      <Link to="/">Todos</Link>
    </header>
  );
}

export default TodoHeader;
