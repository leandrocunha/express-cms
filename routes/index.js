var express = require('express'),
	router = express.Router(),
	Post = require('../models/Post.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	Post.find({ type: 'page' }, function (err, pages) {
		if(err){
			res.send(err);
		}else{

			Post.find({ type: 'post' }, function (err, posts) {
				if(err){
					res.send(err);
				}else{
					res.render('index', {title: 'Express CMS', pages: pages, posts: posts});
				}
			});

		}
	});

});


// GET Post
router.get('/post/:id', function(req, res, next) {

	var id = req.params.id;

	Post.findOne({ _id: id }, function (err, post) {

		if(err){
			res.send(err);
		}else{

			Post.find({ type: 'page' }, function (err, posts) {
				if(err){
					res.send(err);
				}else{
					res.render('post', {title: 'Express CMS', pages: posts, page: post});
				}
			});			
		}

	});

});

module.exports = router;
