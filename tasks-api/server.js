const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const VALID_STATUSES = ['todo', 'doing', 'done'];

let tasks = [];
let nextId = 1;

function findTaskIndex(id) {
  return tasks.findIndex(t => t.id === id);
}
function validateStatus(status) {
  return VALID_STATUSES.includes(status);
}

app.get('/tasks', (req, res) => {
  const { status } = req.query;
  if (status) {
    if (!validateStatus(status)) {
      return res.status(400).json({ message: 'status inválido. Debe ser todo, doing o done' });
    }
    return res.json(tasks.filter(t => t.status === status));
  }
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'title es requerido y debe ser texto' });
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? String(description).trim() : '',
    status: 'todo'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });

  const { title, description, status } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'title es requerido y debe ser texto' });
  }
  if (!status || !validateStatus(status)) {
    return res.status(400).json({ message: 'status inválido. Debe ser todo, doing o done' });
  }

  const updated = {
    id,
    title: title.trim(),
    description: description ? String(description).trim() : '',
    status
  };
  tasks[idx] = updated;
  res.json(updated);
});

app.patch('/tasks/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });

  const { status } = req.body;
  if (!status || !validateStatus(status)) {
    return res.status(400).json({ message: 'status inválido. Debe ser todo, doing o done' });
  }

  tasks[idx].status = status;
  res.json(tasks[idx]);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(idx, 1);
  res.json({ message: 'Task deleted successfully' });
});

app.get('/tasks/summary', (req, res) => {
  const summary = { todo: 0, doing: 0, done: 0 };
  for (const t of tasks) {
    if (validateStatus(t.status)) summary[t.status]++;
  }
  res.json(summary);
});

app.get('/', (req, res) => {
  res.json({ message: 'Tasks API - Up' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
