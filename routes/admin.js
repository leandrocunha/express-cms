var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/logout', function(req, res, next) {
	res.redirect('/');
})

router.get('/pages', function(req, res, next) {
	res.render('pages');
});

module.exports = router;
