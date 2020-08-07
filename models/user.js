/** @format */

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        role: { type: String, default: 'member' },
        trangthai: {type: Boolean, default: true},
        phone: { type: String, default: '' },
        khoahoc: [
        ],
        avatar: { type: String, default: 'default.jpg' },
    },
    { timestamps: true },
);
var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
