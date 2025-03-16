import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import clsx from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  closeModal: () => void;
  post: Todo | null;
};

export const TodoModal: React.FC<Props> = React.memo(({ post, closeModal }) => {
  const [modalLoader, setModalLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setModalLoader(true);
    if (post) {
      getUser(post.userId)
        .then(res => setUser(res))
        .finally(() => setModalLoader(false));
    }
  }, [post]);

  return (
    <div className={clsx('modal', post?.userId && 'is-active')} data-cy="modal">
      <div className="modal-background" />
      {modalLoader ? (
        <Loader />
      ) : (
        <div className="modal-card" key={post?.id}>
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{post?.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeModal()}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {post?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {post?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a
                href={
                  user?.email ? `mailto:${user.email}` : `tel:${user?.phone}`
                }
              >
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
TodoModal.displayName = 'TodoModal';
