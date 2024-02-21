const mongoose = require("mongoose");


const TasksSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	status: {
		type: String,
		required: true,
	},
});

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;
