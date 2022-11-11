<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>

    <div flex>
      <div>
        <a text-8xl font-700 rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
          King of Bots
        </a>
      </div>
      <p>
        <em text-sm opacity-75>{{ t('intro.desc') }}</em>
      </p>
    </div>

    <div py-4 />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <RouterLink
        btn m-3 text-sm
        to="/pk/"
      >
        {{ t('button.go') }}
      </RouterLink>
    </div>

    <div>
      <RouterLink
        btn m-3 text-sm
        to="/user/bot/"
      >
        {{ t('button.go') }}
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
