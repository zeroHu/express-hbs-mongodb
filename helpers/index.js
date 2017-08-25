const hbs = require('express-hbs');

//接入特定文件的helper
require('./users').init(hbs);

// 公用helper
hbs.registerHelper('wordToSubstring', function(substring) {
    return substring.substring(0, 8);
});