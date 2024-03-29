import React from 'react';
import { FaCheck, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { TbReload } from 'react-icons/tb';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskCount = ({ taskArr }) => {
  let count = 0;
  if (!!taskArr) {
    taskArr.forEach((x) => {
      if (x.done === false) count++;
    });
  }

  if (count === 1) {
    return <div className="taskCounter">1 TASK LEFT</div>;
  } else return <div className="taskCounter">{count} TASKS LEFT</div>;
};

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem('localTasks')) || []
  ); // or [] so that when nothing is store inside localStorage, it doesn't get set to null which will throw error during iteration

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    // console.log('change');
    localStorage.setItem('localTasks', JSON.stringify(taskList));
  }, [taskList]);

  function add() {
    if (task === '') {
      alert('Please Enter a Task Before Adding It!');
      return;
    }
    if (taskList === null) {
      setTaskList([{ id: uuidv4(), task: task, done: false }]);
    } else {
      setTaskList([...taskList, { id: uuidv4(), task: task, done: false }]);
    }
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
    <div className="content">
      <main>
        <div className="taskAdd">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your task here..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') add();
            }}
          />
          <button className="add" onClick={add}>
            <FaPlus />
          </button>
        </div>
        <ul>
          {!!taskList &&
            taskList.map((t) => (
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
                  {t.done ? <TbReload /> : <FaCheck />}
                </button>
                <button className="trashIcon" onClick={() => trash(t)}>
                  <FaTrashAlt />
                </button>
              </li>
            ))}
        </ul>
      </main>
      <TaskCount taskArr={taskList} />
    </div>
  );
};

export default App;
