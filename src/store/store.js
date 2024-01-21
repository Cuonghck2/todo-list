import { createStore } from 'vuex'
const store = createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    addTask(state, task) {
      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks)
      }
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    removeTask(state, id) {
      state.tasks.splice(state.tasks.indexOf(id), 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      state.tasks[id].status = !state.tasks[id].status
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    resetStatus(state, status) {
      state.tasks.find((task) => task.status === status).status = false
    }
  }
})

export default store
