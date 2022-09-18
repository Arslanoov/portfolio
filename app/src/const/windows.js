import { shallowRef } from 'vue'
import AboutCard from '@/components/cards/AboutCard.vue'
import ProjectsCard from '@/components/cards/ProjectsCard.vue'
import ArticlesCard from '@/components/cards/ArticlesCard.vue'
import ContentItemCard from '@/components/cards/ContentItemCard.vue'

export const CONTENT_ITEM_CARD = 'CONTENT_ITEM_CARD'

export const ABOUT_WINDOW = {
  name: 'ABOUT',
  icon: 'about.svg',
  title: 'About',
  component: shallowRef(AboutCard),
  showDesktop: true,
}

export const PROJECTS_WINDOW = {
  name: 'PROJECTS',
  icon: 'projects.svg',
  title: 'Projects',
  component: shallowRef(ProjectsCard),
  showDesktop: true,
}

export const ARTICLES_WINDOW = {
  name: 'ARTICLES',
  icon: 'articles.svg',
  title: 'Articles',
  component: shallowRef(ArticlesCard),
  showDesktop: true,
}

export const CONTENT_WINDOW = (id, slug) => ({
  name: `${CONTENT_ITEM_CARD}::${id}::${slug}`,
  component: shallowRef(ContentItemCard),
  showDesktop: false,
})

export const DEFAULT_OPENED_WINDOWS = [
  ABOUT_WINDOW,
  PROJECTS_WINDOW,
  ARTICLES_WINDOW,
]

export const ALL_WINDOWS = [ABOUT_WINDOW, PROJECTS_WINDOW, ARTICLES_WINDOW]

export const DESKTOP_WINDOWS = ALL_WINDOWS.filter((item) => item.showDesktop)
