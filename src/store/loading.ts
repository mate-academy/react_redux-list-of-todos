type StartLoadingAction = {
  type: 'START_LOADING';
};

type FinishLoadingAction = {
  type: 'FINISH_LOADING';
};

type Action = StartLoadingAction | FinishLoadingAction;

type State = {
  loading: boolean;
};

const initialState: State = {
  loading: false,
};

export const loadingReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const actions = {
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
  }),
};
