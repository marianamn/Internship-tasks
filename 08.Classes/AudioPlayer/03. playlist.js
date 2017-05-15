function solve() {
    var CONSTANTS = {
        TEXT_MIN_LENGTH: 3,
        TEXT_MAX_LENGTH: 25,
        IMDB_MIN_RATING: 1,
        IMDB_MAX_RATING: 5,
        MAX_NUMBER: 9007199254740992
    };

    function indexOfElementWithIdInCollection(collection, id) {
        var i, len;
        for (i = 0, len = collection.length; i < len; i++) {
            if (collection[i]._id == id) {
                return i;
            }
        }

        return -1;
    }

    function getSortingFunction(firstParameter, secondParameter) {
        return function (first, second) {
            if (first[firstParameter] < second[firstParameter]) {
                return -1;
            }
            else if (first[firstParameter] > second[firstParameter]) {
                return 1;
            }

            if (first[secondParameter] < second[secondParameter]) {
                return -1;
            }
            else if (first[secondParameter] > second[secondParameter]) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

    //--------------------------------------Player----------------------------------------------
    var player = (function () {
        var player = {},
            lastId = 0;

        //CONSTRUCTOR
        Object.defineProperty(player,'init',{
            value: function (name) {
                this.name = name;
                this._id = ++ lastId;
                this._playList = [];
                return this;
            }
        })

        //VALIDATIONS
        Object.defineProperty(player, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                //nameValidation(value);
                validator.validateString(value, 'Player name');

                this._name = value;
            }
        })

        Object.defineProperty(player, 'id', {
            get: function () {
                return this._id;
            }
        })

        //METHODS
        Object.defineProperties(player, {
            addPlaylist: {
                value: function (playlistToAdd) {
                    validator.validateIfUndefined(playlistToAdd, 'Player add playlist parameter');

                    //if (typeof(playlistToAdd._id) === undefined || !playlistToAdd.name) {
                    //    throw new Error('Playlist is not an instance of PlayList!')
                    //}

                    this._playList.push(playlistToAdd);
                    return this;
                }
            },
            getPlaylistById: {
                value: function (id) {
                    validator.validateIfUndefined(id, 'Player get playlist parameter id');
                    validator.validateIfNumber(id, 'Player get playlist paratemeter id');

                    var foundIndex = indexOfElementWithIdInCollection(this._playList, id);
                    if (foundIndex < 0) {
                        return null;
                    }

                    return this._playList[foundIndex];
                }
            },
            removePlaylist: {
                value: function (id) {
                    id = validator.validateId(id);

                    var foundIndex = indexOfElementWithIdInCollection(this._playList, id);
                    if (foundIndex < 0) {
                        throw new Error('Playlist with id ' + id + ' was not found in player');
                    }

                    this._playList.splice(foundIndex, 1);

                    return this;
                }
            },
            listPlaylists: {
                value: function (page, size) {
                    validator.validatePageAndSize(page, size, this._playList.length);

                    return this._playList
                        .slice()
                        .sort(getSortingFunction('name', 'id'))
                        .splice(page * size, size);
                }
            },
            contains: {
                value: function (playable, playlist) {
                    validator.validateIfUndefined(playable);
                    validator.validateIfUndefined(playlist);
                    var playableId = validator.validateId(playable.id);
                    var playlistId = validator.validateId(playlist.id);

                    var playlist = this.getPlaylistById(playlistId);
                    if (playlist == null) {
                        return false;
                    }

                    var playable = playlist.getPlayableById(playableId);
                    if (playable == null) {
                        return false;
                    }

                    return true;
                }
            },
            search: {
                value: function (pattern) {
                    validator.validateIfUndefined(playable);
                    validator.validateIfUndefined(playlist);

                    return this._playList
                        .filter(function (playlist) {
                            return playlist
                                .listPlayables()
                                .some(function (playable) {
                                    return playable.length !== undefined
                                        && playable
                                            .title
                                            .toLowerCase()
                                            .indexOf(pattern.toLowerCase()) >= 0;
                                });
                        })
                        .map(function (playlist) {
                            return {
                                id: playlist.id,
                                name: playlist.name,
                            }
                        });
                }
            }
        })
    
        return player;
    }())

    //--------------------------------------PlayList----------------------------------------------
    var playList = (function () {
        var playList = {},
            lastId = 0;

        //CONSTRUCTOR
        Object.defineProperty(playList, 'init', {
            value: function (name) {
                this.name = name;
                this._id = ++ lastId;
                this._playables = [];

                return this;
            }
        });

        Object.defineProperty(playList, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                //nameValidation(value);
                validator.validateString(value, 'Playlist name');

                this._name = value;
            }
        })

        Object.defineProperty(playList, 'id', {
            get: function () {
                return this._id;
            }
        })

        //METHODS
        Object.defineProperties(playList, {
            addPlayable: {
                value: function (playable) {
                    validator.validateIfUndefined(playable, 'Playlist add playable parameter');
                    validator.validateIfObject(playable, 'Playlist add playable parameter');
                    validator.validateIfUndefined(playable.id, 'Playlist add playable parameter must have id');

                    this._playables.push(playable);
                    return this;
                }
            },
            getPlayableById: {
                value: function (id) {
                    validator.validateIfUndefined(id, 'Playlist get playable parameter id');
                    validator.validateIfNumber(id, 'Playlist get playable paratemeter id');

                    var foundIndex = indexOfElementWithIdInCollection(this._playables, id);

                    if (foundIndex < 0) {
                        return null;
                    }

                    return this._playables[foundIndex];
                }
            },
            removePlayable: {
                value: function (id) {
                    id = validator.validateId(id);

                    var foundIndex = indexOfElementWithIdInCollection(this._playables, id);
                    if (foundIndex < 0) {
                        throw new Error('Playable with id ' + id + ' was not found in playlist');
                    }

                    this._playables.splice(foundIndex, 1);

                    return this;
                }
            },
            listPlayables: {
                value: function (page, size) {
                    page = page || 0;
                    size = size || CONSTANTS.MAX_NUMBER;
                    validator.validatePageAndSize(page, size, this._playables.length);

                    return this
                        ._playables
                        .slice()
                        .sort(getSortingFunction('title', 'id'))
                        .splice(page * size, size);
                }
            }
        })

        return playList;
    }())

    //--------------------------------------Playable----------------------------------------------
    var playable = (function () {
        var playable = {},
            lastId = 0;

        Object.defineProperty(playable, 'init', {
            value: function (title, author) {
                this._id = ++ lastId;
                this.title = title;
                this.author = author;

                return this;
            }
        })

        Object.defineProperty(playable, 'title', {
            get: function () {
                return this._title;
            },
            set: function (value) {
                //nameValidation(value);
                validator.validateString(value, 'Playable Title');

                this._title = value;
            }
        })

        Object.defineProperty(playable, 'author', {
            get: function () {
                return this._author;
            },
            set: function (value) {
                //nameValidation(value);
                validator.validateString(value, 'Playable Author');

                this._author = value;
            }
        })

        Object.defineProperty(playable, 'id', {
            get: function () {
                return this._id;
            },
        })

        Object.defineProperty(playable, 'play', {
            value: function () {
                return this._id + '.' + this.title + ' - ' + this.author;
            }
        })

        return playable;
    }())

    //--------------------------------------Audio----------------------------------------------
    var audio = (function (parent) {
        var audio = Object.create(parent);

        Object.defineProperty(audio, 'init', {
            value: function (title, author, length) {
                parent.init.call(this, title, author);
                this.length = length;
                return this;
            }
        })

        Object.defineProperty(audio, 'title', {
            get: function () {
                return this._title;
            },
            set: function (value) {
                nameValidation(value);

                this._title = value;
            }
        })

        Object.defineProperty(audio, 'author', {
            get: function () {
                return this._author;
            },
            set: function (value) {
                nameValidation(value);

                this._author = value;
            }
        })

        Object.defineProperty(audio, 'length', {
            get: function () {
                return this._length;
            },
            set: function (value) {
                nameValidation(value);

                this._length = value;
            }
        })

        Object.defineProperty(audio, 'play', {
            value: function () {
                var baseResult = parent.play.call(this);

                return baseResult + ' - ' + this.length;
            }
        })

        return audio;
    }(playable))

    //--------------------------------------Video----------------------------------------------
    var video = (function (parent) {
        var video = Object.create(parent);

        Object.defineProperty(video, 'init', {
            value: function (title, author, imdbRating) {
                parent.init.call(this,title, author);
                this.imdbRating = imdbRating;
                return this;
            }
        })

        Object.defineProperty(video, 'title', {
            get: function () {
                return this._title;
            },
            set: function (value) {
                nameValidation(value);

                this._title = value;
            }
        })

        Object.defineProperty(video, 'author', {
            get: function () {
                return this._author;
            },
            set: function (value) {
                nameValidation(value);

                this._author = value;
            }
        })

        Object.defineProperty(video, 'play', {
            value: function () {
                var baseResult = parent.play.call(this);

                return baseResult + ' - ' + this.imdbRating;
            }
        })

        return video;
    }(playable))

    //--------------------------------------Validations----------------------------------------------
    function nameValidation (name) {
        if (name.length < 3 || name.length > 25) {
            throw new Error('Name must be between 3 and 25 characters!');
        }
    }

    function lengthValidation (length) {
        if (length < 0) {
            throw new Error('Length must be greater than zero!');
        }
    }

    validator = {
        validateIfUndefined: function (val, name) {
            name = name || 'Value';
            if (val === undefined) {
                throw new Error(name + ' cannot be undefined');
            }
        },
        validateIfObject: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'object') {
                throw new Error(name + ' must be an object');
            }
        },
        validateIfNumber: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'number') {
                throw new Error(name + ' must be a number');
            }
        },
        validateString: function (val, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);

            if (typeof val !== 'string') {
                throw new Error(name + ' must be a string');
            }

            if (val.length < CONSTANTS.TEXT_MIN_LENGTH
                || CONSTANTS.TEXT_MAX_LENGTH < val.length) {
                throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                    ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
            }
        },
        validatePositiveNumber: function (val, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfNumber(val, name);

            if (val <= 0) {
                throw new Error(name + ' must be positive number');
            }
        },
        validateImdbRating: function (val) {
            this.validateIfUndefined(val, 'IMDB Rating');
            this.validateIfNumber(val, 'IMDB Rating');

            if (val < CONSTANTS.IMDB_MIN_RATING || CONSTANTS.IMDB_MAX_RATING < val) {
                throw new Error('IMDB Rating must be between '
                    + CONSTANTS.IMDB_MIN_RATING
                    + ' and ' + CONSTANTS.IMDB_MAX_RATING);
            }
        },
        validateId: function (id) {
            this.validateIfUndefined(id, 'Object id');
            if (typeof id !== 'number') {
                id = id.id;
            }

            this.validateIfUndefined(id, 'Object must have id');
            return id;
        },
        validatePageAndSize: function (page, size, maxElements) {
            this.validateIfUndefined(page);
            this.validateIfUndefined(size);
            this.validateIfNumber(page);
            this.validateIfNumber(size);

            if (page < 0) {
                throw new Error('Page must be greather than or equal to 0');
            }

            this.validatePositiveNumber(size, 'Size');

            if (page * size > maxElements) {
                throw new Error('Page * size will not return any elements from collection');
            }
        }
    };

    var module = {
        getPlayer: function (name) {
            return Object.create(player).init(name);
        },
        getPlaylist: function (name) {
            return Object.create(playList).init(name);
        },
        getAudio: function (title, author, length) {
            return Object.create(audio).init(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return Object.create(video).init(title, author, imdbRating);
        }
    };

    return module;
}

//module.exports = solve;

var module = solve();
var player = module.getPlayer('Player name');
var playList = module.getPlaylist('Playlist name');
var audio = module.getAudio('Bibib', 'Mimi', 3);
var video = module.getVideo('Home', 'ivan', 34)
console.log(player);
console.log(playList);
console.log(player.addPlaylist(playList));
console.log(player.getPlaylistById(1));
console.log(player.removePlaylist(1));
console.log(audio);
console.log(video);
console.log(playList.addPlayable(audio));
console.log(playList.addPlayable(audio));
console.log(playList.addPlayable(video));
console.log(playList.getPlayableById(1));
console.log(playList.removePlayable(1));
