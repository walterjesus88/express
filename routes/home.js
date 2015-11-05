var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/welcome', { siteName: 'Express para milto' });
});

module.exports = router;
