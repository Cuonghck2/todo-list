<script setup>
import { watch, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex"

const taskData = defineModel();
const router = useRouter();
const storeComit = useStore();
let activeRow = ref(null)
let activeRowIndex = computed(() => parseFloat(router.currentRoute.value.params.id))
watch(activeRowIndex, ( data) => {
  activeRow.value = data
}, {
  immediate: true
})

const handleActive = (id) => {
  router.push(`/${id}`)
}
const handleDelete = (id) => {
  storeComit.commit('removeTask', id)
}
const handleChangeStatus = (id) => {
  storeComit.commit('completeTask', id)
}
</script>
<template>
        <table>
            <thead>
                <tr>
                    <th >STT</th>
                    <th >Công việc</th>
                    <th >Trạng thái</th>
                    <th >Chức năng</th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="(task,index) in taskData" :key="task.id" @click="handleActive(task.id)" :class="{ active: activeRow === task.id }">
                    <td class="todo-title">{{ index+1 }}</td>
                    <td class="todo-title" :class="{brick: task.status}">{{ task.title }}</td>
                    <td class="status">
                        <input  :checked="task.status" @change="handleChangeStatus(index)"  type="checkbox">
                    </td>
                    <td class="feature">
                        <button class="feature-btn" @click="handleDelete(index)">Xóa</button>
                    </td>   
                </tr>
            </tbody>
        </table>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

tbody {
  max-height: 500px;
  overflow-y: auto;
}

td,
th {
  padding: 8px;
  text-align: center;
}

td:hover {
  cursor: pointer;
}

.todo-title {
  width: 25%;
}

.status {
  width: 25%;
  text-align: center;
}
.feature{
    width: 25%;
}
.feature-btn {
  padding: 4px 8px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
input[type="checkbox"]:hover {
  cursor: pointer;
}
.feature-btn {
  margin: 0 8px;
  font-size: 14px;
  background-color: #1976d2;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
}
.feature-btn:hover {
    cursor: pointer;
}
.brick{
    text-decoration: line-through;
}
.active {
  background-color: #f5f5f5;
}
</style>