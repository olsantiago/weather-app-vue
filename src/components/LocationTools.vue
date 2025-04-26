<script setup>
import { ref, defineEmits } from 'vue'
const citySearch = ref('')
const showMostPopular = ref(false)

const emit = defineEmits(['getCoords', 'search'])
const mostPopular = ['Rio De Janero', 'Beijing', 'Los Angeles']

const handleSearch = () => {
  emit('search', citySearch.value.trim())
}

const handleClick = () => {
  emit('search', citySearch.value.trim())
}

const handleKeydown = () => {
  if (citySearch.value?.length <= 1) {
    showMostPopular.value = true
  } else {
    showMostPopular.value = false
  }
}

const handleOnFocus = () => {
  showMostPopular.value = true
}

const handleSelect = (e) => {
  const value = e?.target.getAttribute('value')
  citySearch.value = value
  showMostPopular.value = false
  emit('search', value.trim())
}
</script>
<template>
  <div class="w-full h-[48px] px-4 relative">
    <button
      @click.prevent="handleClick"
      type="button"
      aria-label="focus"
      class="h-[48px] w-1/12 float-right absolute right-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="26"
        height="26"
        class="fill-current text-sky-800 dark:text-lime-50"
      >
        <path
          d="M12,8C14.21,8 16,9.79 16,12C16,14.21 14.21,16 12,16C9.79,16 8,14.21 8,12C8,9.79 9.79,8 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5C8.13,5 5,8.13 5,12C5,15.87 8.13,19 12,19C15.87,19 19,15.87 19,12C19,8.13 15.87,5 12,5Z"
        />
      </svg>
    </button>
    <input
      v-model="citySearch"
      type="text"
      placeholder="Find your City.."
      class="p-3 w-full border-none bg-[rgba(251,252,251,.8)] dark:bg-[#37444A] rounded-full px-3 text-[18px] text-sky-800 dark:text-lime-50 placeholder:text-sky-800 dark:placeholder:text-lime-50 border border-gray-300 focus:ring-blue-300 pl-6"
      @keydown.enter="handleSearch"
      @focus="handleOnFocus"
      @keydown="handleKeydown"
    />

    <div
      v-if="showMostPopular"
      class="w-52 mt-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute z-10"
    >
      <a
        href="#"
        aria-current="true"
        class="block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600"
      >
        Most Popular
      </a>
      <a
        v-for="(item, index) in mostPopular"
        :key="index"
        href="#"
        :value="item"
        class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        @click="handleSelect"
      >
        {{ item }}
      </a>
    </div>
  </div>
</template>
