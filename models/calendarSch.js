//source for databasing: https://github.com/malbinson/node_mongoose_example_19

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var calendarSchema = new Schema({
	name: String, //the calendars name
	time: String, //the date and time
	statusColor: String, //the status color
	available: Array, //an array of the dates the user is available for (dates are in the "yyyy/mm/dd" format as a string)
	scheduled: Array, //an array of the dates the user is scheduled for (dates are in the "yyyy/mm/dd" format as a string)
});
//attach schema to model
var Calen = mongoose.model('calendar', calendarSchema);
// make this available to our users in our Node applications
module.exports = {model: Calen, schema: calendarSchema};
//module.exports = Calen;