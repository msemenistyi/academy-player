define(['backbone', '../../shared/user/UserModel'], function(Backbone, UserModel){
	var FriendsCollection = Backbone.Collection.extend({
		model: UserModel
	});
	return FriendsCollection;
});