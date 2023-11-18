// TaskList.tsx
import React, { useState, useEffect } from 'react';
import Task from './Task';
import 'tailwindcss/tailwind.css';

const TaskList: React.FC = () => {
  const initialTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskName, setNewTaskName] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskName.trim() === '') return;

    const newTask: Task = {
      id: tasks.length + 1,
      name: newTaskName,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const toggleCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4 text-purple-600">✨ My Task List ✨</h1>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between mb-2 p-2 bg-purple-100 rounded-md"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
                className="mr-2 form-checkbox h-6 w-6 text-purple-600"
              />
              <span
                className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-purple-800'}`}
              >
                {task.name}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Add Task</h2>
        <div className="flex">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter your task..."
            className="mr-2 p-2 border border-purple-300 rounded-md flex-grow focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
