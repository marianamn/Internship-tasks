function solve() {
    function indexOfElementWithIdInCollection(collection, id) {
        var i, len;
        for (i = 0, len = collection.length; i < len; i++) {
            if (collection[i]._id == id) {
                return i;
            }
        }

        return -1;
    }

    //-------------------------Item-----------------------
    var item = (function () {
        var item = {},
            lastId = 0;

        Object.defineProperty(item, 'init',{
            value: function (name, description) {
                this.name = name;
                this._id = ++lastId;
                this.description = description;

                return this;
            }
        })

        Object.defineProperty(item, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                validateName(value, 'Item name');

                this._name = value;
            }
        })

        Object.defineProperty(item, 'description', {
            get: function () {
                return this._description;
            },
            set: function (value) {
                validateDescription(value, 'Item description')

                this._description = value;
            }
        })

        Object.defineProperty(item, 'id', {
            get: function () {
                return this._id;
            }
        })

        return item;
    }())

    //-------------------------Book-----------------------
    var book = (function (parent) {
        var book = Object.create(parent);

        Object.defineProperty(book, 'init', {
            value: function (name, isbn, genre, description) {
                parent.init.call(this, name, description);
                this.isbn = isbn;
                this.genre = genre;


                return this;
            }
        })

        Object.defineProperty(book, 'isbn', {
            get: function () {
                return this._isbn;
            },
            set: function (value) {
                validateIsbn(value, 'Book Isbn')

                this._isbn = value;
            }
        })

        Object.defineProperty(book, 'genre', {
            get: function () {
                return this._genre;
            },
            set: function (value) {
                validateGenre(value, 'Book genre')

                this._genre = value;
            }
        })

       
        return book;
    }(item))


    //-------------------------Media-----------------------
    var media = (function (parent) {
        var media = Object.create(parent);

        Object.defineProperty(media, 'init', {
            value: function (name, rating, duration, description) {
                parent.init.call(this, name, description);
                this.rating = rating;
                this.duration = duration;

                return this;
            }
        })

        Object.defineProperty(media, 'rating', {
            get: function () {
                return this._rating;
            },
            set: function (value) {
                validateRating(value, 'Media rating');

                this._rating = value;
            }
        })

        Object.defineProperty(media, 'duration', {
            get: function () {
                return this._duration;
            },
            set: function (value) {
                validateDuration(value, 'Media duration');

                this._duration = value;
            }
        })

        return media;
    }(item))

    //-------------------------Catalog-----------------------
    var catalog = (function () {
        var catalog = {},
            lastId = 0;

        Object.defineProperty(catalog, 'init', {
            value: function (name) {
                this.name = name;
                this._id = ++lastId;
                this._items = [];

                return this;
            }
        })

        Object.defineProperty(catalog, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                validateName(value, 'Catalog name');

                this._name = value;
            }
        })

        Object.defineProperty(catalog, 'id', {
            get: function () {
                return this._id;
            }
        })

        Object.defineProperties(catalog, {
            add: {
                value: function (itemToAdd) {
                    if (typeof (itemToAdd._id) === undefined || !itemToAdd.name) {
                        throw new Error('Item is not an instance of Item!')
                    }
                    else {
                        this._items.push(itemToAdd);
                    }

                    return this;
                }
            },
            find: {
                value: function (id) {

                    var foundIndex = indexOfElementWithIdInCollection(this._items, id);
                    if (foundIndex < 0) {
                        return null;
                    }
                    else if (isNaN(id) || !id.length) {
                        throw new Error ('some error')
                    }

                    return this._items[foundIndex];
                }
            }

        })

        return catalog;
    }())

    //-------------------------BookCatalog-----------------------
    var bookCatalog = (function (parent) {
        var bookCatalog = Object.create(catalog);

        Object.defineProperty(bookCatalog, 'init', {
            value: function (name) {
                parent.init.call(this, name);
                this._books = [];

                return this;
            }
        })

        Object.defineProperties(book, {
            add: function (bookToAdd) {
                if (typeof (bookToAdd._id) === undefined || !bookToAdd.name) {
                    throw new Error('Book is not an instance of Book!')
                }
                else {
                    this._books.push(bookToAdd);
                }

                return parent.add.call(this) + this._books;
            }
        })


        return bookCatalog;
    }(catalog))

    //-------------------------MediaCatalog-----------------------
    var mediaCatalog = (function (parent) {
        var mediaCatalog = Object.create(parent);

        Object.defineProperty(mediaCatalog, 'init', {
            value: function (name) {
                parent.init.call(this, name);

                return this;
            }
        })

        return mediaCatalog;
    }(catalog))

    //------------------------------Validations------------------------------
    function validateIfNumber(value, name) {
        name = name || 'Value';
        if (typeof value !== 'number') {
            throw new Error(name + ' must be a number');
        }
    }

    function validateIfUndefined(value, name) {
        name = name || 'Value';
        if (value === undefined) {
            throw new Error(name + ' cannot be undefined');
        }
    }

    function validateIfObject(value, name) {
        name = name || 'Value';
        if (typeof value !== 'object') {
            throw new Error(name + ' must be an object');
        }
    }

    function validateIfString(value, name) {
        name = name || 'Value';
        this.validateIfUndefined(val, name);

        if (typeof value !== 'string') {
            throw new Error(name + ' must be a string');
        }
    }

    function validateName(value, name) {
        if (value.length < 2 || value.length > 40) {
            throw new Error(name + 'must be between 2 and 40 letters iclusive!')
        }
    }

    function validateDescription(value, name) {
        if (!value.length) {
            throw new Error(name + 'must be non empty string!')
        }
    }

    function validateGenre(value, name) {
        if (value.length < 2 || value.length > 20) {
            throw new Error(name + ' must be between 2 and 20 letters iclusive!')
        }
    }

    function containsOnlyDigits(value, name) {
        var i,
            len;

        for (var i = 0, len = value.length; i < len; i++) {
            if (isNaN(value[i])) {
                throw new Error(name + ' must only digits!')
            }
        }
    }

    function validateIsbn(value, name) {
        containsOnlyDigits(value, name)

        if (value.length !== 10 && value.length !== 13) {
            throw new Error(name + ' must be exactly 10 or 13 digits!')
        }
    }

    function validateDuration(value, name) {
        validateIfUndefined(value, 'Duration');
        validateIfNumber(value, 'Duration');

        if (value < 0) {
            throw new Error(name + ' must be greeter than zero!')
        }
    }

    function validateRating(value, name) {
        validateIfUndefined(value, 'Rating');
        validateIfNumber(value, 'Rating');

        if (value < 1 || value > 5) {
            throw new Error(name + ' must be between 1 and 5!')
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            return Object.create(book).init(name, isbn, genre, description)
        },
        getMedia: function (name, rating, duration, description) {
            return Object.create(media).init(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return Object.create(bookCatalog).init(name);
        },
        getMediaCatalog: function (name) {
            return Object.create(mediaCatalog).init(name);
        }
    };
}

var module = solve();
var catalog = module.getBookCatalog('John\'s catalog');

var book1 = module.getBook('The secrets of the JavaScript Ninja', '1234567890', 'IT', 'A book about JavaScript');
var book2 = module.getBook('JavaScript: The Good Parts', '0123456789', 'IT', 'A good book about JS');
var book3 = '';

console.log(catalog.add(book1))
console.log(catalog.add(book2))

var bookCatalog = module.getBookCatalog('Book Catalog');
console.log(bookCatalog.add(book1))

//console.log(catalog.find(book1.id));
////returns book1
//
//console.log(catalog.find({ id: book2.id, genre: 'IT' }));
////returns book2

//console.log(catalog.search('js'));
//// returns book2
//
//console.log(catalog.search('javascript'));
////returns book1 and book2
//
//console.log(catalog.search('Te sa zeleni'))
////returns []

