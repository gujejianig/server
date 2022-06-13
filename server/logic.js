const express = require("express");
const app = express();
const port = 2000;
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
	.connect("mongodb+srv://gio:gio@cluster0.dhdqp.mongodb.net/todosDatabase?retryWrites=true&w=majority")
	.then(() => console.log("connected"))
	.catch((e) => console.log("doesn't connected", e));

app.use(express.json());
app.use(cors());

const Todo = mongoose.model("Todo", {
	task: String, done: false
});

const addTodo = (req, res) => {
	new Todo(req.body).save(function (err, todo) {
		res.status(201).json({
			status: "success", todos: todo,
		});
		if (err) {
			throw new Error(`error: ${err}`)
		}
	});
};

const getTodos = (req, res) => {
	Todo.find({}, function (err, todo) {
		res.send(todo);
		if (err) {
			throw new Error(`INVALID ID`)
		}
	});
};

const getTodo = (req, res) => {
	Todo.find({id: req.params.id}, function (err, todo) {
		if (err) {
			throw new Error(`INVALID ID`)
		} else {
			res.send(todo);
		}
	});
};
const deleteTodo = async (req, res) => {
	Todo.findOneAndDelete({_id: req.params.id}, function (err, docs) {
		res.send(docs);
		if (err) {
			throw new Error(`error: ${err}`)
		}
	});
};

const updateTodo = (req, res) => {
	Todo.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: false}, (err, data) => {
		if (data == null) {
			res.send("nothing found");
		} else {
			res.send(data);
		}
	});
};
module.exports  = {addTodo, getTodos, getTodo, deleteTodo,  updateTodo, app, port}