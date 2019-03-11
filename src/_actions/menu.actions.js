export const menuActions = {
    setOrder
};

function setOrder(order) {
    return dispatch => {
        dispatch(success(order));
    };
    function success(order) { return { type: "setOrderSuccess", order} }
}