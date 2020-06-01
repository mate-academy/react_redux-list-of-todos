import React from 'react';

type Props = {
  buttonsInit: Button[];
};

export const Buttons: React.FC<Props> = ({ buttonsInit }) => {
  return (
    <div className="todo__buttons">
      {buttonsInit.map(({ id, title, event, sortType }) => (
        <button
          type="button"
          key={id}
          className="todo__button todo__button--sort"
          onClick={() => event(sortType)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};
