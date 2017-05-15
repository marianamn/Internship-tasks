function solve() {
		const TEXT_MIN_LENGTH = 2,
        TEXT_MAX_LENGTH = 40,
        TEXT_EXACT_LENGTH_FIRST = 10,
        TEXT_EXACT_LENGTH_SECOND = 13,
        GENRE_MIN_LENGTH = 2,
        GENRE_MAX_LENGTH = 20,
        RATING_MIN_VALUE = 1,
        RATING_MAX_VALUE = 5,
        NUMBER_BORDER = 1;

    const validator = {
        validateIfUndefined(val, name){
            name = name || 'Value';

            if(val === undefined){
                throw new Error(name + ' cannot be undefined')
            }
        },
        validateIfObject(val, name){
            name = name || 'Value';

            if(typeof val !== 'object'){
                throw new Error(name + ' cannot be an Object')
            }
        },
        validateIfNumber(val, name){
            name = name || 'Value';

            if(typeof val !== 'number'){
                throw new Error(name + ' must be a number');
            }
        },
        validateIfNonEmptyString(val, name){
            name = name || 'Value';

            this.validateIfUndefined(val, name);

            this.validateIfString(val, name);

            if(val.length < 1){
                throw new Error(name + ' must be a non-empty string');
            }
        },
        validateIfString(val, name){
            name = name || 'Value';

            if(typeof val !== 'string'){
                throw new Error(name + ' must be a string');
            }
        },
        validatingStringLength(val, name, min, max){
            name = name || 'Value';

            this.validateIfUndefined(val, name);

            this.validateIfString(val, name);

            if(val.length < min || max < val.length){
                throw new Error(name + ' must be between ' + min + ' and ' + max + ' symbols');
            }
        },
        validateStringExactlyLength(val, name){
            name = name || 'Value';

            if(val.length !== TEXT_EXACT_LENGTH_FIRST && val.length !== TEXT_EXACT_LENGTH_SECOND){
                throw new Error(name + ' must be exactly ' + TEXT_EXACT_LENGTH_FIRST + ' or ' + TEXT_EXACT_LENGTH_SECOND + ' characters');
            }
        },
        validateStringContainsOnlyDigits(val, name){
            name = name || 'Value';

            if(!val.match(/^[0-9]*$/)){
                throw new Error(name + ' must contains only digits');
            }
        },
        validatePositiveNumber(val, name){
            name = name || 'Value';

            this.validateIfUndefined(val, name);

            this.validateIfNumber(val, name);

            if(val <= 0){
                throw new Error(name + ' must be greater than zero');
            }
        },
        validateNumberIsLessThanBorder(val, name){
            name = name || 'Value';

            this.validateIfUndefined(val, name);

            this.validateIfNumber(val, name);

            if(val < NUMBER_BORDER){
                throw new Error(name + ' must be less than ' + NUMBER_BORDER);
            }
        },
        validateNumberInRange(val, name, min, max){
            name = name || 'Value';

            this.validateIfUndefined(val, name);

            this.validateIfNumber(val, name);

            if(val <min || max < val){
                throw new Error(name + ' must be between ' + min + ' and ' + max);
            }
        },
        validateNonEmptyArrayWithValidObjects(array, validFunc) {
            validFunc = validFunc || function() {
                    return true;
                };

            return Array.isArray(array) && array.length > 0 &&
                array.every(validFunc);
        }
    };

    // ========================================================================
    // Item
    // ========================================================================
    let currentItemId = 0;
    class Item{
        constructor(name, description){
            this.id = ++ currentItemId;
            this.name = name;
            this.description = description;
        }

        get name(){
            return this._name;
        }

        set name(val){
            validator.validatingStringLength(val, 'Item name', TEXT_MIN_LENGTH, TEXT_MAX_LENGTH);

            this._name = val;
        }

        get description(){
            return this._description;
        }

        set description(val){
            validator.validateIfNonEmptyString(val, 'Item description');

            this._description = val;
        }
    }

    // ========================================================================
    // Book ---> inherits Item
    // ========================================================================
    class Book extends Item{
        constructor(name, isbn, genre, description){
            super(name, description);
            this.isbn = isbn;
            this.genre = genre;
        }

        get isbn(){
            return this._isbn;
        }

        set isbn(val){
            validator.validateIfUndefined(val, 'Book ISBN');
            validator.validateIfString(val, 'Book ISBN');
            validator.validateStringExactlyLength(val, 'Book ISBN');
            validator.validateStringContainsOnlyDigits(val, 'Book ISBN');

            this._isbn = val;
        }

        get genre(){
            return this._genre;
        }

        set genre(val){
            validator.validatingStringLength(val, 'Book genre', GENRE_MIN_LENGTH, GENRE_MAX_LENGTH);

            this._genre = val;
        }
    }

    // ========================================================================
    // Media ---> inherits Item
    // ========================================================================
    class Media extends Item{
        constructor(name, rating, duration, description){
            super(name, description);
            this.duration = duration;
            this.rating = rating;
        }

        get rating(){
            return this._rating;
        }

        set rating(val){
            validator.validateNumberInRange(val, 'Media rating', RATING_MIN_VALUE, RATING_MAX_VALUE);

            this._rating = val;
        }

        get duration(){
            return this._duration;
        }

        set duration(val){
            validator.validatePositiveNumber(val, 'Media duration');

            this._duration = val;
        }
    }

    // ========================================================================
    // Catalog
    // ========================================================================
    let currentCatalogId = 0;
    class Catalog{
        constructor(name){
            this.id = ++ currentCatalogId;
            this.name = name;
            this.items = [];
        }

        get name(){
            return this._name;
        }

        set name(val){
            validator.validatingStringLength(val, 'Catalog name', TEXT_MIN_LENGTH, TEXT_MAX_LENGTH);

            this._name = val;
        }

        add(...items){
            if(Array.isArray(items[0])){
                items = items[0];
            }

            if (!validator.validateNonEmptyArrayWithValidObjects(items, this._itemLikeObjectValidation)) {
                throw new Error("Invalid items");
            }

            this.items.push(...items);

            return this;
        }

        find(x){
            //items [{name: 'Samsung Galaxy S2', id: 2}, {name: 'Peralnya Hubava', id: 3}, {name: 'Samsung Galaxy S2', id: 4}]
            //find({name: 'Samsung Galaxy S2'})
            //returns [{name: 'Samsung Galaxy S2', id: 2}, {name: 'Samsung Galaxy S2', id: 4}]
            //find({id: 3})
            //returns [{name: 'Peralnya Hubava', id: 3}]
            //find({id: 2, name: 'Samsung Galaxy S2'})
            //returns [{name: 'Samsung Galaxy S2', id: 2}]

            if(typeof x === 'number') {
                for(let item of this.items) {
                    if(item.id === x) {
                        return item;
                    }
                }

                return null;
            }

            if(x !== null && typeof x === 'object') {
                return this.items
                            .filter(function(item) {
                    return Object.keys(x)
                            .every(function(prop) {
                        return x[prop] === item[prop];
                    });
                });
            }

            throw 'Invalid options or id';
        }

        search(pattern) {
            validator.validateIfNonEmptyString(pattern, 'Search pattern');

            return this.items
                        .filter(function(item) {
                            return item.name.indexOf(pattern) >= 0 || item.description.indexOf(pattern) >= 0;
            });
        }

        _itemLikeObjectValidation(item) {

            return (item instanceof Item) ||
                (typeof item.id === "number" &&
                typeof item.name === "string" &&
                typeof item.description === "string");
        }
    }

    // ========================================================================
    // BookCatalog ---> inherits Catalog
    // ========================================================================
    class BookCatalog extends Catalog{
        constructor(name){
            super(name);
        }

        add(...books){
            if(Array.isArray(books[0])){
                books = books[0];
            }

            books.forEach(function(book){
                if(!(book instanceof Book)){
                    throw Error('In Books catalog must be added only books');
                }
            })

            return super.add(...books);
        }

        getGenres(){
            let uniqueGenres = {};
            this.items.forEach(item => uniqueGenres[item.genre] = true);
            return Object.keys(uniqueGenres);
        }

        find(x){
            return super.find(x);
        }
    }

    // ========================================================================
    // MediaCatalog ---> inherits Catalog
    // ========================================================================
    class MediaCatalog extends Catalog{
        constructor(name){
            super(name);
        }

        add(...medias){
            if(Array.isArray(medias[0])){
                medias = medias[0];
            }

            medias.forEach(function(media){
                if(!(media instanceof Media)){
                    throw Error('In Media catalog must be added only medias');
                }
            })

            return super.add(...medias);
        }

        getTop(count){
            validator.validateNumberIsLessThanBorder(count, 'Get top media number');

            return this.items
                .slice()
                .sort((a, b) => a.rating < b.rating)
                .splice(0, count)
                .map(x => ({
                    id: x.id,
                    name: x.name
                }));
        }

        getSortedByDuration(){
            return this.items
                .sort((a, b) => {
                    if(a.duration === b.duration) {
                        return a.id < b.id;
                    }

                    return b.duration > a.duration;
                });
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function (name) {
            return new MediaCatalog(name);
        }
    };
}

// local tests
module.exports = solve;
