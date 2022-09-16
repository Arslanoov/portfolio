<template>
  <draggable-card
    :title="t('projects.title')"
    :initial-width="isMobile ? vw(80) : vw(30)"
    :initial-height="vh(28)"
    :initial-x="isMobile ? vw(15) : vw(67)"
    :initial-y="isMobile ? vh(55) : vh(46)"
    :min-width="100"
    :min-height="100"
  >
    <section class="projects">
      <template v-if="contentStore.projects?.items && contentStore.projects.items.length > 0">
        <ul class="projects__list">
          <li v-for="project in contentStore.projects.items" class="item" :key="project.id">
            <div class="item__title" @click="onOpen(project.id, project.slug)">
              {{ project.title }}
              <img v-if="project.cover" :src="project.cover" class="item__cover" alt="">
            </div>
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
import { useWindowsStore } from '@/stores/windowsStore.js'

import { vw, vh } from '@/utils/sizes.js'
import { isMobile } from '@/utils/sizes.js'

import { CONTENT_ITEM_CARD } from '@/const/windows.js'

import DraggableCard from './DraggableCard.vue'

const { t, lang } = defineProps({
  t: Function,
  lang: String
})

const contentStore = useContentStore()
const windowsStore = useWindowsStore()

contentStore.fetchProjects(lang)

const onOpen = (id, slug) => {
  contentStore.fetchData(id, slug)
  windowsStore.openCustomWindow(id, slug)
}
</script>

<style lang="scss" scoped>
.projects {
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
