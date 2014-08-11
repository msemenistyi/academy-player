define(['../player/PlayerModel'], function(PlayerModel){
	var audioHandler = {
		initialize: function(url, volumeLevel){
			this.track = new Audio(url);
			this.track.volume = volumeLevel/100;
		},
		playTrack: function(){
			this.track.play(); 
		},

		pauseTrack: function(){
			this.track.pause();
		},

		nextTrack : function(position){
			return ++position;
		},

		previousTrack : function(position){
			return --position;
		},

		volumeLevelSetup : function(input){
			this.track.volume = input/100;
		},

		playbackPosition : function(input){
			this.track.currentTime = input;
		},

		stopTrack: function(){
			this.track.pause();
			this.track = null;
		}

	};

	return audioHandler;
});