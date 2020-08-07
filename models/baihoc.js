/** @format */

var mongoose = require('mongoose');

var baihocSchema = new mongoose.Schema(
    {
        idKh: String,
        name: String,
        link: String,
        trangthai:  {type: Boolean, default: true},
        hocthu:  {type: Boolean, default: false},
        stt: Number,
        thoigian: Number,
    },
    { timestamps: true },
);
var Baihoc = mongoose.model('baihoc', baihocSchema, 'baihocs');
module.exports = Baihoc;
