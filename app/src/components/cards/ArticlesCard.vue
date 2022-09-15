<template>
  <draggable-card
    :initial-width="isMobile ? vw(70) : vw(28)"
    :initial-height="vh(23)"
    :initial-x="isMobile ? vw(2) : vw(65)"
    :initial-y="isMobile ? vh(70) : vh(12)"
    :min-width="50"
    :min-height="50"
  >
    <slot name="header">Articles</slot>

    <slot>
      <section class="articles">
        <h3>{{ t('articles.title') }}</h3>
        <template v-if="articles?.items && articles.items.length > 0">
          <ul class="articles__list">
            <li v-for="article in articles.items" class="item" :key="article.id">
              <a
                  :href="`${siteUrl}/${article.slug}`"
                  target="_blank"
                  class="item__link"
              >
                {{ article.title }}
                <img v-if="article.cover" :src="article.cover" class="item__cover" alt="">
              </a>
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
import { defineProps } from 'vue'

import { vw, vh } from '../../utils/sizes.js'
import { isMobile } from '../../utils/sizes.js'

import DraggableCard from './DraggableCard.vue'

const { t, articles, siteUrl } = defineProps({
  t: Function,
  siteUrl: String,
  articles: Object
})
</script>

<style lang="scss">
.articles {
  font-size: 1.8rem;
}

.item {
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

  &__description {
    color: rgba(#000, 0.5);
  }
}
</style>
