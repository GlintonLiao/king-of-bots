<script setup lang="ts">
import { GameMap } from '../gameplay'

const canvas = ref()
const parent = ref()

const pk = usePkStore()

onMounted(() => {
  pk.gameObj = new GameMap(canvas.value.getContext('2d'), parent.value)
})
</script>

<template>
  <div ref="parent" class="w-full h-full flex justify-center">
    <canvas ref="canvas" class="shadow-lg focus-outline-none" tabindex="1" />
  </div>
</template>
