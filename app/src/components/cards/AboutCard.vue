<template>
  <draggable-card
    :title="t('about')"
    :initial-width="isMobile ? vw(90) : vw(56)"
    :initial-height="vh(65)"
    :initial-x="isMobile ? vw(2) : vw(8)"
    :initial-y="isMobile ? vh(2) : vh(8)"
    :min-width="200"
    :min-height="150"
  >
    <header class="header">
      <div>
        <h1 class="header__title">{{ t('header.title') }}</h1>
        <p class="header__subtitle">{{ t('header.subtitle') }}</p>
      </div>
    </header>

    <div class="description">
      <div class="description__text">
        <p class="description__paragraph">
          {{ t('description.paragraph1') }}&nbsp;&nbsp;
          <img class="description__icon" src="@/assets/images/monitor.svg" alt="">
        </p>
        <p class="description__paragraph">
          {{ t('description.paragraph2') }}&nbsp;&nbsp;
          <img class="description__icon" src="@/assets/images/coffee-cup.svg" alt="">
        </p>
        <p class="description__paragraph">
          {{ t('description.paragraph3') }}&nbsp;&nbsp;
          <img class="description__icon" src="@/assets/images/presentation.svg" alt="">
        </p>
        <p class="description__paragraph description__paragraph_collapsed">
          {{ t('description.paragraph4Part1') }}&nbsp;&nbsp;
          <img class="description__icon" src="@/assets/images/demiboy.svg" alt="">
        </p>
        <p class="description__paragraph">
          {{ t('description.paragraph4Part2') }} &nbsp;
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
import { defineProps } from 'vue'

import { vw, vh } from '@/utils/sizes.js'
import { isMobile } from '@/utils/sizes.js'

import DraggableCard from './DraggableCard.vue'

const { t } = defineProps({
  t: Function
})
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

    float: left;
  }

  &__icon {
    width: 3rem;

    margin-left: 0.5rem;
  }

  &__paragraph {
    display: flex;
    align-items: flex-end;

    font-size: 1.7rem;

    &_collapsed {
      margin-bottom: 0;
    }

    &:first-of-type .description__icon {
      width: 2.5rem;
    }

    &:nth-of-type(3) .description__icon {
      width: 3.5rem;
    }

    &:not(:last-of-type) {
      margin-bottom: 0.7rem;
    }
  }

  &__clear {
    clear: both;
  }
}

.footer {
  padding-top: 1rem;

  border-top: .1rem solid rgba($black, 0.1);

  font-size: 1.7rem;
}

.contacts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin: 1rem 0 0;
  padding: 0;

  list-style: none;

  &__item {
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}
</style>
