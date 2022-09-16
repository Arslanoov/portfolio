<template>
  <draggable-card
    title="Projects"
    :initial-width="isMobile ? vw(80) : vw(30)"
    :initial-height="vh(23)"
    :initial-x="isMobile ? vw(15) : vw(67)"
    :initial-y="isMobile ? vh(55) : vh(46)"
    :min-width="100"
    :min-height="100"
  >
    <section class="projects">
      <h3>{{ t('projects.title') }}</h3>
      <template v-if="store.projects?.items && store.projects.items.length > 0">
        <ul class="projects__list">
          <li v-for="project in store.projects.items" class="item" :key="project.id">
            <a
                :href="`${siteUrl}/${project.slug}`"
                target="_blank"
                class="item__link"
            >
              {{ project.title }}
              <img v-if="project.cover" :src="project.cover" class="item__cover" alt="">
            </a>
            <p v-if="project.description" class="item__description">
              {{ project.description }}
            </p>
          </li>
        </ul>
      </template>
      <template v-else>
        {{ t('projects.nothing') }}
      </template>
    </section>
  </draggable-card>
</template>

<script setup>
import { useContentStore } from '@/stores/contentStore.js'

import { vw, vh } from '@/utils/sizes.js'
import { isMobile } from '@/utils/sizes.js'

import DraggableCard from './DraggableCard.vue'

const { t, lang, siteUrl } = defineProps({
  t: Function,
  lang: String,
  siteUrl: String
})

const store = useContentStore()

store.fetchProjects(lang)
</script>

<style lang="scss" scoped>
.projects {
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
    color: rgba($black, 0.5);
  }
}
</style>
