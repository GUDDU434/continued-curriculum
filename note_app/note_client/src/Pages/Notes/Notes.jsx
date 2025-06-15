import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AddNote, GetAllNotes } from "../../Redux/note/note.action";

const Notes = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  const { AllNotes, isNotesLoading, isNotesError } = useSelector(
    (state) => state.NoteReducer
  );

  useEffect(() => {
    dispatch(GetAllNotes());
  }, [dispatch]);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(AddNote({ title: task, content: desc }));
    setTask("");
  };

  //   console.log(AllNotes);

  return (
    <>
      <Box
        sx={{
          width: {
            xs: "85%",
            sm: "80%",
            md: "60%",
            lg: "40%",
          },
          mx: "auto",
          mt: 8,
          border: "1px solid rgb(117, 120, 128)",
          boxShadow: "rgba(141, 138, 138, 0.24) 0px 3px 8px",
          borderRadius: "10px",
          p: { xs: "16px", sm: "20px" }, // smaller padding on mobile
        }}
      >
        <Typography variant="h4" fontWeight={"bold"} mb={4}>
          <GiNotebook /> Note App
        </Typography>
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: "2rem",
          }}
        >
          <TextField
            fullWidth
            type="text"
            placeholder="Notes Title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#91410e",
              "&:hover": { backgroundColor: "#722f0b" },
            }}
          >
            <IoMdAddCircle
              color="white"
              backgroundColor="#91410e"
              style={{
                fontSize: "1.8rem",
                minWidth: "1.2rem",
              }}
            />{" "}
            <Typography sx={{ fontWeight: "bold" }}>Add</Typography>
          </Button>
        </Box>

        <Typography
          variant="h6"
          fontWeight={"bold"}
          borderBottom={"2px solid rgb(200, 202, 207)"}
        >
          Notes
        </Typography>

        <Box
          height={"50vh"}
          overflow={"auto"}
          sx={{
            scrollbarColor: "#b98666 transparent",
            scrollbarWidth: "thin",
          }}
        >
          {isNotesLoading ? (
            <Typography
              sx={{
                textAlign: "center",
              }}
              mt={"2rem"}
              variant="h5"
            >
              Loading........
            </Typography>
          ) : isNotesError ? (
            <Typography
              sx={{
                textAlign: "center",
              }}
              mt={"2rem"}
              variant="h5"
            >
              Something went wrong
            </Typography>
          ) : (
            Array.isArray(AllNotes?.notes) &&
            AllNotes?.notes?.map((task) => (
              <Box
                key={task._id}
                sx={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  borderBottom: "2px solid rgb(200, 202, 207)",
                  alignContent: "center",
                }}
              >
                {task.title}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default Notes;
