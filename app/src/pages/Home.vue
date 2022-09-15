<template>
  <div class="home">
    <AboutCard :t="t" name="about" />
    <ArticlesCard :t="t" :site-url="siteUrl" :articles="articles" name="articles" />
    <ProjectsCard :t="t" :site-url="siteUrl" :projects="projects" name="projects" />
    <BottomMenu :change-lang="changeLang" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import api from '../api'

import { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_EN, LANGUAGE_RU } from '../const/lang'
import { ARTICLE_CONTENT_TYPE, PROJECT_CONTENT_TYPE } from '../const/contentType.js'

import AboutCard from '../components/cards/AboutCard.vue'
import ArticlesCard from '../components/cards/ArticlesCard.vue'
import ProjectsCard from '../components/cards/ProjectsCard.vue'
import BottomMenu from "../components/blocks/BottomMenu.vue";

const siteUrl = import.meta.env.VITE_MAIN_SITE_BASE_URL

export default {
  components: {
    BottomMenu,
    AboutCard,
    ArticlesCard,
    ProjectsCard
  },
  setup() {
    const projects = ref([])
    const articles = ref([])
    const route = useRoute()

    let lang = route.params.lang
    if (!lang ||!LANGUAGES.includes(lang)) {
      lang = DEFAULT_LANGUAGE
    }

    let { t, locale } = useI18n({
      locale: lang,
      inheritLocale: true
    })
    locale.value = lang

    onMounted(async () => {
      const { data: projectsData } = await api.get('/api/content-items/latest', {
        params: {
          lang,
          type: PROJECT_CONTENT_TYPE
        }
      });
      projects.value = projectsData

      const { data: articlesData } = await api.get('/api/content-items/latest', {
        params: {
          lang,
          type: ARTICLE_CONTENT_TYPE
        }
      });
      articles.value = articlesData
    })

    return {
      projects,
      articles,
      lang,
      changeLang: lang === LANGUAGE_RU ? LANGUAGE_EN : LANGUAGE_RU,
      siteUrl: `${siteUrl}/${locale.value}`,
      t,
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;

  overflow: scroll;

  background: url("../assets/background.jpg") no-repeat #fff center center;
  background-size: cover;
}
</style>

<i18n>
{
  "en": {
    "header": {
      "title": "Hi! I'm Rasul Arslanov",
      "subtitle": "Frontend developer with 3+ years of experience"
    },
    "description": {
      "coverTitle": "That's me!",
      "paragraph1": "Working",
      "paragraph2": "Writing articles",
      "paragraph3": "Creating projects & products",
      "paragraph4Part1": "Always looking to collaborate on anything free and open source",
      "paragraph4Part2": "Sometimes I create projects on"
    },
    "projects": {
      "title": "Recent projects",
      "nothing": "Nothing here"
    },
    "articles": {
      "title": "Recent articles",
      "nothing": "Nothing here"
    },
    "footer": {
      "preview": "This is a preview site.",
      "visitFullClick": "Click here",
      "visitFull": "to see the full website"
    }
  },
  "ru": {
    "header": {
      "title": "Привет! Я Расуль Арсланов",
      "subtitle": "Фронтенд разработчик с 3+ годами опыта"
    },
    "description": {
      "coverTitle": "Это я!",
      "paragraph1": "Работаю",
      "paragraph2": "Пишу статьи",
      "paragraph3": "Создаю проекты & продукты",
      "paragraph4Part1": "Рад поучаствовать в OpenSource",
      "paragraph4Part2": "Иногда работаю над своими проектами на"
    },
    "projects": {
      "title": "Последние проекты",
      "nothing": "Здесь пусто"
    },
    "articles": {
      "title": "Последние статьи",
      "nothing": "Здесь пусто"
    },
    "footer": {
      "preview": "Это сайт-превью.",
      "visitFullClick": "Нажми сюда",
      "visitFull": "чтобы перейти на полную версию сайта"
    }
  }
}
</i18n>
