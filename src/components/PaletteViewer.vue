<script setup lang="ts">
import {ref} from "vue"
import {Color} from "../Color"
defineProps<{
  msg: string
}>()
const colors = ref(["#aa0000", "#00aa00", "#880088", "#008888"])
function handleColorChange(event: Event, index: number) {
  console.log(event, index)
  colors.value[index] = (event?.target as HTMLInputElement).value ?? colors.value[index]
}
function remove(index: number) {
  colors.value = [...colors.value.slice(0, index), ...colors.value.slice(index+1, colors.value.length)]
}
function add() {
  colors.value.push("#000000")
}
function copy(color: string) {
  navigator.clipboard.writeText(color)
}
</script>

<template>
  <div class="wrapper">
    <ul class="palette">
      <li v-for="(color, index) in colors" :key="index" :data-color="color" :style="{ backgroundColor: color }">
        <label :for="'color'+index">{{ color }}</label>
        <label :for="'color'+index">{{ Color.RGB.toString(Color.RGB.fromHex(color)) }}</label>
        <label :for="'color'+index">{{ Color.HSL.toString(Color.HSL.fromHex(color)) }}</label>
        <input type="color" :id="'color'+index" :value="color" @change="event => handleColorChange(event, index)"/>
        <button type="button" class="remove" @click="() => remove(index)">Remove</button>
        <button type="button" class="copy" @click="() => copy(color)">Copy</button>
      </li>
    </ul>
    <button type="button" class="add" @click="add">+</button>
  </div>
</template>

<style scoped>
div.wrapper {
  height: 100%;
}
ul {
  all: unset;
  display: flex;
  height: 100%;
  width: 100%;
  flex-flow: row;
}

li {
  all: unset;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
label {
  background-color: #ffffff88;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
input[type=color] {
  display: none;
}
button {
  all: unset;
  cursor: pointer;
}
button.remove,
button.copy {
  background-color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
div.wrapper {
  position: relative;
}
button.add {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  color: black;
  background-color: white;
  opacity: 0.4;
  font-size: 3rem;
  padding: 0 1rem;
}
button.add:hover {
  opacity: 1;
}
</style>
