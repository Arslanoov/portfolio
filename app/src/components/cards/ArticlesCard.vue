<template>
  <draggable-card
      :initial-width="300"
      :initial-height="200"
      :min-width="50"
      :min-height="50"
      :initial-x="200"
      :initial-y="300"
      style="border: 2px solid green"
  >
    <section class="about__articles articles">
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
        {{ t('articles.nothing') }} &#128528;
      </template>
    </section>
  </draggable-card>
</template>

<script setup>
import { toRefs, defineProps } from 'vue'

import DraggableCard from './DraggableCard.vue'

const props = defineProps({
  t: Function,
  siteUrl: String,
  articles: Array
})

const { t, articles } = toRefs(props)
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

<i18n>
{
  "en": {
    "articles": {
      "title": "Recent articles",
      "nothing": "Nothing here"
    }
  },
  "ru": {
    "articles": {
      "title": "Последние статьи",
      "nothing": "Здесь пусто"
    }
  }
}
</i18n>
