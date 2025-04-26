import api from '../api';

export async function addTodoAction(text) {
  const res = await api.post("/todos", { text });
  return res.data;
}

export async function toggleTodoAction(id) {
  const res = await api.put(`/todos/${id}/toggle`);
  return res.data;
}

export async function deleteTodoAction(id) {
  await api.delete(`/todos/${id}`);
  return id;
}

export async function fetchTodos() {
  const res = await api.get("/todos");
  return res.data || [];
}