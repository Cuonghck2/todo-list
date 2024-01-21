<!-- eslint-disable vue/require-valid-default-prop -->
<script setup>
import {  toRefs, defineProps } from 'vue';
const props = defineProps({
    weather:{type: Object,default: {}}
})
const { weather } = toRefs(props);

</script>

<template>
        <div class="weather-section">
            <div class="weather-info">
            <img :src="weather?.current?.condition?.icon" alt="">
            <p class="temp">{{ weather?.current?.temp_c }}°C</p>
            </div>
        </div>
</template>

<style>
.weather-info{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.temp{
    font-size: 30px;
    font-weight: 600;
}
</style>