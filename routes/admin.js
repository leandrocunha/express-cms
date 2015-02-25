var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = require('../models/User.js'),
	Post = require('../models/Post.js');


/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/logout', function(req, res, next) {
	res.redirect('/');
})

router.get('/pages', function(req, res, next) {

	Post.find({ type: 'page' }, function (err, posts) {
		if(err){
			res.send(err);
		}else{
			res.render('pages', {pages: posts });
		}
	});

});

router.post('/pages', function(req, res, next){

	var data = req.body,
		post;

	if( data.name !== '' && data.body !== '' ){

		post = new Post({
			title: data.name,
			body: data.body,
			type: 'page'
		});

		console.log( post );

		post.save(function (err) {
			if (!err) {
				return console.log("created");
			} else {
				return console.log(err);
			}			
		});

		res.redirect('pages');

	}else{
		res.send('Fields are required!')
	}

});

router.get('/posts', function(req, res, next) {

	Post.find(function (err, posts) {
		if(err){
			res.send(err);
		}else{
			res.render('posts', {posts: posts });
		}
	});
	
});

router.post('/post', function(req, res, next){

	var data = req.body,
		post;

	if( data.title !== '' && data.post !== '' ){

		post = new Post({
			title: data.title,
			post: data.post,
			type: 'post'
		});

		post.save(function (err) {
			if (!err) {
				return console.log("created");
			} else {
				return console.log(err);
			}			
		});

		res.redirect('posts');

	}else{
		res.send('Fields are required!')
	}

});

router.get('/users', function(req, res, next) {

	User.find(function (err, users) {
		if(err){
			res.send(err);
		}else{
			res.render('users', {users: users });
		}
	});	
});

router.post('/user', function(req, res, next) {

	var data = req.body,
		user;

	if( data.email !== '' && data.name !== '' ){

		user = new User({
			name: data.name,
			email: data.email,
		});

		user.save(function (err) {
			if (!err) {
				return console.log("created");
			} else {
				return console.log(err);
			}
		});

		res.redirect('users');

	}else{
		res.send('Fields are required!');
	}

});

router.delete('/user/:id', function (req, res) {

	User.findById(req.params.id, function (err, user) {
		if(err){
			return console.log(err);
		}else{
			user.remove(function (err) {
				if(err){
					return console.log(err);
				} else {
					console.log("removed");
					res.redirect('users'); 
				}
			});
		}
	});

});

module.exports = router;
