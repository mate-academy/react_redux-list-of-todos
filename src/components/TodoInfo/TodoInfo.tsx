// import classNames from 'classnames';
// import React from 'react';
// import { Todo } from '../../types/Todo';

// type TodosType = {
//   todo: Todo,
// };

// export const TodoInfo: React.FC<TodosType> = ({ todo }) => {
//   const { id, title, completed } = todo;

//   return (
//     <>
//       <tr data-cy="todo" className="has-background-info-light">
//         <td className="is-vcentered">{id}</td>
//         <td className="is-vcentered">
//           {completed
//             ? (
//               <span className="icon" data-cy="iconCompleted">
//                 <i className="fas fa-check" />
//               </span>
//             )
//             : null}
//         </td>

//         <td className="is-vcentered is-expanded">
//           <p className={classNames(
//             { 'has-text-danger': completed === false },
//             { 'has-text-success': completed === true },
//           )}
//           >
//             {title}
//           </p>
//         </td>

//         <td className="has-text-right is-vcentered">
//           <button data-cy="selectButton" className="button" type="button">
//             <span className="icon">
//               <i className="far fa-eye-slash" />
//             </span>
//           </button>
//         </td>
//       </tr>
//     </>
//   );
// };
