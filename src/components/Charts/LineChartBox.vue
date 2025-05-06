<script>
import { ref } from 'vue'
import { computed, defineComponent } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { getWeekDay } from '../../utils'

Chart.register(...registerables)

export default defineComponent({
  components: { LineChart },
  props: {
    forecast: {
      type: Array,
    },
  },
  setup(props) {
    const listDay = computed(() => [
      ...props.forecast.map((item) => getWeekDay(item.dt_txt)),
    ])

    const options = ref({
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          ticks: {
            color: '#51BDF8',
          },
        },
        x: {
          ticks: {
            color: '#51BDF8',
          },
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#51BDF8',
          },
        },
        title: {
          display: true,
          text: 'Forecast',
          color: '#51BDF8',
        },
      },
    })

    const tempData = computed(() => {
      return {
        labels: listDay.value,
        datasets: [
          {
            type: 'line',
            label: 'Temperature',
            data: props.forecast.map((item) => Math.round(item.main.temp)),
            radius: 5,
            borderWidth: 4,
            borderColor: ['#E9B02D'],
            backgroundColor: ['white'],
            lineTension: 0.3,
          },
        ],
      }
    })
    return { tempData, options }
  },
})
</script>

<template>
  <div
    class="mt-3 p-4 bg-[rgba(251,252,251)] font-medium text-sky-800 dark:text-sky-400 dark:bg-[rgba(55,68,74)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] rounded-md"
  >
    <div class="flex justify-center rounded-md p-4">
      <LineChart
        :chart-data="tempData"
        :options="options"
        style="max-height: 265px"
      />
    </div>
  </div>
</template>
