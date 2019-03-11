export const settingsService = {
    sendSetting,
    setPanID,
    threshold,
    heartBeat,
};

const hostName = window.location.hostname+ ':5000';

const hostNameXBee = window.location.hostname+':5001';
//const hostNameXBee = 'https://ancient-catfish-90.localtunnel.me';


function sendSetting(setting) {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };
/*
    return fetch(`https://099239c0-c7c8-488d-b965-7b1073b0c389.mock.pstmn.io/getCurrentTrackerInfo?id=${trackerID}`, requestOptions)
        .then(handleResponse)*/
}

function setPanID(panID) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "panID": panID
        })
    };

    console.log(panID);

    return fetch(`http://${hostNameXBee}/settings/xbeePanID `, requestOptions)
        .then(handleResponse)
}

function threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "maxWindSpeed": maxWindSpeed,
            "maxRainFall": maxRainFall,
            "meanWindSpeed": meanWindSpeed,
            "windSpeedTimer": windSpeedTimer,
        })
    };

    return fetch(`http://${hostName}/threshold`, requestOptions)
        .then(handleResponse)
}

function heartBeat(enabled, hbinterval, maxMsgs) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "enabled": enabled,
            "interval": hbinterval,
            "maxMsgs": maxMsgs,
        })
    };
    console.log(requestOptions);

    return fetch(`http://${hostName}/heartBeatSettings`, requestOptions)
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
