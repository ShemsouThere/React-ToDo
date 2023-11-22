import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [space_id, setspace_id] = useState('');
  const [todo_id, setTodoId] = useState('');
  const [task, setTask] = useState('');
  const [Priority, setPriority] = useState('');
  const [due_date, setDueDate] = useState('');
  const [status, setStatus] = useState('');



  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array, so it fetches todos only once on component mount
  
  const fetchTodos = () => {
    axios.get('http://localhost/todo/fetchtodo.php?space_id=1')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost/todo/createtodo.php';
    const formData = new FormData();
    formData.append('space_id', space_id);
    formData.append('todo_id', todo_id);
    formData.append('task', task);
    formData.append('due_date', due_date);
    formData.append('status', status);

    axios.post(url, formData)
      .then((response) => {
        alert(response.data);
        setNewTodo('');
        fetchTodos();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    axios.delete(`http://localhost/todo/deletetodo.php?todo_id=${todoId}`)
      .then((response) => {
        console.log(response.data);
        fetchTodos(); // Refresh todos after deletion
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo_id}
          placeholder="Todo ID"
          onChange={(e) => setTodoId(e.target.value)}
        />
        <input
          type="text"
          value={space_id}
          placeholder="Space ID"
          onChange={(e) => setspace_id(e.target.value)}
        />
        <input
          type="text"
          value={task}
          placeholder="Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={due_date}
          placeholder="Due Date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add</button>
      </form>
      {/* Rest of your code */}



      <ul className="todo-list">
  {todos.map((todo) => (
    <li key={todo.todo_id} className="todo-item">
      <div className="todo-info">
        <strong>Task:</strong> {todo.task} | <strong>Priority:</strong> {todo.Priority} |
        <strong>Due Date:</strong> {todo.due_date} | <strong>Status:</strong> {todo.status}
      </div>
      <div className="todo-actions">
        <button onClick={() => handleDeleteTodo(todo.todo_id)}>Delete</button>
        <label>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => handleToggleTodo(todo.todo_id, e.target.checked)}
          />
          Completed
        </label>
      </div>
    </li>
  ))}
</ul>


    </div>
  );
};

export default TodoList;
