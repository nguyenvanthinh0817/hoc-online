var Khoahoc = require('../models/khoahoc');
var Baihoc = require('../models/baihoc');
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
    const khoahoc = await Khoahoc.findOne({_id: req.params.id});
    const baihocs = await Baihoc.find(
        { idKh: req.params.id, name: { $regex: '.*' + req.query.q + '.*' } },
        null,
        { limit: 5, skip: skiper },
    );
    const count = await Baihoc.find({
        idKh: req.params.id,
        name: { $regex: '.*' + req.query.q + '.*' },
    }).countDocuments();
    const totalPage = Math.ceil(count / limit);
    const linkPage= `${process.env.MYHOST}baihoc/${req.params.id}`
    const previous = `${linkPage}?page=${currentPage - 1}&q=${
        req.query.q
    }`;
    const nextPage = `${linkPage}?page=${currentPage + 1}&q=${
        req.query.q
    }`;
    let pages = [];
    for (i = 1; i <= totalPage; i++) {
        pages.push(`${linkPage}?page=${i}&q=${req.query.q}`);
    }

    res.render('baihoc/index', {
        q: req.query.q,
        khoahoc,
        baihocs,
        title: 'Bài học',
        totalPage,
        pages,
        currentPage,
        previous,
        nextPage,
    });
};


module.exports.create = async function (req, res, next) {
        const khoahoc = await Khoahoc.findOne({_id: req.params.id});

        res.render('baihoc/create',{khoahoc});
}

module.exports.postCreate = async function (req, res, next) {
    if (!req.file) {
        res.redirect(`/baihoc/create/${req.params.id}`);
    }
    req.body.link = req.file.path.split('\\').splice(1).join('/');
    req.body.idKh = req.params.id;
    await Baihoc.create(req.body);
    res.redirect(`/baihoc/${req.params.id}`);
}