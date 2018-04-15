const ResouceUtil = (function () {

    const storage = window.localStorage;

    function getResource(src) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', src, true)
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState == 4) {
                    resolve(xhr.responseText)
                }
            }
            xhr.onerror = function (event) {
                reject(event)
            }
            xhr.send(null);
        })
    }

    function getResourceFromStorage(src) {
        return storage.getItem(src)
    }

    function putResourceToSotrage(src, resource) {
        storage.setItem(src, resource)
    }

    function getScript(src) {
        new Promise(function (resolve, reject) {
            let resource = getResourceFromStorage(src)

            if (!!resource) {
                resolve(resource)
                return
            }

            return getResource(src)
                .then(putResourceToSotrage)
                .catch(console.log)
        })
    }

    return {
        getScript: function () {
            getResource('/script')
                .then(console.log)
                .catch(console.log)
        }
    }
}())