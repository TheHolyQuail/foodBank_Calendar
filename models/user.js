//let ADMIN = new User('admin', 'admin', 'phone number 1', 'email@email.email', true); //the default admin
//source for databasing: https://github.com/malbinson/node_mongoose_example_19

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
	name: String, //the users name
	password: String, //the users account password
	phone: String, //the users phone number
	email: String, //the users email
	avaiability: Array, //an array of the dates the user is available for (dates are in the "yyyy/mm/dd" format as a string)
	scheduled: Array, //an array of the dates the user is scheduled for (dates are in the "yyyy/mm/dd" format as a string)
	admin: Boolean, //a boolean
});
//attach schema to model
var User = mongoose.model('User', userSchema);
//make this available to our users in our Node applications
module.exports = {model: User, schema: userSchema}