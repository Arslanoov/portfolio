<template>
  <draggable-card
    :title="t('articles.title')"
    :initial-width="isMobile ? vw(70) : vw(28)"
    :initial-height="vh(30)"
    :initial-x="isMobile ? vw(2) : vw(65)"
    :initial-y="isMobile ? vh(70) : vh(12)"
    :min-width="100"
    :min-height="100"
  >
    <slot>
      <section class="articles">
        <h3>{{ t('articles.title') }}</h3>
        <template v-if="contentStore.articles?.items && contentStore.articles.items.length > 0">
          <ul class="articles__list">
            <li v-for="article in contentStore.articles.items" class="item" :key="article.id">
              <div class="item__title" @click="onOpen(article.id, article.slug)">
                {{ article.title }}
                <img v-if="article.cover" :src="article.cover" class="item__cover" alt="">
              </div>
              <p v-if="article.description" class="item__description">
                {{ article.description }}
              </p>
            </li>
          </ul>
        </template>
        <template v-else>
          {{ t('articles.nothing') }}
        </template>
      </section>
    </slot>
  </draggable-card>
</template>

<script setup>
import { useContentStore } from '@/stores/contentStore.js'
import { useWindowsStore } from '@/stores/windowsStore.js'

import { CONTENT_ITEM_CARD } from '@/const/windows.js'

import { vw, vh } from '@/utils/sizes.js'
import { isMobile } from '@/utils/sizes.js'

import DraggableCard from './DraggableCard.vue'

const { t, lang } = defineProps({
  t: Function,
  lang: String
})

const contentStore = useContentStore()
const windowsStore = useWindowsStore()

contentStore.fetchArticles(lang)

const onOpen = (id, slug) => {
  contentStore.fetchData(id, slug)
  windowsStore.openCustomWindow(id, slug)
}
</script>

<style lang="scss">
.articles {
  font-size: 1.8rem;
}

.item {
  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }
  
  &__title {
    &:hover {
      cursor: pointer;
    }
  }

  &__link {
    display: flex;
    align-items: center;
  }

  &__cover {
    height: 3.5rem;

    margin-left: 1rem;
  }

  &__description {
    color: rgba($black, 0.5);
  }
}
</style>
