define(['marionette'], function(Marionette){

	StatisticView = Marionette.ItemView.extend({

		template: 	'#statistic-template',
		
		ui: {
			listened	: "#listened",
			playlists	: "#playlists",
			followers	: "#followers",
			followings	: '#followings',
			liked		: "#liked"
		},

		events: {
			'click .statistic-info' : 'showListened',
			'click @ui.listened' 	: 'getListened',
			'click @ui.playlists'	: 'getPlaylists',
			'click @ui.followers'	: 'getFollowers',
			'click @ui.followings'	: 'getFollowings',
			'click @ui.liked' 		: 'getLiked'
		},
		
		showListened: function(){
			Backbone.trigger('sidebar:show-listened');
		}, 
		getListened : function(){  
			Backbone.trigger('show-statistic-listened');
		},
		getPlaylists: function(){
			Backbone.trigger('show-statistic-playlists');
		},
		getFollowers : function(){  
			Backbone.trigger('show-statistic-followers');
		},
		getFollowings : function(){  
			Backbone.trigger('show-statistic-followings');
		},			
		getLiked : function(){  
			Backbone.trigger('show-statistic-liked');
		}
	});
	return StatisticView;
});