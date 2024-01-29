import React from 'react';
import { FaCheck, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

let nextId = 0;

const TaskCount = ({ taskArr }) => {
  let count = 0;
  taskArr.forEach((x) => {
    if (x.done === false) count++;
  });
  if (count === 1) {
    return <div className="taskCounter">1 TASK LEFT</div>;
  } else return <div className="taskCounter">{count} TASKS LEFT</div>;
};

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  function add() {
    if (task === '') {
      alert('Please Enter a Task Before Adding It!');
      return;
    }
    setTaskList([...taskList, { id: nextId++, task: task, done: false }]);
    setTask('');
  }
  function trash(t) {
    setTaskList(taskList.filter((tl) => tl.id !== t.id));
  }
  function checkToggle(t) {
    const checkList = [...taskList];
    checkList.forEach((x) => {
      if (x.id === t.id) {
        if (!x.done) {
          x.done = true;
        } else {
          x.done = false;
        }
      }
    });
    setTaskList(checkList);
  }

  return (
    <>
      <main>
        <input
          type="text"
          placeholder="Enter your task here..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') add();
          }}
        />
        <button onClick={add}>
          <FaPlus />
        </button>
        <ul>
          {taskList.map((t) => (
            <li key={t.id}>
              <span
                className="taskName"
                style={
                  t.done
                    ? { textDecoration: 'line-through' }
                    : { textDecoration: 'none' }
                }
              >
                {t.task}
              </span>
              <button className="checkIcon" onClick={() => checkToggle(t)}>
                <FaCheck />
              </button>
              <button className="trashIcon" onClick={() => trash(t)}>
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </main>
      <TaskCount taskArr={taskList} />
    </>
  );
};

export default App;
