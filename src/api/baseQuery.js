const baseUrl = 'https://api.openweathermap.org/data/2.5'
const apiKey = import.meta.env.VITE_API_KEY

export const baseQuery = async (location) => {
  const urlWeather = `${baseUrl}/weather?${location}&appid=${apiKey}&units=metric`
  const urlForecast = `${baseUrl}/forecast?${location}&appid=${apiKey}&units=metric`
  const urlHourlyForecast = `https://pro.openweathermap.org/data/2.5/forecast/hourly?${location}&appid=${apiKey}&units=metric`

  let weatherData
  let forecastOrigin
  let forecastHourly
  let forecastDays

  try {
    const resolve = await Promise.all([
      fetch(urlWeather),
      fetch(urlForecast),
      fetch(urlHourlyForecast),
    ])
    if (resolve[0].status == 404 || resolve[1].status == 404) {
      throw 'City not found'
    }
    const data = resolve.map((response) => response.json())

    weatherData = await data[0]
    forecastOrigin = await data[1]
    forecastHourly = await data[2]
    forecastDays = filterByIncrement(forecastOrigin.list, 8, 40)
    return {
      weatherData,
      forecastDays,
      forecastHourly: forecastHourly?.list,
    }
  } catch (err) {
    console.error(err)
  }
}

const filterByIncrement = (iterable, increment, end) => {
  const iterableLength = iterable.length
  const result = []
  let index = increment
  while (index < iterableLength && index < end) {
    result.push(iterable[index])
    index += increment
  }
  return result
}
