import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

// type State = {
//   isLoading: boolean;
//   isVisible: boolean;
// };

const initialState = {
  isLoading: false,
  isVisible: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true,
        isVisible: false,
      };

    case FINISH_LOADING:
      return {
        isVisible: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
