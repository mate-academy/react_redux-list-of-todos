import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../store';
import { actions as loadingActions } from '../../store/loadingReducer';
import { actions as actionsTodos } from '../../store/todosReducer';
import { actions, actions as userActions } from '../../store/userReducer';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  choosenTodo: Todo
};

export const TodoModal: React.FC<Props> = ({ choosenTodo }) => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(loadingActions.startLoadingUser());
    getUser(choosenTodo.userId)
      .then(userFromServer => {
        dispatch(userActions.setUser(userFromServer));
      })
      .finally(() => dispatch(loadingActions.finishLoadingUser()));
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      {!user
        ? (
          <Loader />
        )
        : (
          <>
            {!choosenTodo
              ? ('no todo')
              : (
                <div className="modal-card">
                  <header className="modal-card-head">
                    <div className="modal-card-title has-text-weight-medium">
                      {`Todo: #${choosenTodo.id}`}
                    </div>
                    <a
                      href="#close"
                      className="delete"
                      onClick={() => {
                        dispatch(actionsTodos.choseTodo(null));
                        dispatch(actions.setUser(null));
                      }}
                    >
                      Close
                    </a>
                  </header>

                  <div className="modal-card-body">
                    <p className="block">{choosenTodo.title}</p>

                    <p className="block">
                      {choosenTodo.completed
                        ? (<strong className="has-text-success">Done</strong>)
                        : (
                          <strong
                            className="has-text-danger"
                          >
                            Planned
                          </strong>
                        )}
                      {' by '}
                      <a href={`mailto:${user?.email}`}>
                        {user?.name}
                      </a>
                    </p>
                  </div>
                </div>
              )}
          </>
        )}
    </div>
  );
};
