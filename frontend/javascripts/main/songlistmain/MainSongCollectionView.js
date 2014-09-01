define(['marionette', './MainSongView', '../../app/context','clipboard'], 
	function(Marionette, MainSongView, context, ZeroClipboard){
	var MainSongCollectionView = Marionette.CompositeView.extend({
		id: 'main-songlist-composite',
		template: '#main-header-playlist-template',
		events: {
			'click #playlist-avatar-header':'playSongs'
		},
		childView: MainSongView,
		playSongs: function(){
			Backbone.trigger('main-view:play-songs', this.model.attributes._id, this.collection);
		},
		onShow: function(){
	    	ZeroClipboard.config( { moviePath: '../../../bower_components/zeroclipboard/dist/ZeroClipboard.swf',
	                                trustedDomains: location.host } );
	        this.client = new ZeroClipboard( this.$(".main-share-song"));
    	}
	});
	return MainSongCollectionView;
});

