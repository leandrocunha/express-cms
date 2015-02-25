var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	PostSchema;


PostSchema = new Schema({  
    title: { type: String, required: true },
    post: { type: String, required: false },
    type: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);