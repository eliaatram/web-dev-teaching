import React, { useState } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTodoList([...todoList, task]);
      setTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <div>
        <input type="text" value={task} onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleRemoveTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
