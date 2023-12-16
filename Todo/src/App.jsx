import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useSelector } from 'react-redux';
import { IoCheckmarkDone } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]); // State for completed todos
  // eslint-disable-next-line no-unused-vars
  const [newTodo, setNewTodo] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [space_id, setSpace_id] = useState('');
  const [todo_id, setTodoId] = useState('');
  const [task, setTask] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [Priority, setPriority] = useState('');
  const [due_date, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const spaceId = useSelector((state) => state.spaceId);


  useEffect(() => {
    fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceId]); // Run fetchTodos whenever spaceId changes
  
  const fetchTodos = () => {
    axios.get(`http://localhost/todo/fetchtodo.php?space_id=${spaceId}`)
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
    formData.append('space_id', spaceId);
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

  const handleToggleTodo = (todoId, isChecked) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === todoId ? { ...todo, completed: isChecked } : todo
    );
    setTodos(updatedTodos);

    if (isChecked) {
      const completedTodo = todos.find((todo) => todo.todo_id === todoId);
      setDoneTodos([...doneTodos, completedTodo]);
    } else {
      const remainingTodos = doneTodos.filter((todo) => todo.todo_id !== todoId);
      setDoneTodos(remainingTodos);
    }
  };
  

  return (
    <div className='taskapp'>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input className='tasktext'
          type="text"
          value={task}
          placeholder="Enter Your Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date" className='taskdate'
          value={due_date}
          placeholder="Due Date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select className='taskprio' value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="" selected disabled>Task Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className='addtask' type="submit">Add</button>
      </form>

     <div className='todo-container'>
      <ul className="todo-list">
  {todos.map((todo) => (
    <li key={todo.todo_id} className="todo-item">
      <div className="task-info">
          <p className="class2">Task:</p> <span className="class2">{todo.task}</span>
          <p className="class1">Due Date:</p> <span className="class2">{todo.due_date}</span> |
          <p className="class1">Status:</p> <span className="class2">{todo.status}</span>
      </div>
      <div className="todo-actions">
        <button className="delete-button" onClick={() => handleDeleteTodo(todo.todo_id)}>
          <RxCross2/>
        </button>
        <label>
          <button
            className={`checkbox-button ${todo.completed ? 'completed' : ''}`}
            onClick={() => handleToggleTodo(todo.todo_id, !todo.completed)}
          >
            <IoCheckmarkDone size={20} color='white'/>
          </button>
        </label>
      </div>
    </li>
  ))}
</ul>
</div>

<h1>Done Todo List</h1>
      <ul className="done-todo-list">
        {doneTodos.map((doneTodo) => (
          <li key={doneTodo.todo_id} className="done-todo-item">
            <div className="todo-info">
              <strong className='class1'>Task:</strong> <span className='class2'>{doneTodo.task}</span> |
              <strong className='class1'>Due Date:</strong> <span className='class2'>{doneTodo.due_date}</span> | <strong className='class1'>Status:</strong> <span className='class2'>{doneTodo.status}</span>
            </div>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default TodoList;
