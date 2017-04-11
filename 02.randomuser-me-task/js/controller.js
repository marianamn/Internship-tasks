var controller = (function() {
    function showUsersInfo() {
        data.getUsers()
            .then(function(response) {
                console.log(response.results);

                // jQuery append elements to container
            });
    }

    return {
        showUsersInfo: showUsersInfo
    }
}())