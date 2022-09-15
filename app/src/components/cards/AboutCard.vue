<template>
  <draggable-card
      :initial-width="300"
      :initial-height="200"
      :min-width="50"
      :min-height="50"
      :initial-x="200"
      :initial-y="300"
      style="border: 2px solid blue"
  >
    <header class="about__header header">
      <div>
        <h1 class="header__title">{{ t('header.title') }}</h1>
        <p class="header__subtitle">{{ t('header.subtitle') }}</p>
      </div>
    </header>

    <div class="description">
      <img
          @drag.once="onImgDrag"
          :title="t('description.coverTitle')"
          class="description__img" src="../../assets/me.jpg"
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

    <footer class="about__footer footer">
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
    </footer>
  </draggable-card>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

import DraggableCard from './DraggableCard.vue'

const props = defineProps({
  t: Function
})

const { t } = toRefs(props)

const onImgDrag = (e) => {
  e.preventDefault()
  alert('Don\'t drag me! :(')
}
</script>

<style lang="scss" scoped>
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
