var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;
var trackRepository = require('../repositories/trackRepository.js');
var async = require('async');

function chartParse(){

}

chartParse.prototype.billboardTop = function (callback) {
	var baseURL = 'http://www.billboard.com/rss/charts/hot-100';
	request(baseURL , function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parseString(body, function (err, result) {

				var results = [];
				for (var i = 0; i < result.rss.channel[0].item.length; i++){
					results[i] = {};
					results[i].rankTw  = i+1;
					results[i].singer = result.rss.channel[0].item[i].artist[0];
					results[i].title = result.rss.channel[0].item[i].chart_item_title[0];
					results[i].rankLw = result.rss.channel[0].item[i].rank_last_week[0];
				}
				console.log('billboard results=', result.rss.channel[0].item);
				async.map(results, trackRepository.getExistSong.bind(trackRepository), function(err, data){
						console.log('billboard data=', data);
						if (!err){
							for (var i = 0; i < data.length; i++){
								if(data[i].length === 0){
									data[i] = results[i];
								} else {
									data[i] = data[i][0];
								}						
							}
						}
					console.log('result=', data);
					callback(err, data);
				});


			});
		}
	});
};

chartParse.prototype.benMajorUkTop = function (callback) {
	var baseURL = 'http://ben-major.co.uk/labs/top40/api/singles/';
	request(baseURL , function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var result = JSON.parse(body);
			var results = [];
			for (var i = 0; i < result.entries.length; i++){
				results[i] = {};
				results[i].rankTw = i+1;
				results[i].singer = result.entries[i].artist;
				results[i].title = result.entries[i].title;
				results[i].rankLw = result.entries[i].previousPosition;
			}
			results.updated = result.date;

	/*		trackRepository.getExistSong(results, function(err, data){
				console.log('err=', err);
				console.log('data=', data);

			});	*/		
			async.map(results, trackRepository.getExistSong.bind(trackRepository), function(err, data){
					if (!err){
						for (var i = 0; i < data.length; i++){
							if(data[i].length === 0){
								data[i] = results[i];
							} else {
								data[i] = data[i][0];
							}						
						}
					}
				console.log(data);
				callback(err, data);
			});
		}
	});
};

chartParse.prototype.iTunesTop = function (callback) {
	var baseURL = 'https://itunes.apple.com/ua/rss/topsongs/limit=25/explicit=true/xml';
	request(baseURL , function (error, response, body) {
		parseString(body, function (err, result) {
			var results = [];
			for (var i = 0; i < result.feed.entry.length; i++){
				results[i] = {};
				results[i].rankTw = i+1;
				results[i].singer = result.feed.entry[i]['im:artist'][0]._;
				results[i].title = result.feed.entry[i]['im:name'][0];
			}
			results.updated = result.feed.entry.updated;

			async.map(results, trackRepository.getExistSong.bind(trackRepository), function(err, data){
					if (!err){
						for (var i = 0; i < data.length; i++){
							if(data[i].length === 0){
								data[i] = results[i];
							} else {
								data[i] = data[i][0];
							}						
						}
					}
				console.log(data);
				callback(err, data);
			});

		});
	});
};

module.exports = new chartParse();



