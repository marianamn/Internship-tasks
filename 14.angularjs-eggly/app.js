angular.module('App', [])
    .controller('MainCtrl', function($scope) {
        $scope.categories = [
            { 'id': 0, 'name': 'Development' },
            { 'id': 1, 'name': 'Design' },
            { 'id': 2, 'name': 'Exercise' },
            { 'id': 3, 'name': 'Humor' }
        ];

        $scope.bookmarks = [
            { 'id': 0, 'title': 'AngularJs', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Development' },
            { 'id': 1, 'title': 'Egghesd.io', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Development' },
            { 'id': 2, 'title': 'A List Apart', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Design' },
            { 'id': 3, 'title': 'One page love', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Development' },
            { 'id': 4, 'title': 'MobilityWod', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Development' },
            { 'id': 5, 'title': 'Rob Wolf', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Exercise' },
            { 'id': 6, 'title': 'Senor Gif', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Exercise' },
            { 'id': 7, 'title': 'Wimp', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Humor' },
            { 'id': 8, 'title': 'Dump', 'url': 'https://egghead.io/lessons/angularjs-building-an-angular-app-controllers', 'category': 'Humor' },
        ];

        $scope.currentCategory = null;

        function setCurrentCategory(category) {
            $scope.currentCategory = category;

            cancelCreating();
            cancelEditing();
        }

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        $scope.setCurrentCategory = setCurrentCategory;
        $scope.isCurrentCategory = isCurrentCategory;

        // CRUD
        function resetCreateForm() {
            $scope.newBookmark = {
                title: '',
                url: '',
                category: $scope.currentCategory.name
            }
        }

        function createBookmark(bookmark) {
            bookmark.id = $scope.bookmarks.length;
            $scope.bookmarks.push(bookmark);

            resetCreateForm();
        }

        $scope.createBookmark = createBookmark;

        $scope.editedBookmark = null;

        function setEditedBookmark(bookmark) {
            $scope.editedBookmark = angular.copy(bookmark);
        }

        function updateBookmark(bookmark) {
            var index = _.findIndex($scope.bookmarks, function(b) {
                return b.id == bookmark.id;
            });

            $scope.bookmarks[index] = bookmark;
            $scope.editedBookmark = null;
            $scope.isEditing = false;
        }

        function isSelectedBookmark(bookmarkId) {
            return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
        }

        $scope.setEditedBookmark = setEditedBookmark;
        $scope.updateBookmark = updateBookmark;
        $scope.isSelectedBookmark = isSelectedBookmark;

        function deleteBookmark(bookmark) {
            _.remove($scope.bookmarks, function(b) {
                return b.id === bookmark.id;
            })
        }

        $scope.deleteBookmark = deleteBookmark;

        // creating and editing states
        $scope.isCreating = false;
        $scope.isEditing = false;

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;

            resetCreateForm();
        }

        function cancelCreating() {
            $scope.isCreating = false;
        }

        function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
        }

        function shouldShowCreating() {
            return $scope.currentCategory && !$scope.isEditing;
        }

        function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating;
        }

        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;
        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;

        $scope.shouldShowCreating = shouldShowCreating;
        $scope.shouldShowEditing = shouldShowEditing;
    });