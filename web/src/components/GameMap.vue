<script setup lang="ts">
import { GameMap } from '../gameplay'

const canvas = ref()
const parent = ref()

onMounted(() => {
  // eslint-disable-next-line no-new
  new GameMap(canvas.value.getContext('2d'), parent.value)
})
</script>

<template>
  <div ref="parent" class="gamemap w-full h-full flex justify-center">
    <canvas ref="canvas" tabindex="1" />
  </div>
</template>
