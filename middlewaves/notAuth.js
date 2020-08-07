/** @format */

var User = require('../models/user');

module.exports.requireName = async function (req, res, next) {
      var user = '';
    if (!req.signedCookies.userId) {
        user = '';
    } else {
        var user = await User.findById(req.signedCookies.userId);
        if (!user) {
            user = '';
        }
    }
    res.locals.user = user;
    next();
};
