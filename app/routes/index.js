'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var Post=require("../models/post");
module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			//res.sendFile(path + '/public/index.html');
			Post.find({},function(err,post){
				if(err)
				{
					console.log(err);
					res.send();
				}
				res.render('index',{login:req.isAuthenticated(),posts:post});
			});
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			//console.log(req.user);
			res.sendFile(path + '/public/profile.html');
		});
	app.route('/upload')
		.get(isLoggedIn,function(req,res){
			res.render('upload',{login:req.isAuthenticated()});
		})
		.post(isLoggedIn,function(req,res){
			console.log(req.user);
			var post=new Post({
				link:req.body.link,
				name:req.body.title,
				users:req.user._id
			});
			post.save(function(err){
				if(err)
				{
					console.log(err);
				}
				console.log("success");
				res.redirect('/');
			});
		});

	app.route('/myPost')
		.get(isLoggedIn,function(req,res){
			Post.find({users:req.user._id},function(err,post){
				if(err)
				{
					console.log(err);
					return;
				}
				console.log(post);
				res.render('mypost',{login:req.isAuthenticated(),posts:post});
			});
		});
	app.route("/updatePost")
		.post(isLoggedIn,function(req,res){
			Post.update({_id:req.body.id},{$inc:{likes:1}},function(err,post){
					if(err)
					{
						console.log(err);
						return ;
					}
					res.json({success : "Updated Successfully", status : 200});
				});
			});
	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter',{
			successRedirect:'/',
			failureRedirect:'/login'
		}));
	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
