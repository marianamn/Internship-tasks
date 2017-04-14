var controller = (function() {
    var usersList;

    function showUsersInfo() {
        data.getUsers()
            .then(function(users) {
                usersList = users.results;
                // console.log(usersList);

                return templateLoader.get("users-list");
            })
            .then(function(html) {
                var compiledTemplate = Handlebars.compile(html);
                $('#container').html(compiledTemplate(usersList));
            });
    }

    return {
        showUsersInfo: showUsersInfo
    }
}())