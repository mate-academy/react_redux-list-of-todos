import { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { Loader } from '../Loader';
import './SelectedUser.scss';

export const SelectedUser: React.FC = () => {
  const { selectedUserId } = useTypedSelector(state => state.todos);
  const { user, loading, error } = useTypedSelector(state => state.user);
  const { fetchUser, clearUser, setSelectedUserId } = useActions();

  useEffect(() => {
    if (selectedUserId) {
      fetchUser(selectedUserId);
    }
  }, [selectedUserId]);

  const clearSelectedUser = () => {
    clearUser();
    setSelectedUserId(null);
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="notification is-danger">
        {error}
      </div>
    );
  }

  if (user === null) {
    return (
      <div>
        <article className="message is-info">
          <div className="message-header">
            <p>
              No selected user
            </p>
          </div>
          <div className="message-body">
            <div>Please select user to see info</div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <article className="message is-info">
      <div className="message-header">
        <p>
          Selected User #
          {' '}
          {user.id}
        </p>
        <button
          type="button"
          className="button is-light"
          onClick={() => {
            clearSelectedUser();
          }}
        >
          Clear user
        </button>
      </div>
      <div className="message-body">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </article>
  );
};
