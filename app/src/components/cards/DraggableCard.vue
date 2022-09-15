<template>
  <vue-draggable-resizable
    :w="isMobile ? '100vw' : width"
    :h="height"
    :x="x"
    :y="y"
    :min-width="minWidth"
    :min-height="minHeight"
    @dragging="onDrag"
    @resizing="onResize"
    @click="moveWindow"
    v-click-away="hideWindow"
    :axis="isMobile ? 'y' : 'both'"
    :parent="true"
    :z="active ? 5 : 1"
  >
    <div class="draggable-container">
      <slot />
    </div>
  </vue-draggable-resizable>
</template>

<script setup>
import { ref, defineProps } from 'vue'

import throttle from '../../utils/throttle.js'

const { initialWidth, initialHeight, initialX, initialY, minWidth, minHeight, name } = defineProps({
  initialWidth: Number,
  initialHeight: Number,
  initialX: Number,
  initialY: Number,
  minWidth: Number,
  minHeight: Number,
  name: String
})

const isMobile = window.innerWidth < 768

const getStorageData = (prop) => Number(localStorage.getItem(`card_${name}_${prop}`)) ?? 0

const width = ref(getStorageData('width') || initialWidth)
const height = ref(getStorageData('height') || initialHeight)
const x = ref(getStorageData('x') || initialX)
const y = ref(getStorageData('y') || initialY)
const active = ref(false)

const updateStorageData = throttle((name) => {
  localStorage.setItem(`card_${name}_x`, String(Math.min(x.value, window.innerWidth - 20)))
  localStorage.setItem(`card_${name}_y`, String(Math.min(y.value, window.innerHeight - 20)))
  localStorage.setItem(`card_${name}_width`, String(Math.min(width.value, window.innerWidth - 20)))
  localStorage.setItem(`card_${name}_height`, String(Math.min(height.value, window.innerHeight - 20)))
}, 750)

const onResize = (newX, newY, newWidth, newHeight) => {
  x.value = newX
  y.value = newY
  width.value = newWidth
  height.value = newHeight

  updateStorageData(name)
}

const onDrag = (newX, newY) => {
  x.value = newX
  y.value = newY
  active.value = true

  updateStorageData(name)
}

const moveWindow = () => active.value = true
const hideWindow = () => active.value = false
</script>

<style lang="scss" scoped>
.draggable-container {
  width: 100%;
  height: 100%;

  padding: 2rem;

  overflow: scroll;

  background: #fff;
}
</style>
