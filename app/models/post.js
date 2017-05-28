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
	users:{
		id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		name:String,
	},
	likes:{
		type:Number,
		default:0
	}
});

module.exports=mongoose.model('Post',post);