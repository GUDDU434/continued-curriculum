import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loader/Loading";
import {
  AddTask,
  DeleteTask,
  GetAllTasks,
  UpdateTask,
} from "../../Redux/task/task.action";

const Dashboard = () => {
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [taskModal, settaskModal] = useState(false);

  const { AllTasks, isTasksLoading, isTasksError } = useSelector(
    (state) => state.Task
  );

  // console.log(AllTasks);

  useEffect(() => {
    dispatch(GetAllTasks());
  }, [dispatch]);

  const markComplete = (id, e) => {
    dispatch(
      UpdateTask(id, {
        status: e.target.checked ? "completed" : "pending",
      })
    );
  };

  const handleClosetaskModal = () => {
    settaskModal((prev) => !prev);
  };
  const handleUpdatetask = () => {
    dispatch(
      UpdateTask(editId, {
        task: editTask,
      })
    );
    settaskModal((prev) => !prev);
  };

  const handleDelete = (id) => {
    dispatch(DeleteTask(id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(AddTask({ task }));
    setTask("");
  };

  if (isTasksLoading) return <Loading />;

  return (
    <>
      <Box width={"65%"} mx={"auto"} mt={8}>
        <Typography variant="h4" mb={4}>
          Task List
        </Typography>
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: "2rem",
            padding: "10px",
          }}
        >
          <TextField
            fullWidth
            type="text"
            placeholder="Enter task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#1e3a8a" }}>
                <TableCell sx={{ color: "white", width: "50%" }}>
                  Task
                </TableCell>
                <TableCell
                  sx={{ color: "white", width: "25%", textAlign: "center" }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ color: "white", width: "25%", textAlign: "center" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isTasksError || AllTasks?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    No Task Found / Something went wrong
                  </TableCell>
                </TableRow>
              ) : (
                AllTasks?.map((task) => (
                  <TableRow key={task?._id}>
                    <TableCell
                      sx={{
                        width: "50%",
                        textDecoration:
                          task?.status === "completed"
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {task?.task}
                    </TableCell>
                    <TableCell sx={{ width: "25%", textAlign: "center" }}>
                      {task?.status === "completed" ? "Completed" : "Pending"}
                    </TableCell>
                    <TableCell sx={{ width: "25%", textAlign: "center" }}>
                      <Switch
                        defaultChecked={task?.status === "completed"}
                        color="success"
                        onChange={(e) => markComplete(task?._id, e)}
                      />
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditId(task?._id);
                          settaskModal((prev) => !prev);
                          setEditTask(task?.task);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(task?._id)}
                      >
                        <MdDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Modal */}
      <Modal open={taskModal} onClose={handleClosetaskModal}>
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "50%",
            transform: "translateX(50%)",
            width: { xs: "90%", sm: "75%", md: "50%", lg: "30%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {/* task Information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Task"
              value={editTask}
              onChange={(e) => {
                setEditTask(e.target.value);
              }}
            />
            <Button variant="outlined" size="small" onClick={handleUpdatetask}>
              Update
            </Button>
          </Box>

          {/* Edit Button */}
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
