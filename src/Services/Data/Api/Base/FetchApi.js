export class FetchApi {

    sendGetRequest(url) {
        return this._sendDataRequest("GET", url);
    }

    sendDeleteRequest(url) {
        return this._sendDataRequest("DELETE", url);
    }

    sendPostRequest(url, data) {
        return this._sendDataRequest("POST", url, data);
    }

    sendPutRequest(url, data) {
        return this._sendDataRequest("PUT", url, data);
    }

    _sendDataRequest(method, url, data) {

        const fetchOptions = {
            method: method,
            credentials: "include"
        };

        if (data) {
            fetchOptions.body = JSON.stringify(data);
        }

        return this._sendRequest(url, fetchOptions);
    }

    _addHeaders(fetchOptions) {
        if (!fetchOptions) {
            return;
        }

        if (!fetchOptions.headers) {
            fetchOptions.headers = new Headers();
        }

        fetchOptions.headers.append("Content-Type", "application/json");
    }

    _sendRequest(url, fetchOptions) {
        if (!fetchOptions) {
            fetchOptions = {};
        }

        this._addHeaders(fetchOptions);

        return fetch(`https://test.creditsavvy.com.au/${url}`, fetchOptions);
    }

}