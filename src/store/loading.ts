type ActionStart = {
  type: 'start/loading',
};

type ActionFinish = {
  type: 'finish/loading'
};

type ActionLoading = (ActionStart | ActionFinish);

export const loadingReducer = (loading = false, action: ActionLoading) => {
  switch (action.type) {
    case 'start/loading':
      return true;
    case 'finish/loading':
      return false;
    default:
      return loading;
  }
}

export const actions = {
  startLoading: (): ActionStart => {
    return {
      type: 'start/loading'
    }
  },
  finishLoading: (): ActionFinish => {
    return {
      type: 'finish/loading'
    }
  },
}
