import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { useAppSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { currentTodoSlice } from "../../features/currentTodo";
import { getUser } from "../../api";
import { User } from "../../types/User";

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useDispatch();

  const unCheckCurrentTodo = () =>
    dispatch(currentTodoSlice.actions.unCheckCurrentTodo());

  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    let isActive = true;

    async function loadUser() {
      if (!currentTodo) {
        setUser(null);

        return;
      }

      const data = await getUser(currentTodo.userId);

      if (isActive) {
        setUser(data);
      }
    }

    loadUser();

    return () => {
      isActive = false;
    };
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentTodo || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => unCheckCurrentTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {" by "}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
