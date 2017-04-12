var controller = (function() {
    var i,
        image,
        gender,
        email,
        name;

    function seedInfo(image, name, gender, email) {
        var container = $("#container");

        var div = $("<div></div>");
        div.addClass("user-data");

        var userImage = $("<img/>");
        userImage.addClass("user-img");
        userImage.attr("src", image);

        var userName = $("<p>" + name + "</p>");
        userName.addClass("user-name");

        var userGender = $("<p>gender: " + gender + "</p>");
        userGender.addClass("user-gender");

        var userEmail = $("<p>email: " + email + "</p>");
        userEmail.addClass("user-email");

        div.append(userImage);
        div.append(userName);
        div.append(userGender);
        div.append(userEmail);
        container.append(div);
    }

    function showUsersInfo() {
        data.getUsers()
            .then(function(response) {
                // console.log(response.results);
                var len = response.results.length;

                for (i = 0; i < len; ++i) {
                    image = response.results[i].picture.medium;
                    name = response.results[i].name.title + ". " +
                        response.results[i].name.first + " " +
                        response.results[i].name.last;
                    gender = response.results[i].gender;
                    email = response.results[i].email;

                    seedInfo(image, name, gender, email);
                }
            });
    }

    return {
        showUsersInfo: showUsersInfo
    }
}())