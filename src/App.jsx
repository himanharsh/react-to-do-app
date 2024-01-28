import React from 'react';
import { FaCheck, FaTrash, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

let nextId = 0;

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  return (
    <main>
      <input
        type="text"
        placeholder="Enter your task here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={() => {
          setTaskList([...taskList, { id: nextId++, task: task, done: false }]);
        }}
      >
        <FaPlus />
      </button>
      <ul>
        {taskList.map((t) => (
          <li key={t.id}>
            {t.task}
            <button>
              <FaCheck />
            </button>
            <button>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
