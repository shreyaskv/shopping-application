export const kartService = {
    sendKartID
};

const hostname = window.location.hostname + ':5000';

function sendKartID(kartID) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostname}/open?kartID=${kartID}`, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            if (response.status === 403) {
                console.log("403")
                localStorage.removeItem('user')
                window.location.reload(true);
            }

            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        }
        return json;
    });
}