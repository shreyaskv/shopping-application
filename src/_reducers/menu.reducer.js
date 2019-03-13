const initialState = {
  order:[],
  number: '',
  set1: false,
  set2: true,
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

    case "setDetailsSuccess":
    {
      return {
        ...state,
        number: action.number,
        location: action.location,
        set2: false,
      };
    }
    default:
      return state
  }
}