import React, { useState } from "react";
import TaskCard from "./TaskCard";

const TaskManager = () => {
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "",
    status: "pending",
    id: new Date().getMilliseconds(),
  });

  const [editTask, setEditTask] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    console.log(newTask);
    if (newTask.title === "" || newTask.priority === "") {
      alert("Please enter title and priority");
      return;
    }

    let updatedList = [...task, newTask].sort(
      (a, b) => b.priority - a.priority
    );

    setTask(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));

    setNewTask({
      title: "",
      priority: "",
      status: "pending",
      id: new Date().toUTCString(),
    });
  };

  const handleEdit = (updatedTask) => {
    let index = task.findIndex((el) => el.id === updatedTask.id);

    if (index == -1) {
      return alert("Task Not found");
    }

    if (updatedTask?.title == "") return alert("Title should not be empty");

    let updatedList = [...task];
    updatedList[index] = updatedTask;
    updatedList.sort((a, b) => b.priority - a.priority);

    console.log(updatedList, index);
    setTask(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    let updatedList = task
      .filter((el) => el.id !== id)
      .sort((a, b) => b.priority - a.priority);
    setTask(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  };

  return (
    <div>
      <input
        required
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleChange}
      />
      <select name="priority" onChange={handleChange}>
        <option value="High" disabled>
          Priority
        </option>
        <option value={2}>High</option>
        <option value={1}>Medium</option>
        <option value={0}>Low</option>
      </select>
      <button onClick={handleAdd}>Add</button>

      {task.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setEditTask={setEditTask}
          setOpenModal={setOpenModal}
        />
      ))}

      <div
        style={{
          display: openModal ? "block" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          // translate: transform(-50, -50),
        }}
      >
        <input
          type="text"
          value={editTask?.title || ""}
          onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
        />
        <select
          name="priority"
          value={editTask?.priority || ""}
          onChange={(e) =>
            setEditTask({ ...editTask, priority: e.target.value })
          }
        >
          <option value="High" disabled>
            Priority
          </option>
          <option value={2}>High</option>
          <option value={1}>Medium</option>
          <option value={0}>Low</option>
        </select>
        <button onClick={() => handleEdit(editTask)}>Update</button>
      </div>
    </div>
  );
};

export default TaskManager;
