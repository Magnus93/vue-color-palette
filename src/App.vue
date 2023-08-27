<script setup lang="ts">
import PaletteViewer from './components/PaletteViewer.vue'
import ColorWheel from './components/ColorWheel.vue';
</script>

<template>
  
    <div class="main">
      <PaletteViewer msg="You did it!" />
      <ColorWheel />
    </div>
  
</template>

<style scoped>
div.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
