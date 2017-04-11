var itemsToShow = 10;

var controller = (function() {
    function showUsersInfo() {
        data.getUsers()
            .then(function(response) {
                console.log(response.results);
            });
    }

    return {
        showUsersInfo: showUsersInfo
    }
}())