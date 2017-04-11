var itemsToShow = 10;

var data = (function() {
    function getUsers() {
        var url = 'https://randomuser.me/api/?results=' + itemsToShow;

        return requester.getJSON(url);
    }

    return {
        getUsers: getUsers
    }
}());