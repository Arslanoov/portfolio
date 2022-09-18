<template>
  <vue-draggable-resizable
    v-click-away="hideWindow"
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    :min-width="minWidth"
    :min-height="minHeight"
    drag-cancel=".draggable__container"
    :parent="true"
    :z="active ? 5 : 1"
    @dragging="onDrag"
    @resizing="onResize"
    @click="moveWindow"
    @dblclick="onFullscreenWindow"
  >
    <div class="draggable">
      <div class="draggable__header">
        <h3 class="draggable__title">{{ title }}</h3>
        <div class="draggable__actions">
          <div
            class="draggable__action draggable__fullscreen"
            @click="onFullscreenWindow"
          >
            o
          </div>
          <div
            class="draggable__action draggable__small"
            @click="onSmallFullscreenWindow"
          >
            -
          </div>
          <div
            class="draggable__action draggable__remove"
            @click="onCloseWindow"
          >
            x
          </div>
        </div>
      </div>
      <div class="draggable__container">
        <slot />
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script setup>
import { ref } from 'vue'

import { useWindowsStore } from '@/stores/windowsStore.js'

import throttle from '@/utils/throttle.js'
import { vw, vh, isMobile } from '@/utils/sizes.js'

const {
  initialWidth,
  initialHeight,
  initialX,
  initialY,
  minWidth,
  minHeight,
  name,
  title,
} = defineProps({
  initialWidth: Number,
  initialHeight: Number,
  initialX: Number,
  initialY: Number,
  minWidth: Number,
  minHeight: Number,
  name: String,
  title: String,
})

const getStorageData = (prop) =>
  Number(localStorage.getItem(`card_${name}_${prop}`)) ?? 0

const width = ref(getStorageData('width') || initialWidth)
const height = ref(getStorageData('height') || initialHeight)
const x = ref(getStorageData('x') || initialX)
const y = ref(getStorageData('y') || initialY)
const active = ref(true)

const updateStorageData = throttle((name) => {
  localStorage.setItem(
    `card_${name}_x`,
    String(Math.min(x.value, window.innerWidth - 20))
  )
  localStorage.setItem(
    `card_${name}_y`,
    String(Math.min(y.value, window.innerHeight - 20))
  )
  localStorage.setItem(
    `card_${name}_width`,
    String(Math.min(width.value, window.innerWidth - 20))
  )
  localStorage.setItem(
    `card_${name}_height`,
    String(Math.min(height.value, window.innerHeight - 20))
  )
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

const moveWindow = () => (active.value = true)
const hideWindow = () => (active.value = false)

const onFullscreenWindow = () => {
  x.value = vw(1)
  y.value = vh(1)
  active.value = true

  window.setTimeout(() => {
    width.value = vw(98)
    height.value = vh(93)

    updateStorageData(name)
  }, 100)
}

const onSmallFullscreenWindow = () => {
  width.value = isMobile ? vw(70) : vw(30)
  height.value = isMobile ? vh(30) : vh(20)

  updateStorageData(name)
}

const onCloseWindow = () => windowsStore.closeWindow(name)
</script>

<style lang="scss" scoped>
.draggable {
  width: 100%;
  height: 100%;

  &__header,
  &__container {
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    overflow: hidden;

    min-height: 3.5rem;

    background-color: $secondary-color;

    padding: 0.2rem 2rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 400;

    text-overflow: ellipsis;

    color: $white;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.5rem;
    height: 2.5rem;

    color: $white;

    font-size: 2.2rem;

    &:hover {
      cursor: pointer;
    }

    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }

  &__fullscreen {
    background-color: $green;
  }

  &__small {
    font-size: 4rem;

    background-color: $yellow;
  }

  &__remove {
    background-color: $red;
  }

  &__container {
    height: calc(100% - 3.5rem);

    padding: 1rem 2rem;

    overflow-y: scroll;
    overflow-x: hidden;

    border: 0.1rem dashed $black;

    background: $white;
  }
}
</style>
