<script setup lang="ts">
import {Color} from "../Color"
import {ref, onMounted} from "vue" 

const diameter = 300
const wheel = {radius: diameter/2, x: diameter/2, y: diameter/2}

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  console.log(canvas.value)
  const ctx = canvas.value?.getContext("2d")
  if (ctx) {
    drawWheel(ctx)
  }
})
function drawWheel(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 10
  for(let deg=0; deg < 360; deg += 0.5) {
    const radStart = (deg-1)*(2*Math.PI)/360
    const radEnd = (deg+1)*(2*Math.PI)/360
    for (let radius = 1; radius < wheel.radius; radius += 5) {
      const color = {hue: deg, saturation: 1, lightness: 0.5*(1-radius/150)+0.5}
      ctx.strokeStyle = Color.RGB.toHex(Color.HSL.toRGB(color))
      ctx.beginPath()
      ctx.arc(wheel.x, wheel.y, radius, radStart, radEnd)
      ctx.stroke()
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <canvas ref="canvas" :width="diameter" :height="diameter"></canvas>
  </div>
</template>

<style scoped>
div.wrapper {
  height: 100%;
}
canvas {
  outline: 1px solid white;
}
</style>
