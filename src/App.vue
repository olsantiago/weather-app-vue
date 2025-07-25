<script setup>
import { ref, computed, onMounted } from 'vue'
import LocationTools from './components/LocationTools.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import ForecastList from './components/Forcast/ForecastList.vue'
import LineChartBox from './components/Charts/LineChartBox.vue'
import { baseQuery } from './api/baseQuery'
import AlertBox from './components/AlertBox.vue'

const weather = ref({})
const forecast = ref([])
const hourlyData = ref([])
const stateNavigator = ref(0)
const showMessage = ref(false)

const name = computed(
  () => `${weather.value.name}, ${weather.value.sys.country ?? ''}`,
)

const weatherLocation = async (location) => {
  baseQuery(location)
    .then((res) => {
      weather.value = res.weatherData
      forecast.value = res.forecastDays
      hourlyData.value = res.forecastHourly
      onHideMessage()
    })
    .catch((err) => {
      showMessage.value = true
    })
}

const onHideMessage = () => {
  showMessage.value = false
}

function locationBySearch(query) {
  if (query != '') {
    weatherLocation(`q=${query}`)
  }
}

async function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        weatherLocation(`lat=${latitude}&lon=${longitude}`)
      },
      (err) => {
        stateNavigator.value = err.code
      },
    )
  } else {
    window.alert('Could not get location')
  }
}

onMounted(() => {
  getLocation()
})
</script>

<template>
  <div class="min-h-screen flex flex-col md:max-w-5xl mx-auto p-4 font-albert">
    <header class="flex justify-between pb-8">
      <LocationTools @get-coords="getLocation" @search="locationBySearch" />
    </header>
    <AlertBox v-if="showMessage" @on-hide-message="onHideMessage" />

    <main class="flex flex-grow md:justify-center">
      <div
        v-if="weather && forecast.length > 0"
        class="flex flex-col sm:flex-row w-full gap-4"
      >
        <div class="w-full grow">
          <CurrentWeather
            :name="name"
            :icon="weather.weather[0].icon"
            :temp="weather.main.temp"
            :temp-max="weather.main.temp_max"
            :temp-min="weather.main.temp_min"
            :main="weather.weather[0].main"
            :description="weather.weather[0].description"
            :humidity="weather.main.humidity"
            :wind-speed="weather.wind.speed"
            :cloudiness="weather.clouds.all"
          />
          <div class="mt-8 md:pl-5 sm:px-0 flex-grow">
            <ForecastList :forecast="hourlyData" is-hourly />
          </div>
        </div>
        <div class="w-full mt-8 sm:mt-0">
          <ForecastList :forecast="forecast" />
          <LineChartBox :forecast="forecast" />
        </div>
      </div>
      <h2
        v-else-if="stateNavigator"
        class="m-auto text-2xl font-bold text-sky-800 dark:text-sky-400"
      >
        Please Allow Location in your browser
      </h2>

      <div v-else class="text-center m-auto">
        <div role="status">
          <svg
            class="inline mr-2 w-20 h-20 text-[rgba(251,252,251,.8)] animate-spin dark:text-gray-600 fill-sky-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style></style>
