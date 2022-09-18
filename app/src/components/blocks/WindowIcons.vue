<template>
  <div class="icons">
    <div
      v-for="window in DESKTOP_WINDOWS"
      :key="window.name"
      class="icon"
      @click="() => store.openWindow(window.name)"
    >
      <img
        :src="`/windows/${window.icon}`"
        class="icon__img"
        draggable="false"
        alt=""
      />
      <h4 class="icon__title">{{ t(window.title) }}</h4>
    </div>
  </div>
</template>

<script setup>
import { DESKTOP_WINDOWS } from '@/const/windows.js'

import { useWindowsStore } from '@/stores/windowsStore.js'

const { t } = defineProps({
  t: Function,
})

const store = useWindowsStore()
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;

  position: absolute;
  top: 2rem;
  left: 2rem;

  gap: 3rem;
}

.icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 7rem;

  &:hover {
    cursor: pointer;
  }

  &__img {
    width: 3rem;
  }

  &__title {
    font-size: 1.8rem;

    text-align: center;

    white-space: nowrap;

    color: $light-silver;
  }
}
</style>
