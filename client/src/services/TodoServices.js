import axios from "axios";

// Read token lazily per-request so it never runs before the user logs in
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  return user?.token ? { Authorization: `bearer ${user.token}` } : {};
};

//CREATE TODO
const createTodo = (data) => {
  return axios.post("/api/v1/todo/create", data, { headers: getAuthHeader() });
};

//GET ALL TODO
const getAllTodo = (id) => {
  return axios.post(`/api/v1/todo/getAll/${id}`, {}, { headers: getAuthHeader() });
};

//UPDATE TODO
const updateTodo = (id, data) => {
  return axios.patch("/api/v1/todo/update/" + id, data, { headers: getAuthHeader() });
};

//DELETE TODO
const deleteTodo = (id) => {
  return axios.delete("/api/v1/todo/delete/" + id, { headers: getAuthHeader() });
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;