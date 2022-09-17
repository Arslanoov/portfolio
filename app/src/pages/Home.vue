<template>
  <div class="home">
    <img class="home__icon" src="@/assets/images/icon.svg" draggable="false" alt="">

    <Icons :t="t" />

    <template v-for="window in windows" :key="window.name">
      <component
          :is="window.component"
          :t="t"
          :lang="lang"
          :name="window.name"
      />
    </template>
    <BottomMenu :change-lang="changeLang" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_EN, LANGUAGE_RU } from '@/const/lang'

import { useWindowsStore } from '@/stores/windowsStore.js'
import { useContentStore } from '@/stores/contentStore.js'

import AboutCard from '@/components/cards/AboutCard.vue'
import ArticlesCard from '@/components/cards/ArticlesCard.vue'
import ProjectsCard from '@/components/cards/ProjectsCard.vue'
import BottomMenu from '@/components/blocks/BottomMenu.vue'
import Icons from '@/components/blocks/Icons.vue'

const siteUrl = import.meta.env.VITE_MAIN_SITE_BASE_URL

export default {
  components: {
    Icons,
    BottomMenu,
    AboutCard,
    ArticlesCard,
    ProjectsCard
  },
  setup() {
    const windowsStore = useWindowsStore()
    const contentStore = useContentStore()

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

    const id = route.query.id
    const slug = route.query.slug
    if (id && slug) {
      contentStore.fetchData(id, slug)
      windowsStore.openCustomWindow(id, slug)
    }

    return {
      windows: windowsStore.windows,
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

  overflow: hidden;

  user-select: none;

  background-color: $main-color;

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: 30rem;
    height: 30rem;
  }
}
</style>

<i18n>
{
  "en": {
    "about": "About",
    "About": "About",
    "Projects": "Projects",
    "Articles": "Articles",
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
    "about": "Обо мне",
    "About": "Обо мне",
    "Projects": "Проекты",
    "Articles": "Статьи",
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
