<template>
  <div class="container about">
    <header class="about__header header">
      <div>
        <h1 class="header__title">Hi! I'm Rasul Arslanov</h1>
        <p class="header__subtitle">Frontend developer with 3+ years of experience</p>
      </div>
    </header>

    <div class="about__description description">
      <img
          @drag.once="onImgDrag"
          class="description__img" src="./assets/me.jpg"
          title="That's me!"
          alt=""
      >

      <div class="description__text">
        <p class="description__paragraph">
          Working&nbsp;&nbsp;<span>&#128187;</span>
        </p>
        <p class="description__paragraph">
          Writing articles <span>&#128214;</span>
        </p>
        <p class="description__paragraph">
          Creating projects & products <span>&#128200;</span>
        </p>
        <p class="description__paragraph">
          Always looking to collaborate on anything free and open source <span>	&#128156;</span> <br>
          Sometimes I create projects on
          <a href="https://github.com/Arslanoov" target="_blank">GitHub</a>
        </p>
      </div>

      <div class="description__clear" />
    </div>

    <section class="about__projects projects">
      <h3>Recent projects</h3>
      <template v-if="projects?.items && projects.items.length > 0">
        <ul v-for="project in projects.items" class="projects__list">
          <li class="item" :key="project.id">
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
        Nothing here &#128528;
      </template>
    </section>

    <section class="about__articles articles">
      <h3>Recent articles</h3>
      <template v-if="articles?.items && articles.items.length > 0">
        <ul v-for="article in articles.items" class="articles__list">
          <li class="item" :key="article.id">
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
        Nothing here &#128528;
      </template>
    </section>

    <footer class="about__footer footer">
      <div class="footer_info">
        This is a preview site.
        <a :href="siteUrl" class="footer__link" target="_blank">Click here</a> to see full website.
      </div>

      <ul class="footer__contact contacts">
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
      </ul>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 80%;

  margin: 5rem auto;
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

<script>
import { ref, onMounted } from 'vue'
import api from './api'

const siteUrl = import.meta.env.VITE_MAIN_SITE_BASE_URL

export default {
  setup()  {
    const projects = ref([])
    const articles = ref([])

    onMounted(async () => {
      const { data: projectsData } = await api.get('/api/content-items/latest?lang=en&type=Project');
      projects.value = projectsData

      const { data: articlesData } = await api.get('/api/content-items/latest?lang=en&type=Article');
      articles.value = articlesData
    })

    const onImgDrag = (e) => {
      e.preventDefault()
      alert('Don\'t drag me! :(')
    }

    return {
      projects,
      articles,
      siteUrl,
      onImgDrag,
    }
  }
}
</script>