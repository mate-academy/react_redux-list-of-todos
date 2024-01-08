/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  stringFilter: string,
  modalId: number | undefined,
  setModalId: (a: number | undefined) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  stringFilter,
  modalId,
  setModalId,
}) => {
  const noFilterMatch = (stringFilter.length > 0 && todos.length === 0);

  const todoMarkup = (todo:Todo) => {
    return (
      <tr data-cy="todo" className={classNames({ 'has-background-info-light': todo.id === modalId })}>
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
        </td>

        <td className="is-vcentered is-expanded">
          <p className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
          >
            {todo.title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => setModalId(todo.id)}
          >
            <span className="icon">
              {todo.id !== modalId ? (<i className="far fa-eye" />) : <i className="far fa-eye-slash" />}
            </span>
          </button>
        </td>
      </tr>
    );

    /*
    return (
      <tr data-cy="todo" className="has-background-info-light">
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
        </td>

        <td className="is-vcentered is-expanded">
          <p className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
          >
            {todo.title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        </td>
      </tr>
    ); */

    /* THIS IS A STYLE OF SELECTED TODO WHEN MODAL IS OPENED
          <tr data-cy="todo" className="has-background-info-light">
            <td className="is-vcentered">3</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">fugiat veniam minus</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            </td>
          </tr>
      */
  };

  return (
    <>
      {noFilterMatch
      && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {/* <tr data-cy="todo">
            <td className="is-vcentered">1</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">delectus aut autem</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">2</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">quis ut nam facilis et officia qui</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr> */}

          {/*           <tr data-cy="todo" className="has-background-info-light">
            <td className="is-vcentered">3</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">fugiat veniam minus</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            </td>
          </tr> */}

          {/* <tr data-cy="todo">
            <td className="is-vcentered">4</td>
            <td className="is-vcentered"><span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span></td>
            <td className="is-vcentered is-expanded">
              <p className="has-text-success">et porro tempora</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">5</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">laboriosam mollitia et enim quasi adipisci quia provident illum</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">6</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">qui ullam ratione quibusdam voluptatem quia omnis</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">7</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">illo expedita consequatur quia in</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">8</td>

            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-success">quo adipisci enim quam ut ab</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">9</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">molestiae perspiciatis ipsa</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">10</td>

            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-success">illo est ratione doloremque quia maiores aut</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr> */}
          {todos.map((todo:Todo) => todoMarkup(todo))}
        </tbody>
      </table>
    </>
  );
};
