function getTimeDifference(date) {
    let time = new Date(date);

    var diff = new Date().getTime() - time.getTime();

    return _getTimeDiffDescription(diff, 'day', 86400000, time) ||
        _getTimeDiffDescription(diff, 'hour', 3600000, time) ||
        _getTimeDiffDescription(diff, 'minute', 60000, time) ||
        _getTimeDiffDescription(diff, 'second', 1000, time) ||
        'just now';
}

function _getExactDate(date) {
    var monthAsNumber = date.getMonth();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[monthAsNumber];
    var currentDate = date.getDate();

    return month + ' ' + currentDate;
}

function _getTimeDiffDescription(diff, unit, divisor, time) {
    var unitAmount = (diff / divisor).toFixed(0);

    if (unitAmount < 0) {
        return 'in ' + Math.abs(unitAmount) + ' ' + unit + (unitAmount === -1 ? '' : 's') + 'ago';
    } else if (unitAmount > 0 && unitAmount < 31) {
        return unitAmount + ' ' + unit + (unitAmount === 1 ? '' : 's') + ' ago';
    } else if (unitAmount > 31 && unitAmount < 365) {
        return _getExactDate(time);
    } else if (unitAmount > 365) {
        var year = time.getFullYear();
        return _getExactDate(time) + ', ' + year;
    } else {
        return null;
    }
}

export default getTimeDifference;