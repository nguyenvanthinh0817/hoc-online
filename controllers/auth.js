/** @format */

const User = require('../models/user');

module.exports.login = async function (req, res, next) {
    res.render('auth/login');
};

module.exports.dangky = async function (req, res, next) {
    res.render('auth/dangky');
};

module.exports.postLogin = async function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
        res.render('auth/login', {
            errors: ['User does not exists'],
            values: req.body,
        });
        return;
    }
    if (user.password !== password) {
        res.render('auth/login', {
            errors: ['Wrong password'],
            values: req.body,
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true,
    });
    res.cookie('role', user.role);
    res.redirect('/');
};

module.exports.postDangky = async function (req, res, next) {
    const { email, name, password, rePassword } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
        res.render('auth/dangky', {
            values: req.body,
            errors: ['Email đã được đăng ký'],
        });
    }
    if (rePassword != password) {
        res.render('auth/dangky', {
            values: req.body,
            errors: ['Mật khẩu không khớp'],
        });
    }

    try {
        await User.create(req.body);
    } catch (error) {
        console.log(error);
    }

    res.redirect('/auth/login');
};
module.exports.logout = async function (req, res, next) {
    res.clearCookie('userId');
    res.clearCookie('role');
    res.redirect('/');
};
