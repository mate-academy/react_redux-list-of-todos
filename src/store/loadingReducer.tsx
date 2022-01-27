import { AnyAction } from 'redux';

const START = 'START';
const FINISH = 'FINISH';

export const startLoading = () => ({ type: START });
export const finishLoading = () => ({ type: FINISH });

const reducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case START:
      return false;
    case FINISH:
      return true;

    default:
      return loading;
  }
};

export default reducer;
