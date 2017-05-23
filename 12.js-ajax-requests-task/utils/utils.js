let Utils = (function () {
    class UtilsClass {
        getExactDate(date) {
            let monthAsNumber = date.getMonth();
            let month,
                currentDate,
                result;

            switch (monthAsNumber) {
                case 0: month = 'Jan'; break;
                case 1: month = 'Feb'; break;
                case 2: month = 'Mar'; break;
                case 3: month = 'Apr'; break;
                case 4: month = 'May'; break;
                case 5: month = 'Jun'; break;
                case 6: month = 'Jul'; break;
                case 7: month = 'Aug'; break;
                case 8: month = 'Sep'; break;
                case 9: month = 'Oct'; break;
                case 10: month = 'Nov'; break;
                case 11: month = 'Dec'; break;
            }

            currentDate = date.getDate();
            result = `${month} ${currentDate}`;

            return result
        }

        getFormattedDate(date, hours) {
            let messegeResult;

            if (hours === 1) {
                messegeResult = `${hours} hour ago`;
            } else if (hours < 24) {
                messegeResult = `${hours} hours ago`;
            } else if (hours === 24) {
                messegeResult = `a day ago`;
            } else if (hours < 24 * 30) {
                let days = Math.floor(hours / 24);
                messegeResult = `${days} days ago`;
            } else {
                let year = date.getFullYear();
                let currentYear = (new Date()).getFullYear();
                let result = this.getExactDate(date);

                if (year === currentYear) {
                    // Jan 26
                    messegeResult = result;
                } else {
                    // Jan 26, 2016
                    messegeResult = `${result}, ${year}`;
                }
            }

            return messegeResult;
        }
    }


    return UtilsClass;
}());