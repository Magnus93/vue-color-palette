<script setup lang="ts">
import {ref} from "vue"
defineProps<{
  msg: string
}>()
const colors = ref(["#ff0000", "#00ff00", "#ff00ff", "#00ffff"])
function handleColorChange(event: Event, index: number) {
  console.log(event, index)
  colors.value[index] = (event?.target as HTMLInputElement).value ?? colors.value[index]
}
</script>

<template>
  <ul class="greetings">
    <li v-for="(color, index) in colors" :key="index" :data-color="color" :style="{ backgroundColor: color }">
      <label>{{ color }}</label>
      <input type="color" :value="color" @change="event => handleColorChange(event, index)"/>
    </li>
  </ul>
</template>

<style scoped>
ul {
  all: unset;
  display: flex;
  height: 100vh;
  width: 100%;
  flex-flow: row;
}

li {
  all: unset;
  width: 100%;
  height: 100%;
  color: black;
}
</style>
