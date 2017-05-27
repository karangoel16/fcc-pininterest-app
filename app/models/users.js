'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	service:String,
	twitter:{
		id:String,
		displayName:String,
		username:String
	},
	github: {
		id: String,
		displayName: String,
		username: String,
      		publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);
