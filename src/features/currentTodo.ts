import { Todo } from "../types/Todo";

const ModalLoading = 'currentTodo/ModalLoading';
const IsModal = 'currentTodo/IsModal';
const CurrentTodo = 'currentTodo/Set';

type ModalLoadingAction = { type: typeof ModalLoading; payload: boolean };
type IsModalAction = { type: typeof IsModal; payload: boolean };
type CurrentTodoAction = { type: typeof CurrentTodo; payload: Todo };

type Action = ModalLoadingAction | IsModalAction | CurrentTodoAction;

const modalLoading = (load: boolean): ModalLoadingAction => ({
  type: ModalLoading,
  payload: load,
});

const isModal = (showModal: boolean): IsModalAction => ({
  type: IsModal,
  payload: showModal,
});

const setCurrentTodo = (todo: Todo): CurrentTodoAction => ({
  type: CurrentTodo,
  payload: todo,
});

export const actions = { modalLoading, isModal, setCurrentTodo };

type CurrentTodoState = {
  modalLoading: boolean;
  isModal: boolean;
  todo: Todo | null;
};

const initialState: CurrentTodoState = {
  modalLoading: false,
  isModal: false,
  todo: null,
};

const currentTodoReducer = (
  state: CurrentTodoState = initialState, action: Action
): CurrentTodoState => {
  switch (action.type) {
    case ModalLoading:
      return {
        ...state,
        modalLoading: action.payload,
      };
    case IsModal:
      return {
        ...state,
        isModal: action.payload,
      };
    case CurrentTodo:
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};

export default currentTodoReducer;
