/** @format */

var User = require('../models/user');

module.exports.index = async function (req, res, next) {
    if (!req.query.q) {
        req.query.q = '';
    }
    let currentPage = 1;
    const limit = 5;
    if (req.query.page && req.query.page > 0) {
        currentPage = parseInt(req.query.page);
    }
    const skiper = (currentPage - 1) * limit;
    const users = await User.find(
        {
            $or: [
                { name: { $regex: '.*' + req.query.q + '.*' } },
                { email: { $regex: '.*' + req.query.q + '.*' } },
            ],
        },
        null,
        { limit: limit, skip: skiper },
    );
    const count = await User.find({
        $or: [
            { name: { $regex: '.*' + req.query.q + '.*' } },
            { email: { $regex: '.*' + req.query.q + '.*' } },
        ],
    }).countDocuments();
    const totalPage = Math.ceil(count / limit);
    const previous = `${process.env.MYHOST}users?page=${currentPage - 1}&q=${
        req.query.q
    }`;
    const nextPage = `${process.env.MYHOST}users?page=${currentPage + 1}&q=${
        req.query.q
    }`;
    let pages = [];
    for (i = 1; i <= totalPage; i++) {
        pages.push(`${process.env.MYHOST}users?page=${i}&q=${req.query.q}`);
    }
    res.render('users/index', {
        q: req.query.q,
        users,
        title: 'Người dùng',
        totalPage,
        pages,
        currentPage,
        previous,
        nextPage,
    });
};

module.exports.create = async function (req, res, next) {
    const user = await User.create(req.body);
    res.send(user);
};

module.exports.update = async function (req, res, next) {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users');
};

module.exports.delete = async function (req, res, next) {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
};
