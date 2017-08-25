const hbs = require('express-hbs');

exports.init = function(hbs) {
    hbs.registerHelper('testhelper', function(str) {
        return '12345';
    });
};