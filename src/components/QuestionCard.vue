<template>
  <div class="question-card">
    <div class="tool-box">
      <div class="tool-button" @click="$emit('edit')">
        <icon name="edit" />
      </div>
      <trash-button @click="$emit('delete')" />
    </div>
    <div class="type-line"/>
    <div class="main">
      <h1>
        {{question.text}}
      </h1>
      <p v-for="answer in question.answers" :key="answer.text">
        <checkbox v-model="answer.correct" disabled>
          {{answer.text}}
        </checkbox>
      </p>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import Checkbox from './Checkbox.vue';
import TrashButton from './TrashButton.vue';

export default {
  name: 'QuestionCard',
  components: {
    Icon,
    Checkbox,
    TrashButton,
  },
  props: {
    question: {
      type: Object,
      default() {
        return {
          text: '',
          createdAt: '',
          answers: [],
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.question-card {
  border: none;
  border-radius: 6px;
  margin: 1rem 8px;
  background: $question_card-colour;
  padding: 0.6rem;

  h1 {
    font-family: Roboto;
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.5rem;
  }

  p {
    margin-left: 2rem;
  }
}

.tool-box {
  position: absolute;
  width: 6.6rem;
  left: 0;
  padding-left: 4.2rem;
  height: 100%;

  .tool-button {
    width: 1.7rem;
    height: 1.7rem;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .trash-button {
    position: absolute;
    bottom: 3.5rem;
  }
}

.main {
  margin-left: 5rem;
}

.type-line {
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    left: 6.7rem;
    width: 2px;
    background: #FFFFFF;
    z-index: 2;
    padding: 1px;
    border-radius: 5px;
}
</style>
