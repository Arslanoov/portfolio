import { shallowRef } from 'vue'
import AboutCard from '@/components/cards/AboutCard.vue'
import ProjectsCard from '@/components/cards/ProjectsCard.vue'
import ArticlesCard from '@/components/cards/ArticlesCard.vue'

export const ABOUT_WINDOW = {
  name: 'ABOUT',
  title: 'About',
  component: shallowRef(AboutCard)
}

export const PROJECTS_WINDOW = {
  name: 'PROJECTS',
  title: 'Projects',
  component: shallowRef(ProjectsCard)
}

export const ARTICLES_WINDOW = {
  name: 'ARTICLES',
  title: 'Articles',
  component: shallowRef(ArticlesCard)
}

export const DEFAULT_OPENED_WINDOWS = [ABOUT_WINDOW, PROJECTS_WINDOW, ARTICLES_WINDOW]
