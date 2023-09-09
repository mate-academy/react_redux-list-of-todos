import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "../Loader";
import { useAppSelector } from "../../app/hooks";
import { User } from "../../types/User";
import { getUser } from "../../api";
import { actions } from "../../features/currentTodo";

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && !isError && <Loader />}

      {!isLoading && !isError && user && currentTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              aria-label="close"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {" by "}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
