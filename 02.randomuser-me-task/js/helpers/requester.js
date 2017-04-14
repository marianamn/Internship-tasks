var requester = (function() {
    function getJSON(url) {
        var promise = new Promise(function(resolve, reject) {

            $.ajax({
                url: url,
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