var log = require('winston-wrapper')(module);
var passport = require('passport');

module.exports = function (app) {

	app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){
		console.log(req);
		console.log('/auth/facebook');
		res.end('asd');
	});

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/signin' }));

	app.get('/auth/vkontakte',
		passport.authenticate('vkontakte', {scope: ['friends', 'audio', 'status', 'email']}),
		function(req, res){
			// The request will be redirected to vk.com for authentication, so
			// this function will not be called.
		});

	app.get('/auth/vkontakte/callback',
		passport.authenticate('vkontakte', { failureRedirect: '/signin' }),
		function(req, res) {
			res.redirect('/');
		});

	app.get('/auth/odnoklassniki',
		passport.authenticate('odnoklassniki'),
		function(req, res){
			// The request will be redirected to Odnoklassniki for authentication, so
			// this function will not be called.
		});

	app.get('/auth/odnoklassniki/callback',
		passport.authenticate('odnoklassniki'),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/');
		}
	);

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/signin' }));

};