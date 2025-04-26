<script setup>
import BaseIcons from './BaseIcons.vue'
import { getWeekDay, getHour } from '../utils'
import { onMounted } from 'vue'

defineProps({
  dtTxt: String,
  icon: String,
  description: String,
  tempMax: Number,
  tempMin: Number,
  isHourlyItem: Boolean,
  temp: Number,
})
</script>

<template>
  <div
    class="min-w-[50%] md:min-w-[25%] lg:min-w-[25%] flex grow flex-col items-center p-2"
  >
    <span v-if="isHourlyItem" class="font-roboto"> {{ temp }}&deg; </span>
    <span v-else class="font-roboto">
      {{ tempMax }}&deg;/{{ tempMin }}&deg;
    </span>
    <BaseIcons :name="icon" :size="34" />
    <span class="text-center text-sm grow">{{ description }}</span>

    <span v-if="isHourlyItem">{{ getHour(dtTxt) }} </span>
    <span v-else>{{ getWeekDay(dtTxt) }} </span>
  </div>
</template>
