if (process.env.NODE_ENV === 'production') {
    //prod environment
    module.exports = require('./prod');
} else {
    //dev environment
    module.exports = require('./dev');
}