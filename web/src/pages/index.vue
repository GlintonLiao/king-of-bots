<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div mt-10>
    <div>
      <div>
        <a text-6xl font-black rel="noreferrer" href="https://github.com/glintonliao/king-of-bots" target="_blank">
          KING OF BOTS
        </a>
      </div>
      <p>
        <em text-sm opacity-75>{{ t('intro.desc') }}</em>
      </p>
    </div>

    <div py-3 />
    <div max-w-100 mx-auto mb--25 z-0>
      <img src="/public/pk_light.jpg" alt="">
    </div>

    <button z-10>
      <RouterLink
        btn m-3 text-lg
        to="/pk/"
      >
        {{ t('button.go') }}
      </RouterLink>
    </button>
  </div>
</template>

<style scoped>
img {
  mask-image: linear-gradient(0, transparent 13%, #fff);
  -webkit-mask-image: linear-gradient(0, transparent 13%, #fff);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
