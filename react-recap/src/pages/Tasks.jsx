import React from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = React.useState([]);

  const fetchData = () => {
    axios("https://your-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        const fetchedTodos = response.data
          ? Object.entries(response.data).map(([id, todo]) => ({
              id,
              ...todo,
            }))
          : [];
        setTasks(fetchedTodos);
      }) //
      .catch((error) => console.log("Error fetching tasks:", error));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task?.id}>{task?.name}</li> // ? : ensure the name field should be present
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
