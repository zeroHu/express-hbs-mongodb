const hbs = require('express-hbs');

exports.init = function(hbs) {
    hbs.registerHelper('changeword', function(str) {
        return '12345';
    });
};