var data = (function() {
    function getUsers() {
        var url = 'https://randomuser.me/api/';

        return requester.getJSON(url);
    }

    return {
        getUsers: getUsers
    }
}());