const todos = []


const getTodos = (req, res) => {
    res.status(200).json(todos)
}


const addTodo = (req, res) => {
    const { todo } = req.body

    todos.push(todo)

    res.status(200).json(todo)
}


const getTodosIndex = (req, res) => {

    const { index } = req.params
    const { todo } = req.query

    if (todos.length < index) res.status(400).json({ error: "cannot edit empty position" })

    else {
        todos[index] = todo

        res.status(200).json({ message: "element edit at specified position", todo: todos })
    }
}

const deleteTodo = (req, res) => {
    const { index } = req.params

    if (todos.length === 0) {
        res.status(400).json({ error: "cannot remove from empty list" })
    }
    else if (index.length < index) {
        res.status(400).json({ error: "index is too big" })
    }
    else {
        todos.splice(index, 1);

        res.status(200).json({ message: "element removed", todo: todos })
    }

}

module.exports = {
    getTodos,
    addTodo,
    getTodosIndex,
    deleteTodo
}