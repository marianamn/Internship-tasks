var requester = (function() {
    function getJSON(url) {
        var promise = new Promise((resolve, reject) => {

            $.ajax({
                url,
                method: "GET",
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    return {
        getJSON: getJSON
    }
}());