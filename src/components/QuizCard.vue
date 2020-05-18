<template>
  <div class="row quizzes" :style="quizzesClass">
    <div class="col-sm-7">
      <div class="tool-panel" >
        <icon name="edit" class="tool-button" @click="$emit('edit')" />
        <icon name="play" class="tool-button play-button" @click="$emit('start')" />
        <trash-button @click="remove" />
      </div>
      <div class="type-line" />
      <div class="main">
        <h1>{{quiz.attributes.title}}</h1>
        <div class="timestamp">
          Дата создания {{createdDate}}
        </div>
        <div class="description">{{quiz.attributes.description}}</div>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="info-panel">
        <p>
          В тесте {{amountOfQuestions}}
        </p>
        <p>
          Продолжительность теста {{duration}}
        <p>
          Редактировался в последний раз {{updatedDate}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import TrashButton from './TrashButton.vue';
import { createCountFormatter, dateFormatter } from '../lib/utils';

export default {
  name: 'QuizCard',
  components: {
    Icon,
    TrashButton,
  },
  props: {
    quiz: Object,
  },
  data() {
    return {
      quizzesClass: {},
      hiddenContent: {},
    };
  },
  methods: {
    remove() {
      // eslint-disable-next-line quote-props
      this.quizzesClass = {
        'max-height': '0px',
        opacity: 0,
      };
      this.hiddenContent = { display: 'none' };
      setTimeout(() => (this.$emit('delete')), 250);
    },
  },
  computed: {
    createdDate() {
      const date = new Date(this.quiz.attributes.created_at);
      return dateFormatter(date);
    },
    amountOfQuestions() {
      const string = createCountFormatter({
        one: 'вопрос',
        two: 'вопроса',
        few: 'вопросов',
      })(this.quiz.relationships.questions.data.length);
      return `${this.quiz.relationships.questions.data.length} ${string}`;
    },
    updatedDate() {
      const date = new Date(this.quiz.attributes.updated_at);
      return dateFormatter(date);
    },
    duration() {
      const string = createCountFormatter({
        one: 'минута',
        two: 'минуты',
        few: 'минут',
      })(this.quiz.attributes.duration);
      return `${this.quiz.attributes.duration} ${string}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.quizzes {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
  max-height: 500px;
  height: auto;
  overflow: hidden;
  margin-top: 3rem;

  .tool-panel {
    width: 4.2rem;
    position: absolute;
    top: 0;
    padding: 1rem;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    transition-timing-function: ease-in-out;

    .tool-button {
      width: 1.7rem;
      height: 1.7rem;
      margin: 0;
      padding: 0;
      cursor: pointer;
    }

    .play-button {
      margin-top: 10px;
      margin-left: -2px;
    }
  }
}

@media (pointer:none), (pointer:coarse) {
  .quizzes {
    .tool-panel {
      opacity: 1;
    }
  }
}

.main {
  margin-left: 5rem;
  min-height: 10rem;

  h1 {
    font-family: Oswald;
  }

  .description {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: $description-colour;
    overflow-x: hidden;
  }
}

.quizzes:hover {
  .tool-panel {
    opacity: 1;
  }
}

.type-line {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 4.7rem;
    width: 2px;
    background: $sign_box-colour;
    z-index: 2;
    padding: 1px;
    border-radius: 5px;
}

.timestamp {
  margin-top: -0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: $description-colour;
}

.info-panel {
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  color: $description-colour;
  overflow-x: hidden;
  padding-top: 0.67rem;
}

</style>
