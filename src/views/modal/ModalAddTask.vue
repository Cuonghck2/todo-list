<!-- eslint-disable no-undef -->
<script setup>
import {  computed, defineProps } from 'vue';
import store from '@/store/store';
import { useStore } from 'vuex';
import { ref } from 'vue';
defineProps({
    isOpen: {
        type: Boolean,
    },
    onClose:{
        type: Function
    },

})
const commitStore = useStore();
let title = ref('');
let status = ref(false);
let emtyError = ref(false)
let repeatError = ref(false)
const task = computed(() => {
  return store.state.tasks
})
const handleAddTask = ()=>{
    const checkRepeat = task.value.find(item => item.title === title.value)
    if(title.value === ''){
      emtyError.value = "Vui lòng nhập công việc"
    }else if(title.value === checkRepeat?.title){
        repeatError.value = "Đã có trong danh sách"
        title.value = ''
    } else{
        commitStore.commit('addTask', {
            title: title.value,
            status: status.value
        })
        title.value = ''
    }
}
</script>
<template>
    <main>
        <div v-if="isOpen">
            <div class="modal-overlay"></div>
            <div class="modal-add">
                <h3 class="title-add">Thêm công việc</h3>
                <p class="error" v-if="emtyError && !repeatError">{{ emtyError }}</p>
                <p class="error" v-if="repeatError && !emtyError">{{ repeatError }}</p>
                <div class="modal-input">
                    <input type="text" placeholder="Nội dung công việc" v-model="title" value="title" name="" id="">
                    <button @click="handleAddTask">Thêm</button>
                </div>
                <button class="close-modal" @click="onClose">Đóng</button>
            </div>
        </div>
    </main>
</template>

<style>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal-add {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  z-index: 2;
}

.modal-input {
  margin-top: 20px;
}

.modal-add {
    width: 400px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
}
.title-add {
    font-size: 20px;
    font-weight: 600;
}
.modal-input{
    display: flex;
    width: 100%;
    margin-bottom: 18px;
}
.modal-input input[type="text"]{
    outline: none;
    width: 100%;
    padding: 10px 12px;
    border: none;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border:  #ccc 1px solid;
}
.modal-input button{
    outline: none;
    border: none;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: #1976d2;padding: 0 10px;
    color: #fff;
}
.modal-input button:hover{
 cursor: pointer;   
}
.close-modal{
  margin: 0 8px;
  font-size: 14px;
  background-color: #1976d2;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  color: #fff;
  float: right;
}
.close-modal:hover{
    cursor: pointer;
}
.error{
    color: red;
    margin-left: 12px;
}
</style>