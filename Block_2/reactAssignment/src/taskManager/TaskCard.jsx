// import React, { useState } from "react";

const TaskCard = ({
  task,
  handleDelete,
  handleEdit,
  setOpenModal,
  setEditTask,
}) => {
  // const [editTask, setEditTask] = useState({});

  // const handleEdit = (id) => {
  //   let index = task.findIndex((el) => el.id === id);

  //   if (index == -1) {
  //     return alert("Task Not found");
  //   }

  //   if (editTask?.title == "") return alert("Title should not be empty");

  //   let updatedList = [...task].sort((a, b) => b.priority - a.priority);
  //   updatedList[index] = editTask;
  //   // setTask(updatedList);
  //   localStorage.setItem("tasks", JSON.stringify(updatedList));
  // };

  return (
    <div
      style={{
        color:
          task.priority == 2 ? "red" : task.priority == 1 ? "yellow" : "green",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      <input
        type="checkbox"
        value={task.status}
        checked={task.status === "Done"}
        onChange={(e) =>
          handleEdit({ ...task, status: e.target.checked ? "Done" : "pending" })
        }
      />
      <h1
        style={{
          textDecoration: task.status == "Done" ? "line-through" : "none",
        }}
      >
        {task.title}
      </h1>
      <p>
        {task.priority == 2 ? "High" : task.priority == 1 ? "Medium" : "Low"}
      </p>

      <div>
        <button
          onClick={() => {
            setOpenModal(true);
            setEditTask(task);
          }}
        >
          Edit
        </button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
