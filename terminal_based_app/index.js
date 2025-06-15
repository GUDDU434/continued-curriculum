#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();
const TASK_FILE = path.join(__dirname, "tasks.json");

const loadTasks = () => {
  if (!fs.existsSync(TASK_FILE)) return [];
  const data = fs.readFileSync(TASK_FILE, "utf-8");
  return JSON.parse(data || "[]");
};

const saveTasks = (tasks) => {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
};

// -------------------------
// Add Task
// -------------------------
program
  .command("add-task")
  .description("Add a new task with a title and due date")
  .requiredOption("-t, --title <title>", "Task title")
  .requiredOption("-d, --due <dueDate>", "Due date (YYYY-MM-DD)")
  .action((options) => {
    const { title, due } = options;

    if (!title.trim()) {
      console.error("Task title cannot be empty.");
      process.exit(1);
    }

    if (!due.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(due)) {
      console.error("Due date must be in YYYY-MM-DD format.");
      process.exit(1);
    }

    const tasks = loadTasks();
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate: due,
      status: "pending",
    };

    tasks.push(newTask);
    saveTasks(tasks);

    console.log(`✅ Task "${title}" with due date ${due} has been added.`);
  });

// -------------------------
// List Tasks
// -------------------------
program
  .command("list-tasks")
  .description("List all tasks with status and due date")
  .action(() => {
    const tasks = loadTasks();

    if (tasks.length === 0) {
      console.log("No tasks found.");
      return;
    }

    console.log("Your Tasks:");
    console.log("----------------------------------------------------");
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. Title: ${task.title}\n   Due: ${
          task.dueDate
        }\n   Status: ${task.status} (ID: ${task.id})\n`
      );
    });
  });

// -------------------------
// Complete Task
// -------------------------
program
  .command("complete-task")
  .description("Mark a task as completed by ID or title")
  .option("-i, --id <id>", "Task ID")
  .option("-t, --title <title>", "Task title")
  .action((options) => {
    const { id, title } = options;
    const tasks = loadTasks();

    if (!id && !title) {
      console.error(
        "Please provide either --id or --title to complete a task."
      );
      process.exit(1);
    }

    let taskIndex = -1;

    if (id) {
      taskIndex = tasks.findIndex(
        (task) => task.id.toString() === id.toString()
      );
    } else if (title) {
      taskIndex = tasks.findIndex(
        (task) => task.title.toLowerCase() === title.toLowerCase()
      );
    }

    if (taskIndex === -1) {
      console.error("Task not found.");
      process.exit(1);
    }

    if (tasks[taskIndex].status === "completed") {
      console.log(" Task is already marked as completed.");
      return;
    }

    tasks[taskIndex].status = "completed";
    saveTasks(tasks);

    console.log(
      `Task "${tasks[taskIndex].title}" has been marked as completed.`
    );
  });

program.parse(process.argv);
