<template>
  <vue-draggable-resizable
      :w="width"
      :h="height"
      @dragging="onDrag"
      @resizing="onResize"
      :parent="true"
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

const onResize = (newX, newY, newWidth, newHeight) => {
  x.value = newX
  y.value = newY
  width.value = Math.max(minWidth, newWidth)
  height.value = Math.max(minHeight, newHeight)
}

const onDrag = (newX, newY) => {
  x.value = newX
  y.value = newY
}
</script>

<style lang="scss" scoped>
.draggable-container {
  width: 100%;
  height: 100%;

  overflow: hidden;

  background: #fff;
}
</style>
