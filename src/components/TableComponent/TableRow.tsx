import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useModalContext } from '../ModalContext';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  // id: number;
  // title: string;
  // completed: boolean;
  // userId: number;
  onOpenModal: (uId: number, todo: Todo) => void;
  errorUser: string;
};

export const TableRow: React.FC<Props> = ({ todo, onOpenModal, errorUser }) => {
  const [isClick, setIsClick] = useState(false);
  const { setResetRow } = useModalContext();

  const { id, title, completed, userId } = todo;

  type ClassName = {
    'fa-eye': boolean;
    'fa-eye-slash': boolean;
  };

  const nameClass: ClassName = {
    'fa-eye': !isClick,
    'fa-eye-slash': isClick,
  };

  if (errorUser) {
    nameClass['fa-eye'] = true;
    nameClass['fa-eye-slash'] = false;
  } else {
    nameClass['fa-eye'] = !isClick;
    nameClass['fa-eye-slash'] = isClick;
  }

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={() => {
            onOpenModal(userId, todo);
            setIsClick(true);
            setResetRow(() => () => setIsClick(false));
          }}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={classNames('far', nameClass)} />
          </span>
        </button>
      </td>
    </tr>
  );
};
