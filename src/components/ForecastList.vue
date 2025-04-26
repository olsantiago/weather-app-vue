<script setup>
import ForecastItem from './ForecastItem.vue'
import { rounded } from '../utils'

defineProps({
  forecast: Array,
  isHourly: Boolean,
})
</script>
<template>
  <div
    class="w-full p-4 bg-[rgba(251,252,251)] font-medium text-sky-800 dark:text-sky-400 dark:bg-[rgba(55,68,74,.5)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] rounded-md max-w-lg"
  >
    <h2 v-if="isHourly" class="text-center mb-3 text-lg">Hourly Forecast</h2>
    <h2 v-else class="text-center mb-3 text-lg">Daily Forecast</h2>

    <div class="flex flex-nowrap rounded-md overflow-scroll">
      <ForecastItem
        v-for="(item, index) in forecast"
        :key="index"
        :dt-txt="item?.dt_txt || item?.dt"
        :icon="item.weather[0].icon"
        :description="item.weather[0].description"
        :temp-max="rounded(item?.main?.temp_max || 0)"
        :temp-min="rounded(item?.main?.temp_min || 0)"
        :temp="rounded(item?.main?.temp || 0)"
        :is-hourly-item="isHourly"
      />
    </div>
  </div>
</template>
