const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
} = require("../controllers/todoController");

const router = express.Router();

// CREATE TODO || POST
router.post("/create", createTodoController);

// GET ALL TODOS || POST
router.post("/getAll/:userId", getTodoController);

// UPDATE TODO || PATCH
router.patch("/update/:id", updateTodoController);

// DELETE TODO || DELETE
router.delete("/delete/:id", deleteTodoController);

module.exports = router;
