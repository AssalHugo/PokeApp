<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: ""
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <input type="text" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
           v-model="search" placeholder="Search..."/>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="$emit('search', search)">Search</button>
  </div>

</template>

<style scoped>

</style>