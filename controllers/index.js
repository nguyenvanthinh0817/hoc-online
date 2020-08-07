
var Khoahoc = require('../models/khoahoc');
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
    const khoahocs = await Khoahoc.find(
        { name: { $regex: '.*' + req.query.q + '.*' } },
        null,
        { limit: 5, skip: skiper },
    );
    const count = await Khoahoc.find({
        name: { $regex: '.*' + req.query.q + '.*' },
    }).countDocuments();
    const totalPage = Math.ceil(count / limit);
    const previous = `${process.env.MYHOST}?page=${currentPage - 1}&q=${
        req.query.q
    }`;
    const nextPage = `${process.env.MYHOST}?page=${currentPage + 1}&q=${
        req.query.q
    }`;
    let pages = [];
    for (i = 1; i <= totalPage; i++) {
        pages.push(`${process.env.MYHOST}?page=${i}&q=${req.query.q}`);
    }

    res.render('index', {
        q: req.query.q,
        khoahocs,
        title: 'Trang chủ',
        totalPage,
        pages,
        currentPage,
        previous,
        nextPage,
    });
};



module.exports.lienhe = async function (req, res, next) {
    res.render('index/lienhe')
}

module.exports.gioithieu = async function (req, res, next) {
    res.render('index/gioithieu')
}