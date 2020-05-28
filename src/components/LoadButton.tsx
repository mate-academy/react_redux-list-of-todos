import React from 'react';

export const LoadButton = ({ loadTodos }: LoadButtonProps) => {
  return (
    <button
      type="button"
      className="waves-effect waves-light btn-large mgb20"
      onClick={loadTodos}
    >
      load todos
    </button>
  );
};
