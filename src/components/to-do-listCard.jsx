import './to-do-listCard.css';
import check from './images.png';
import { useEffect, useState } from 'react';
import garb from './gar.jpg';

function ToDoList() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // function to take Task and put it inside setInput
  const fetchTask = e => {
    setInput(e.target.value);
  };

  // function when user press enter button
  const keyDown = e => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // function that add the task from the input plus handle empty input with an error message
  const addTask = () => {
    if (!input) {
      const error = document.getElementById('error');
      error.style.display = 'block';
      setTimeout(() => {
        error.style.display = 'none';
      }, 2000);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input.trim() }]);
      setInput("")
    }
  };

  // function which remove the checked task
  const removeTask = deleteid => {
    setTasks(tasks.filter(task => task.id !== deleteid));
  };

  // function handle the checked box with an id so the deletion can be tracked correctly
  const handleCheck = id => {
    const checkbox = document.getElementById(`checkbox-${id}`);
    const text = document.getElementById(`content-${id}`);
    if (checkbox.checked) {
      text.style.textDecorationLine = 'line-through';
    } else {
      text.style.textDecorationLine = 'none';
    }
  };

  return (
    <div className="main">
      <div className="main_CardContainer">
        <div className="headcont">
          <img src={check} alt="" className="check"></img>
          <h2>To-Do List</h2>
        </div>
        <div className="inputcont">
          <div className="errorcont">
            <input
              placeholder="Add your task"
              className="inputuser"
              value={input}
              onChange={fetchTask}
              onKeyDown={keyDown}
            ></input>
            <p id="error">Please Enter A Task</p>
          </div>
          <button className="add" onClick={addTask}>
            ADD
          </button>
        </div>
        {tasks.map(task => (
          <div key={task.id}>
            <div class="listcont">
              <input
                type="checkbox"
                onChange={() => handleCheck(task.id)}
                id={`checkbox-${task.id}`}
              ></input>
              <p id={`content-${task.id}`}>{task.text}</p>
              <img
                src={garb}
                alt=""
                className="garb"
                onClick={() => removeTask(task.id)}
              ></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
