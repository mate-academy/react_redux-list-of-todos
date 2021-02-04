import React, { useEffect, useState } from 'react';
import {
  useDispatch, connect, ConnectedProps,
} from 'react-redux';
import { getFilteringTodosList } from '../../api/helper';
import { RooTStateT, TODOSTYPE } from '../../api/interface';
import { selectedUser } from '../../store/currentUser';
import { NavMenuTodo } from '../NavMenuTodo/NavMenuTodo';
import { UpdateTodo } from '../UpdateTodo';
import './TodoList.scss';

const mapStateToProps = (state: RooTStateT) => ({
  todos: getFilteringTodosList(state.todosState),
});

const connector = connect(
  mapStateToProps,
);

type Props = ConnectedProps<typeof connector>;

const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const [updateList, setUpdateList] = useState<TODOSTYPE[]>(todos);
  const [todoId, setTodoId] = useState<number>(0);

  useEffect(() => {
    setUpdateList(todos);
  }, [todos.length]);

  const dispatch = useDispatch();

  const handleClickUser = (userId: number) => {
    dispatch(selectedUser(userId));
  };

  return (
    <>
      <NavMenuTodo
        todosList={updateList}
        setTodosList={setUpdateList}
      />
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {updateList.map(todo => (
              <li className="TodoList__item TodoList__item--unchecked" key={todo.id}>
                {todoId === todo.id
                  ? (
                    <UpdateTodo
                      todo={todo}
                      setTodoId={setTodoId}
                      setUpdateList={setUpdateList}
                    />
                  ) : (
                    <>
                      <label htmlFor="title">
                        <input
                          id="title"
                          type="checkbox"
                          checked={todo.completed}
                          readOnly
                        />
                        <p>{todo.title}</p>
                      </label>

                      <div>
                        <button
                          className="
                            TodoList__user-button
                            TodoList__user-button--update
                            button
                          "
                          type="button"
                          onClick={() => {
                            setTodoId(todo.id);
                          }}
                        >
                          Update
                        </button>

                        <button
                          className="
                            TodoList__user-button
                            TodoList__user-button--selected
                            button
                          "
                          type="button"
                          onClick={() => handleClickUser(todo.userId)}
                        >
                          {`User#${todo.userId}`}
                        </button>
                      </div>
                    </>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default connector(TodoList);
