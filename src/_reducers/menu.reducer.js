const initialState = {
  order:[],
  set1: false,
};

export function menu(state, action) {

  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case "setOrderSuccess":
    {
      console.log(action.order);
      return {
        ...state,
        order: action.order,
        set1: true,
      };
    }
    default:
      return state
  }
}