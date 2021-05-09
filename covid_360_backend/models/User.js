require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
	googleId: {
		type: String,
		require: true,
	},
	userName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	dob: {
		type: Date,
	},
	isDoc: {
		type: Boolean,
		default: false
	},
	dateJoined: {
		type: Date,
		default: Date.now()
	},
	authTokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;


