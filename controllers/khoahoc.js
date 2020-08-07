/** @format */

var Khoahoc = require('../models/khoahoc');
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
    const khoahocs = await Khoahoc.find(
        { name: { $regex: '.*' + req.query.q + '.*' } },
        null,
        { limit: 5, skip: skiper },
    );
    const count = await Khoahoc.find({
        name: { $regex: '.*' + req.query.q + '.*' },
    }).countDocuments();
    const totalPage = Math.ceil(count / limit);
    const previous = `${process.env.MYHOST}khoahoc?page=${currentPage - 1}&q=${
        req.query.q
    }`;
    const nextPage = `${process.env.MYHOST}khoahoc?page=${currentPage + 1}&q=${
        req.query.q
    }`;
    let pages = [];
    for (i = 1; i <= totalPage; i++) {
        pages.push(`${process.env.MYHOST}khoahoc?page=${i}&q=${req.query.q}`);
    }

    res.render('khoahocs/index', {
        q: req.query.q,
        khoahocs,
        title: 'Khóa học',
        totalPage,
        pages,
        currentPage,
        previous,
        nextPage,
    });
};

module.exports.getCreate = async function (req, res, next) {
    res.render('khoahocs/create');
};

module.exports.chitiet = async function (req, res, next) {
    try {
        if (!req.query.q) {
            req.query.q = '';
        }
        const khoahoc = await Khoahoc.findOne({ _id: req.params.id });

        let currentPage = 1;
        const limit = 5;
        if (req.query.page && req.query.page > 0) {
            currentPage = parseInt(req.query.page);
        }
        const skiper = (currentPage - 1) * limit;
        const users = await User.find(
            {
                khoahoc: req.params.id,
                $or: [
                    { name: { $regex: '.*' + req.query.q + '.*' } },
                    { email: { $regex: '.*' + req.query.q + '.*' } },
                ],
            },
            null,
            {
                limit: 5,
                skip: skiper,
            },
        );
        const count = await User.find({
            khoahoc: req.params.id,
            $or: [
                { name: { $regex: '.*' + req.query.q + '.*' } },
                { email: { $regex: '.*' + req.query.q + '.*' } },
            ],
        }).countDocuments();
        const totalPage = Math.ceil(count / limit);
        const previous = `${process.env.MYHOST}chitiet/${req.params.id}?page=${
            currentPage - 1
        }&q=${req.query.q}`;
        const nextPage = `${process.env.MYHOST}chitiet/${req.params.id}?page=${
            currentPage + 1
        }&q=${req.query.q}`;
        let pages = [];
        for (i = 1; i <= totalPage; i++) {
            pages.push(
                `${process.env.MYHOST}khoahoc/${req.params.id}?page=${i}&q=${req.query.q}`,
            );
        }
        res.render('khoahocs/chitiet', {
            q: req.query.q,
            khoahoc,
            users,
            totalPage,
            pages,
            currentPage,
            previous,
            nextPage,
        });
    } catch (error) {
        console.log(error);
        res.render('404err/404');
    }
};

module.exports.getThemhv = async function (req, res, next) {
    try {
        if (!req.query.q) {
            req.query.q = '';
        }
        const khoahoc = await Khoahoc.findOne({
            _id: req.params.id,
        });
        let currentPage = 1;
        const limit = 5;
        if (req.query.page && req.query.page > 0) {
            currentPage = parseInt(req.query.page);
        }
        const skiper = (currentPage - 1) * limit;
        const users = await User.find(
            {
                khoahoc: { $ne: req.params.id },
                $or: [
                    { name: { $regex: '.*' + req.query.q + '.*' } },
                    { email: { $regex: '.*' + req.query.q + '.*' } },
                ],
            },
            null,
            { limit: limit, skip: skiper },
        );
        const count = await User.find({
            khoahoc: { $ne: req.params.id },
            $or: [
                { name: { $regex: '.*' + req.query.q + '.*' } },
                { email: { $regex: '.*' + req.query.q + '.*' } },
            ],
        }).countDocuments();
        const totalPage = Math.ceil(count / limit);
        const previous = `${process.env.MYHOST}khoahoc/${req.params.id}?page=${
            currentPage - 1
        }&q=${req.query.q}`;
        const nextPage = `${process.env.MYHOST}khoahoc${req.params.id}?page=${
            currentPage + 1
        }&q=${req.query.q}`;
        let pages = [];
        for (i = 1; i <= totalPage; i++) {
            pages.push(
                `${process.env.MYHOST}khoahoc/${req.params.id}?page=${i}&q=${req.query.q}`,
            );
        }
        res.render('khoahocs/themhocvien', {
            q: req.query.q,
            tenKh: khoahoc.name,
            idKhoahoc: req.params.id,
            users,
            totalPage,
            pages,
            currentPage,
            previous,
            nextPage,
        });
    } catch (error) {
        console.log(error);
        res.render('404err/404');
    }
};

module.exports.update = async function (req, res, next) {
    try {
        const khoahoc = await Khoahoc.findOne({ _id: req.params.id });
        res.render('khoahocs/update', { khoahoc });
    } catch (error) {
        console.log(error);
        res.render('404err/404');
    }
};

module.exports.create = async function (req, res, next) {
    if (!req.file) {
        res.redirect('/khoahoc');
    }
    req.body.avatar = req.file.path.split('\\').splice(1).join('/');
    if (!req.body.giagiam || req.body.giagiam == '') {
        req.body.giagiam = 0;
    }
    await Khoahoc.create(req.body);
    res.redirect('/khoahoc');
};

module.exports.postUpdate = async function (req, res, next) {
    if (req.body.trangthai === undefined) {
        req.body.trangthai = false;
    }
    if (!req.file) {
        await Khoahoc.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.redirect('/khoahoc');
        return;
    }
    req.body.avatar = req.file.path.split('\\').splice(1).join('/');
    await Khoahoc.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.redirect('/khoahoc');
};
module.exports.delete = async function (req, res, next) {
    try {
        await Khoahoc.findOneAndDelete({ _id: req.params.id });
    } catch (err) {
        console.log(err);
    }
    res.redirect('/khoahoc');
};

module.exports.khaitru = async function (req, res, next) {
    try {
        const khoahoc = await Khoahoc.findOne({ _id: req.params.idKh });
        if (!khoahoc) {
            res.render('404err/404');
        }
        const user = await User.findOne({ _id: req.params.idHv });
        user.khoahoc.pop(req.params.idKh);
        await User.findOneAndUpdate({ _id: req.params.idHv }, user);
        var sohocvien = khoahoc.sohocvien - 1;
        await Khoahoc.findOneAndUpdate({ _id: req.params.idKh }, {sohocvien: sohocvien});
        res.redirect('/khoahoc/'+ req.params.idKh)
    } catch (error) {
        res.render('404err/404');
    }
};

module.exports.themhv = async function (req, res, next) {
    try {
        const khoahoc = await Khoahoc.findOne({ _id: req.params.idKh });
        if (!khoahoc) {
            res.render('404err/404');
        }
        const user = await User.findOne({ _id: req.params.idHv });

        const findKh = user.khoahoc.find((kh) => kh == req.params.idKh);
        if (findKh) {
            res.render('404err/404');
        }
        user.khoahoc.push(req.params.idKh);
        await User.findOneAndUpdate({ _id: req.params.idHv }, user);
        var sohocvien = khoahoc.sohocvien + 1;
        await Khoahoc.findOneAndUpdate({ _id: req.params.idKh },{sohocvien: sohocvien});
        res.redirect('/khoahoc/themhv/'+req.params.idKh)
    } catch (error) {
        res.render('404err/404');
    }
};


