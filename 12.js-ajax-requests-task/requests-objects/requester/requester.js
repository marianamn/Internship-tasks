let Requester = (function () {
    class RequesterClass {
        get(url) {
            let promise = new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => resolve(response.json()))
                    .catch(error => reject(error));
            });

            return promise;
        }
    }

    return RequesterClass;
}());