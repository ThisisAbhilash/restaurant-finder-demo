export const MakeAPICall = endPoint => {
    return new Promise(async (resolve, reject) => {
        let apiResponse = await (await fetch(endPoint)).json();
        
        if (apiResponse instanceof Error) {
            return reject(apiResponse);
        }
        return resolve(apiResponse);
    });
}

export const GetUserLocation = () => {
    return new Promise((resolve, reject) => {
        const geolocation = navigator.geolocation;
        if (!geolocation) {
            return reject(new Error('Geo Location Not Supported.'));
        }
        geolocation.getCurrentPosition(position => {
            return resolve(position);
        }, () => {
            return resolve({notAllowedToAccessLocation: true});
        });
    });
}