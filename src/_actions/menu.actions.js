export const menuActions = {
    setOrder,
    setDetails,
};

function setOrder(order) {
    return dispatch => {
        dispatch(success(order));
    };
    function success(order) { return { type: "setOrderSuccess", order} }
}

function setDetails(number, location) {
    return dispatch => {
        dispatch(success(number, location));
    };
    function success(number, location) { return { type: "setDetailsSuccess", number, location} }
}