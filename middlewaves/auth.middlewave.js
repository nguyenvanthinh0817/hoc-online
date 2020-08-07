/** @format */

var User = require('../models/user');

module.exports.requireAuth = async function (req, res, next) {
    if (!req.signedCookies.userId) {
        return res.redirect('auth/login');
        
    }

    var user = await User.findById(req.signedCookies.userId);
    if (!user) {
        return res.redirect('auth/login');
        
    }
    res.locals.user = user;
    next();
};

module.exports.requireRole = async function (req, res, next) {
	console.log(res.locals.user.role)
	if(res.locals.user.role === 'admin')
	{
		next();
	}
	else
		res.render('404err/404')
};

