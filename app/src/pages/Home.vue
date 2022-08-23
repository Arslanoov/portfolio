<template>
  <div class="container about">
    <header class="about__header header">
      <div>
        <h1 class="header__title">{{ t('header.title') }}</h1>
        <p class="header__subtitle">{{ t('header.subtitle') }}</p>
      </div>
    </header>

    <div class="about__description description">
      <img
          @drag.once="onImgDrag"
          :title="t('description.coverTitle')"
          class="description__img" src="../assets/me.jpg"
          title="That's me!"
          alt=""
      >

      <div class="description__text">
        <p class="description__paragraph">
          {{ t('description.paragraph1') }}&nbsp;&nbsp;<span>&#128187;</span>
        </p>
        <p class="description__paragraph">
          {{ t('description.paragraph2') }} <span>&#128214;</span>
        </p>
        <p class="description__paragraph">
          {{ t('description.paragraph3') }} <span>&#128200;</span>
        </p>
        <p class="description__paragraph">
          {{ t('description.paragraph4Part1') }} <span>	&#128156;</span> <br>
          {{ t('description.paragraph4Part2') }}
          <a href="https://github.com/Arslanoov" target="_blank">GitHub</a>
        </p>
      </div>

      <div class="description__clear" />
    </div>

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

    <footer class="about__footer footer">
      <ul class="footer__contact contacts">
        <li class="contacts__item">
          <a :href="`/${changeLang}`" class="contacts__item-link">
            {{ lang.toUpperCase() }} -> {{ changeLang.toUpperCase() }}
          </a>
        </li>
        <li class="contacts__item">
          <a href="https://www.linkedin.com/in/arslanoov/" target="_blank" class="contacts__item-link">
            Linkedin
          </a>
        </li>
        <li class="contacts__item">
          <a href="https://github.com/Arslanoov" target="_blank" class="contacts__item-link">
            GitHub
          </a>
        </li>
        <li class="contacts__item">
          <a href="https://habr.com/ru/users/Arslanoov/" target="_blank" class="contacts__item-link">
            Habr
          </a>
        </li>
        <li class="contacts__item">
          <a href="https://vc.ru/u/979383-rasul-arslanov" target="_blank" class="contacts__item-link">
            VC
          </a>
        </li>
        <li class="contacts__item">
          <a href="mailto:rasularslanoov@gmail.com" class="contacts__item-link">
            rasularslanoov@gmail.com
          </a>
        </li>
      </ul>

      <div class="footer__info">
        {{ t('footer.preview') }}
        <a :href="siteUrl" class="footer__link" target="_blank">
          {{ t('footer.visitFullClick') }}
        </a> {{ t('footer.visitFull') }}.
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import api from '../api'

import { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_EN, LANGUAGE_RU } from '../const/lang'

const siteUrl = import.meta.env.VITE_MAIN_SITE_BASE_URL

export default {
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
          type: 'Project'
        }
      });
      projects.value = projectsData

      const { data: articlesData } = await api.get('/api/content-items/latest', {
        params: {
          lang,
          type: 'Article'
        }
      });
      articles.value = articlesData
    })

    const onImgDrag = (e) => {
      e.preventDefault()
      alert('Don\'t drag me! :(')
    }

    return {
      projects,
      articles,
      lang,
      changeLang: lang === LANGUAGE_RU ? LANGUAGE_EN : LANGUAGE_RU,
      siteUrl: `${siteUrl}/${locale.value}`,
      onImgDrag,
      t,
    }
  }
}
</script>

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

<style lang="scss" scoped>
.container {
  width: 80%;

  margin: 5rem auto;

  @media screen and (max-width: 768px) {
    margin: 2rem auto;
  }
}

.header {
  &__title {
    font-size: 4.5rem;

    line-height: 1.2;
  }

  &__subtitle {
    font-size: 3rem;

    line-height: 1;
  }
}

.description {
  margin: 3rem 0;

  &__img {
    width: 15rem;
    height: 15rem;

    margin-right: 2rem;
    margin-bottom: 2rem;

    user-select: none;

    float: left;
  }

  &__paragraph {
    font-size: 1.7rem;

    &:not(:last-of-type) {
      margin-bottom: 0.7rem;
    }

    span {
      font-size: 2rem;
    }
  }

  &__clear {
    clear: both;
  }
}

.projects,
.articles {
  font-size: 1.8rem;
}

.articles {
  margin-bottom: 2rem;
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

.footer {
  padding-top: 1rem;

  border-top: .1rem solid rgba(#000, 0.1);

  font-size: 1.7rem;
}

.contacts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-top: 1rem;
  padding: 0;

  list-style: none;

  &__item {
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}
</style>
