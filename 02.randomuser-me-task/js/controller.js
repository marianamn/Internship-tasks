var controller = (function() {
    var i,
        image,
        gender,
        email,
        name;

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

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
                    name = capitalizeFirstLetter(response.results[i].name.title) + ". " +
                        capitalizeFirstLetter(response.results[i].name.first) + " " +
                        capitalizeFirstLetter(response.results[i].name.last);
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