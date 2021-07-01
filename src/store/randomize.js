export const SWITCH = 'randomize/switch';

export const actions = {
  [SWITCH]: () => ({ type: SWITCH }),
}

const randomizeReducer = (randomOrder = false, action) => {
  switch (action.type) {
    case SWITCH:
      return !randomOrder;
  
    default:
      return randomOrder;
  }
}

export default randomizeReducer;
