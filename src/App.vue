<template>
  <div class="container">
    <h1>Gestión de Tareas</h1>

    <div class="form">
      <input v-model="newTitle" placeholder="Título de la tarea" />
      <input v-model="newDescription" placeholder="Descripción" />
      <button @click="addTask">Agregar tarea</button>
    </div>

    <div class="columns">
      <div class="col" v-for="state in states" :key="state">
        <h2>{{ stateLabels[state] }}</h2>
        <ul>
          <li v-for="task in filteredTasks(state)" :key="task.id">
            <strong>{{ task.title }}</strong><br />
            <small>{{ task.description }}</small><br />
            <select v-model="task.status" @change="changeStatus(task)">
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button @click="deleteTask(task.id)">🗑️</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tasks = ref([])
const newTitle = ref('')
const newDescription = ref('')
const states = ['todo', 'doing', 'done']
const stateLabels = { todo: 'To Do', doing: 'Doing', done: 'Done' }

async function getTasks() {
  const res = await fetch('/api/tasks')
  tasks.value = await res.json()
}

async function addTask() {
  if (!newTitle.value.trim()) return alert('El título es obligatorio')
  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: newTitle.value.trim(),
      description: newDescription.value.trim()
    })
  })
  newTitle.value = ''
  newDescription.value = ''
  getTasks()
}

async function changeStatus(task) {
  await fetch(`/api/tasks/${task.id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: task.status })
  })
  getTasks()
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
  getTasks()
}

function filteredTasks(state) {
  return tasks.value.filter(t => t.status === state)
}

onMounted(() => {
  getTasks()
})
</script>

<style scoped>
.container {
  font-family: sans-serif;
  padding: 2rem;
  background: #f4f4f4;
  color: #333;
}

h1 {
  text-align: center;
}

.form {
  text-align: center;
  margin-bottom: 1rem;
}

input {
  padding: 0.4rem;
  margin-right: 0.4rem;
}

button {
  padding: 0.5rem;
  cursor: pointer;
}

.columns {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.col {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  width: 30%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #eaeaea;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
}
</style>
