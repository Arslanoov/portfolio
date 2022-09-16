<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    :min-width="minWidth"
    :min-height="minHeight"
    @dragging="onDrag"
    @resizing="onResize"
    @click="moveWindow"
    v-click-away="hideWindow"
    :parent="true"
    :z="active ? 5 : 1"
  >
    <div class="draggable">
      <div class="draggable__header">
        <h3 class="draggable__title">{{ title }}</h3>
        <div @click="onCloseWindow" class="draggable__remove">x</div>
      </div>
      <div class="draggable__container">
        <slot />
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script setup>
import { ref, defineProps } from 'vue'

import { useWindowsStore } from '@/stores/windowsStore.js'

import throttle from '@/utils/throttle.js'

const {
  initialWidth,
  initialHeight,
  initialX,
  initialY,
  minWidth,
  minHeight,
  name,
  title
} = defineProps({
  initialWidth: Number,
  initialHeight: Number,
  initialX: Number,
  initialY: Number,
  minWidth: Number,
  minHeight: Number,
  name: String,
  title: String
})

const getStorageData = (prop) => Number(localStorage.getItem(`card_${name}_${prop}`)) ?? 0

const width = ref(getStorageData('width') || initialWidth)
const height = ref(getStorageData('height') || initialHeight)
const x = ref(getStorageData('x') || initialX)
const y = ref(getStorageData('y') || initialY)
const active = ref(true)

const updateStorageData = throttle((name) => {
  localStorage.setItem(`card_${name}_x`, String(Math.min(x.value, window.innerWidth - 20)))
  localStorage.setItem(`card_${name}_y`, String(Math.min(y.value, window.innerHeight - 20)))
  localStorage.setItem(`card_${name}_width`, String(Math.min(width.value, window.innerWidth - 20)))
  localStorage.setItem(`card_${name}_height`, String(Math.min(height.value, window.innerHeight - 20)))
}, 750)

const windowsStore = useWindowsStore()

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

const onCloseWindow = () => windowsStore.closeWindow(name)
</script>

<style lang="scss" scoped>
.draggable {
  width: 100%;
  height: 100%;

  background: $white;

  &__header,
  &__container {
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    overflow: hidden;

    height: 3.5rem;

    background-color: $secondary-color;

    padding: 0.2rem 2rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 400;

    text-overflow: ellipsis;

    color: $white;
  }

  &__remove {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.5rem;
    height: 2.5rem;

    background-color: #cc0707;
    color: #fff;

    font-size: 2.5rem;
    
    &:hover {
      cursor: pointer;
    }
  }

  &__container {
    height: calc(100% - 3.5rem);

    padding: 2rem;

    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
