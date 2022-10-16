<script setup lang="ts">
const parent = ref()
const canvas = ref()

onMounted(() => {
  // eslint-disable-next-line no-new
  // new GameMap(canvas.value.getContext('2d'), parent.value)
})
</script>

<template>
  <div ref="parent" class="gamemap">
    <canvas ref="canvas" />
  </div>
</template>
