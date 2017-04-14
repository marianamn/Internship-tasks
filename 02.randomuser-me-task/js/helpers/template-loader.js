var templateLoader = (function() {

    function get(templateName) {
        var url = "templates/" + templateName + ".handlebars";
        return requester.getJSON(url);
    }

    return {
        get: get
    };
}());