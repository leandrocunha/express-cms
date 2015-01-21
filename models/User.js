var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	UserSchema;


UserSchema = new Schema({  
    name: { type: String, required: true },
    email: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);