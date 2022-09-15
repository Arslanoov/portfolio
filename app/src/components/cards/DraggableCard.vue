<template>
  <vue-draggable-resizable
      :w="isMobile ? '100vw' : width"
      :h="height"
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
import { ref, defineProps, toRefs } from 'vue'

const props = defineProps({
  initialWidth: Number,
  initialHeight: Number,
  initialX: Number,
  initialY: Number,
  minWidth: Number,
  minHeight: Number,
})

const { initialWidth, initialHeight, initialX, initialY, minWidth, minHeight } = toRefs(props)

const width = ref(initialWidth)
const height = ref(initialHeight)
const x = ref(initialX)
const y = ref(initialY)
const active = ref(false)

const isMobile = window.innerWidth < 768

const onResize = (newX, newY, newWidth, newHeight) => {
  x.value = newX
  y.value = newY
  width.value = newWidth
  height.value = newHeight
}

const onDrag = (newX, newY) => {
  x.value = newX
  y.value = newY
  active.value = true
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
