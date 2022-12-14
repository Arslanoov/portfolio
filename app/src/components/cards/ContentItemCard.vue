<template>
  <draggable-card
    :name="name"
    :title="currentItem?.data?.title ?? ''"
    :initial-width="isMobile ? vw(85) : vw(60)"
    :initial-height="vh(55)"
    :initial-x="isMobile ? vw(2) : vw(11)"
    :initial-y="isMobile ? vh(15) : vh(12)"
    :min-width="200"
    :min-height="150"
  >
    <slot>
      <template v-if="currentItem?.success">
        <section v-if="currentItem.data" class="content-item">
          <p
            v-if="currentItem.data.description.trim('').length > 0"
            class="content-item__description"
          >
            {{ currentItem.data.description }}
          </p>

          <div
            class="content-item__content"
            v-html="currentItem.data.rawContent"
          />
        </section>
      </template>
      <template v-else-if="currentItem?.error">
        <div class="content-item__text">{{ t('fetchError') }}</div>
      </template>
      <div v-else class="content-item__text">{{ t('fetching') }}...</div>
    </slot>
  </draggable-card>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/contentStore.js'

import { vw, vh } from '@/utils/sizes.js'
import { isMobile } from '@/utils/sizes.js'

import DraggableCard from './DraggableCard.vue'

const { t, name } = defineProps({
  t: Function,
  name: String,
})

const store = useContentStore()

const id = name.split('::')[1]

const currentItem = computed(() => store.fetchedItems[id])
</script>

<style lang="scss">
.content-item {
  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  &__link {
    display: flex;
    align-items: center;
  }

  &__cover {
    height: 3.5rem;

    margin-left: 1rem;
  }

  &__description,
  &__content {
    color: $black;

    font-size: 1.6rem;
  }

  &__description {
    padding-bottom: 1rem;

    border-bottom: 1px dotted $black;
  }

  &__content {
    padding-top: 1rem;

    ul,
    ol {
      margin: 0 0 1.5rem 3rem;
      padding: 0;
    }

    h1,
    h2,
    h3,
    h4 {
      margin-top: 2rem;
    }

    p {
      margin-bottom: 0.5rem;
    }
  }
}
</style>

<style lang="scss" scoped>
.articles {
  font-size: 1.8rem;
}

.content-item__text {
  font-size: 2rem;
}
</style>
