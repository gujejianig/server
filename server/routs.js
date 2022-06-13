const func  = require('./logic')
func.app.post("/api/todos/add", func.addTodo);
func.app.get("/api/todos", func.getTodos);
func.app.get("/api/todos/:id", func.getTodo);
func.app.delete("/api/todos/:id", func.deleteTodo);
func.app.patch("/api/todos/:id", func.updateTodo);
func.app.listen(func.port, () => {
	console.log(`app listening at http://localhost:${func.port}`);
})