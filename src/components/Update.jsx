import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

const Update = ({ updateTask, setUpdateTask, currentTask, index,getTasks }) => {
  const [task, setTask] = useState(currentTask);
  const userId = useGetUserId()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <form className="sm:flex-row justify-center gap-9 py-2 flex flex-col">
        <input
          className=" rounded-md px-1 py-1  mt-2 focus:outline-gray-400 sm:w-80 w-72"
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
            axios.put("http://localhost:4000/task/update", {userId,index,updatedTask:task}).then(()=>{getTasks()})
            
            setUpdateTask(!updateTask);
          }}
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Update;
