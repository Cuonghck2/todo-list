<script setup>
import { computed, ref, watch } from 'vue';
import HeaderSection from '@/components/HeaderSection.vue';
import TodoItem from '@/components/TodoItem.vue';
import ModalAddTask from '../views/modal/ModalAddTask.vue'
import store from '@/store/store';
let isOpenAdd = ref(false);
defineProps({
  isOpen: Boolean,
  onclose: Function,
  taskData: Object
})
const handleOpenModal = () => {
  isOpenAdd.value = true

}
const handleCloseModal = () => {
  isOpenAdd.value = false
}
const select = ref('All')
let task = ref(null)
let filterTask = computed(() => {
  return store.state.tasks
})
watch(filterTask, (data) => {
  task.value = data;
}, {
  immediate: true
});

watch(select, (data) => {
  if (data === 'Chưa hoàn thành') {
    task.value = filterTask.value.filter(item => !item.status);
  } else if (data === 'Đã hoàn thành') {
    task.value = filterTask.value.filter(item => item.status);
  } else {
    task.value = filterTask.value;
  }
});


</script>
<template>
  <main>
    <div class="todolist">
          <HeaderSection/>
          <div class="select-section">
            <select @change="handleChangeOption" v-model="select" class="select-task">
              <option value="All" class="option-task">All</option>
              <option value="Chưa hoàn thành" class="option-task">Chưa hoàn thành</option>
              <option value="Đã hoàn thành" class="option-task">Đã hoàn thành</option>
            </select>
          </div>
          <TodoItem :taskData="task"/>
          <div class="btn-add" @click="handleOpenModal">
            <font-awesome-icon class="add-icon" icon="fa-solid fa-plus" />
          </div>
          <ModalAddTask :taskData="task" :onClose="handleCloseModal" :isOpen="isOpenAdd"/>
    </div>
  </main>
</template>
<style >
  .todolist {
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
    width: 600px;
    height: 600px;
  }
  .btn-add {
    position: absolute;
    bottom: -30px;
    right: 50%;
    transform: translateX(50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #1976d2;
    cursor: pointer;
    box-shadow:  0 0 30px rgba(0, 0, 0, 0.3);
  }
  .add-icon {
    color: #fff;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .select-section{
    display: flex;
    justify-content: flex-end;
  }
  .select-task {
    margin: 10px 24px;
    padding: 10px;
    width: 150px;
    border: #ccc 1px solid;
    border-radius: 5px;
    color: #616473;
    outline: none;
}
.select-task:hover {
    cursor: pointer;
}
.option-task{
    padding: 10px;
}
</style>

