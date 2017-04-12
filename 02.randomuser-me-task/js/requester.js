var requester = (function() {
    function getJSON(url) {
        var promise = new Promise((resolve, reject) => {

            $.ajax({
                url,
                method: "GET",
                contentType: "application/json",
                success: function(response) {
                    resolve(response);
                    $("#spinner").hide();
                },
                error: function(err) {
                    reject(err);
                    $("#spinner").hide();
                }
            });
        });

        return promise;
    }

    return {
        getJSON: getJSON
    }
}());