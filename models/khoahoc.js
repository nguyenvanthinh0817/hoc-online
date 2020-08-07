/** @format */

var mongoose = require('mongoose');

var khoahocSchema = new mongoose.Schema(
    {
        name: String,
        mota: String,
        gia: Number,
        giagiam: {type: Number, default: 0},
        sohocvien: {type: Number, default: 0},
        trangthai: {type: Boolean, default: false},
        tongsobaihoc: {type: Number, default: 0},
        avatar: { type: String, default: null },

    },
    { timestamps: true },
);
var Khoahoc = mongoose.model('Khoahoc', khoahocSchema, 'khoahocs');
module.exports = Khoahoc;
