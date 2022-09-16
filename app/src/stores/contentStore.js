import { ref } from 'vue'
import { defineStore } from 'pinia'

import api from '@/api';

import { ARTICLE_CONTENT_TYPE, PROJECT_CONTENT_TYPE } from '@/const/contentType.js'
import { FETCH_CONTENT } from '@/const/api.js'

export const useContentStore = defineStore('content', () => {
  const articles = ref([])
  const projects = ref([])

  const fetchProjects = async (lang) => {
    const { data: projectsData } = await api.get(FETCH_CONTENT, {
      params: {
        lang,
        type: PROJECT_CONTENT_TYPE
      }
    });
    projects.value = projectsData
  }

  const fetchArticles = async (lang) => {
    const { data: articlesData } = await api.get(FETCH_CONTENT, {
      params: {
        lang,
        type: ARTICLE_CONTENT_TYPE
      }
    });
    articles.value = articlesData
  }

  return {
    articles,
    projects,
    fetchArticles,
    fetchProjects
  }
})
