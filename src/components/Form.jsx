import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import Update from "./Update";

const Form = () => {
  const [task, setTask] = useState("");
  const [index, setIndex] = useState()
  const [currentTask, setCurrentTask] = useState("")
  const [taskList, setTaskList] = useState([]);
  const [updateTask, setUpdateTask] = useState(false);
  const userId = useGetUserId();

  const deleteTask = (index) => {
    axios
      .put(`https://todo-app-backend-fi9d.onrender.com/task/delete`, {userId, index})
      .then(() => getTasks())
      .catch(() => console.log("Failed"));
  };

  const addTask = (task) => {
     axios
      .put(`https://todo-app-backend-fi9d.onrender.com/task/`, { userId, task })
      .then(() => {
        getTasks()
      })
      .catch(() => {
        console.log("error");
      });

    
    getTasks();
  };

  const getTasks = async () => {
    try {
      const tasks = await axios.get(`https://todo-app-backend-fi9d.onrender.com/task/${userId}`);
      setTaskList(tasks.data);
      
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTasks();
  });
  return (
    <div className="w-full  flex justify-center p-4 ">
      <div className="sm:w-1/2 w-full flex flex-col ">
        <form className="flex justify-center gap-9 py-2 ">
          <input
            className=" rounded-sm px-1 py-1  mt-2 focus:outline-gray-400 w-1/2"
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(event) => {
              setTask(event.target.value);
            }}
          />
          <button
            className="bg-purple-600 text-white sm:px-2 px-1 py-1 rounded-md font-bold"
            onClick={(event) => {
              event.preventDefault();
              addTask(task, event);
              setTask("");
            }}
          >
            Add Task
          </button>
        </form>
        <div className="flex justify-center pt-9">
          <ul className="flex flex-col gap-2">
            {taskList.map((task) => (
              <li key={taskList.indexOf(task)} className="border-2 flex px-3 py-1 gap-3">
                <p className="font-semibold w-52 sm:w-96 ">{task}</p>
                <svg
                  onClick={() => {
                    setUpdateTask(!updateTask);
                    setCurrentTask(task)
                    setIndex(taskList.indexOf(task))


                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <svg
                  onClick={() => {
                    deleteTask(taskList.indexOf(task));
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                
              </li>
              
            ))}
          </ul>
          
        </div>
      </div>
      {updateTask?<Update updateTask={updateTask} setUpdateTask={setUpdateTask} currentTask={currentTask} index={index} getTasks={getTasks}/>:<></>}
    </div>
  );
};

export default Form;
