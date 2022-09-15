<template>
  <draggable-card
    :initial-width="vw(30)"
    :initial-height="vh(23)"
    :initial-x="vw(67)"
    :initial-y="vh(46)"
    :min-width="50"
    :min-height="50"
  >
    <section class="about__projects projects">
      <h3>{{ t('projects.title') }}</h3>
      <template v-if="projects?.items && projects.items.length > 0">
        <ul class="projects__list">
          <li v-for="project in projects.items" class="item" :key="project.id">
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
import { defineProps } from 'vue'

import { vw, vh } from '../../utils/sizes.js'

import DraggableCard from './DraggableCard.vue'

const { t, projects, siteUrl } = defineProps({
  t: Function,
  siteUrl: String,
  projects: Object
})
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
    color: rgba(#000, 0.5);
  }
}
</style>
