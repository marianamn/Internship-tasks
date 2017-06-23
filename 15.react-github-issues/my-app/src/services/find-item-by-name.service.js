function findItemByName(name, items) {
    var foundItem = '';

    items.forEach(function (item) {
        if (item.full_name === name) {
            foundItem = item;
        }
    });

    return foundItem;
}

export default findItemByName;