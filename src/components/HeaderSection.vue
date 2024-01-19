<script setup>
 import moment from 'moment';
 import 'moment/locale/vi';
moment.locale('vi')
let day = moment().format("DD")
let month = moment().format("MM")
let year = moment().format("YYYY")
let weekdays = moment().format("dddd")
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
    margin: 16px 24px;
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