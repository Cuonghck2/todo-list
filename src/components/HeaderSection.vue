<script setup>
 import moment from 'moment';
 import 'moment/locale/vi';
import axios from 'axios';
import { ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import WeatherSectionVue from './WeatherSection.vue';

let day = moment().format("DD")
let month = moment().format("MM")
let year = moment().format("YYYY")
let weekdays = moment().format("dddd")


let date = ref(null)
const store = useStore()
date.value = moment().format("DD/MM/YYYY")
watch(date,() => {
   store.commit('resetStatus', false)
})

let weather = ref({})
watchEffect(async () => {
   try {
      const res = await axios.get("https://api.weatherapi.com/v1/current.json?key=3c02b60b872f4db6ae795353241901&q=VietNam")
      weather.value = res.data.current.condition
   } catch (error) {
      console.log(error)
   }
})

</script>

<template>
    <main>
        <header class="header-section">
           <div class="date-container">
              <span class="day">{{ day }}</span>
              <div class="date-info">
                 <span class="month">{{ month }}</span>
                 <span class="year">{{ year }}</span>
              </div>
           </div>
           <WeatherSectionVue />
           <div class="weekdays">
              {{ weekdays }}
           </div>
        </header>
    </main>
</template>

<style>
 .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 24px;
 }
.date-container {
   display: flex;
   align-items: center;
   gap: 8px;
}
.day {
   font-size: 40px;
   font-weight: 700;
}
.date-info {
   display: flex;
   flex-direction: column;
}
.month {
   font-size: 24px;
   font-weight: 600;
}
.year {
   font-size: 20px;
}
.weekdays {
   font-size: 24px;
}
</style>