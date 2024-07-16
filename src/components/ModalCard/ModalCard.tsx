import { useAppSelector } from '../../app/hooks';

type Props = {
  onCloseModal: () => void;
};

export const ModalCard: React.FC<Props> = ({ onCloseModal }) => {
  const currentTodo = useAppSelector(state => state.currentTodo.item);

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          Todo #{currentTodo?.todo.id}
        </div>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          onClick={onCloseModal}
          type="button"
          className="delete"
          data-cy="modal-close"
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          {currentTodo?.todo.title}
        </p>

        <p className="block" data-cy="modal-user">
          {/* For not completed */}

          <strong
            className={
              currentTodo?.todo.completed
                ? 'has-text-success'
                : 'has-text-danger'
            }
          >
            {currentTodo?.todo.completed ? 'Done' : 'Planned'}
          </strong>
          {' by '}

          <a href="mailto:Sincere@april.biz">Leanne Graham</a>
        </p>
      </div>
    </div>
  );
};

//  {/* For completed */}
//  <strong className="has-text-success">Done</strong>
//  {' by '}
