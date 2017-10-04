const connection = 'mongodb://localhost/skeleton';
const portToRun = 3001;
const urlToRun = `http://localhost${portToRun}`;

module.exports = {
    'connectionString': connection,
    'port': portToRun,
    'url': urlToRun,
    'secret': 'yourSecret'
};