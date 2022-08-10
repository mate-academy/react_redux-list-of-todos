import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { Loader } from '../Loader';

import { getUser } from '../../api/user';

import Todo from '../../types/Todo';
import User from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  onModalCloseClick: () => void;
};

const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onModalCloseClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      if (selectedTodo === null) {
        return Promise.reject();
      }

      setIsLoading(true);

      const response = await getUser(selectedTodo.userId);

      setIsLoading(false);

      return response;
    };

    loadTodos()
      .then(userFromServer => setUser(userFromServer))
      .catch(() => {
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              {selectedTodo && (
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo.id}`}
                </div>
              )}

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onModalCloseClick}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo ? selectedTodo.title : 'Could not load todo'}
              </p>

              <p className="block" data-cy="modal-user">
                {user && selectedTodo
                  ? (
                    <>
                      <strong
                        className={classNames({
                          'has-text-success': selectedTodo.completed,
                          'has-text-danger': !selectedTodo.completed,
                        })}
                      >
                        {selectedTodo.completed ? 'Done' : 'Planned'}
                      </strong>

                      {' by '}

                      <a href="mailto:Sincere@april.biz">
                        {user.name}
                      </a>
                    </>
                  )
                  : (
                    <span>Could not load user</span>
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default TodoModal;

//
//   <div className="modal-card">
//     {isError || selectedTodo === null
//       ? (
//         <h1>Error</h1>
//       )
//       : (
//         <>
//           <header className="modal-card-head">
//             <div
//               className="modal-card-title has-text-weight-medium"
//               data-cy="modal-header"
//             >
//               {`Todo #${selectedTodo.id}`}
//             </div>
//
//             {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//             <button
//               type="button"
//               className="delete"
//               data-cy="modal-close"
//               onClick={onModalCloseClick}
//             />
//           </header>
//
//           <div className="modal-card-body">
//             <p className="block" data-cy="modal-title">
//               {selectedTodo.title}
//             </p>
//
//             <p className="block" data-cy="modal-user">
//               {selectedTodo.completed
//                 ? (
//                   <strong className="has-text-success">Done</strong>
//                 )
//                 : (
//                   <strong className="has-text-danger">Planned</strong>
//                 )}
//
//               {' by '}
//
//               <a href="mailto:Sincere@april.biz">
//                 {user?.name}
//               </a>
//             </p>
//           </div>
//         </>
//       )}
//   </div>
