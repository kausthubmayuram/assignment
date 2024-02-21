const express = require("express");
const router = express.Router();
const Tasks = require("../models/Tasks");
const { query, body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
	try {
		let taskList = await Tasks.aggregate([
			{ $project: { _id: 0, id: "$_id", title: 1, description: 1, status: 1 }, },
		]);

		if (taskList && taskList.length > 0) {
			res.json(taskList);
		} else {
			res.status(204).send();
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post(
	"/add",
	body("title").notEmpty(),
	body("status").notEmpty(),
	async (req, res) => {
		try {
			let { title, description, status } = req.body;

			const result = validationResult(req);
			if (!result.isEmpty()) {
				res.status(400).send({ errors: result.array() });
			}
            
			let TasksList = new Tasks({
				title,
				description,
				status,
			});

			await TasksList.save();
			res.status(200).send({ Message: "Task Added Sucessfully" });
		} catch (err) {
			if (err.code == 11000)
				res.status(409).send({ Message: "Task Already Exists" });
			else res.status(500).send(err);
		}
	}
);

router.post("/update", async (req, res) => {
	let { id } = req.body;
	Tasks.findOneAndUpdate({ _id: id },req.body, { new: true })
		.then((docs) => {
			if (docs) {
				res.status(200).send({ Message: "Task Updated Sucessfully" });
			} else {
				res.status(400).send({ Message: "Error Updated Task" });
			}
		})
		.catch((err) => {
			res.status(500).send("server error");
		});
});

router.post("/delete", async (req, res) => {
	let { id } = req.body;
	Tasks.findOneAndDelete({ _id: id })
		.then((docs) => {
			if (docs) {
				res.status(200).send({ Message: "Task Deleted Sucessfully" });
			} else {
				res.status(400).send({ Message: "Error Deleting Task" });
			}
		})
		.catch((err) => {
			res.status(500).send("server error");
		});
});

module.exports = router;
