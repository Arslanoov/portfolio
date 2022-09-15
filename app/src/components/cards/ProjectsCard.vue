<template>
  <draggable-card
      :initial-width="300"
      :initial-height="200"
      :min-width="50"
      :min-height="50"
      :initial-x="400"
      :initial-y="300"
      style="border: 2px solid red"
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
        {{ t('projects.nothing') }} &#128528;
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
  projects: Array
})

const { t, projects } = toRefs(props)
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

<i18n>
{
  "en": {
    "projects": {
      "title": "Recent projects",
      "nothing": "Nothing here"
    }
  },
  "ru": {
    "projects": {
      "title": "Последние проекты",
      "nothing": "Здесь пусто"
    }
  }
}
</i18n>
