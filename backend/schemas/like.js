var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var likeSchema = new Schema({
	likeSong : { 
		type: Schema.Types.ObjectId, 
		ref: 'Track' 
	},
	userId : [{ 
		type: Schema.Types.ObjectId, 
		ref: 'user_info' 
	}],
});

module.exports =  mongoose.model('Like', likeSchema);
