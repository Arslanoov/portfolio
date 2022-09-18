<template>
  <div class="bottom-menu">
    <div class="bottom-menu__lang">
      <router-link :to="`/${changeLang}`" class="bottom-menu__link">
        {{ changeLang.toUpperCase() }}
      </router-link>
    </div>
    <div class="bottom-menu__time">{{ hours }}:{{ minutes }}</div>
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue'

import { formatHours, formatMinutes } from '@/utils/date.js'

const hours = ref()
const minutes = ref()

const props = defineProps({
  changeLang: String,
})

const updateTime = () => {
  const now = new Date()
  hours.value = formatHours(now.getHours())
  minutes.value = formatMinutes(now.getMinutes())
}

window.setInterval(() => updateTime(), 15000)
updateTime()

const { changeLang } = toRefs(props)
</script>

<style lang="scss" scoped>
.bottom-menu {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 2px solid $grey;

  height: 3rem;

  padding: 0 3rem;

  background-color: $silver;

  font-size: 1.6rem;

  &,
  &__link {
    color: $white;
  }
}
</style>
