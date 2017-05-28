'use strict';

var mongoose = require("mongoose");
var user= require('./users');
var Schema = mongoose.Schema;

var post=new Schema({
	link:{
		type:String,
		required:true,
	},
	name:{
		type:String,
		required:true,
	},
	users:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports=mongoose.model('Post',post);