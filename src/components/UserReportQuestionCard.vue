<template>
  <div class="row questions" :style="questionStyle">
    <div class="col-2">
      <div class='question-icon'>
        <icon v-if="question.deleted" name="ban" width="2rem" />
        <icon v-else-if="question.correct" name="check" width="2rem" />
        <icon v-else name="times" width="2rem" />
      </div>
    </div>
    <div class="col-10">
      <div class="question-title">
        Вопрос {{index+1}}
        <span v-if="question.deleted" class="deleted">
          был удалён!
        </span>
      </div>
      <div class="question">
        {{question.text}}
      </div>
      <div class="answers">
        <div v-for="answer in question.answers" :key="answer.id">
          <div class="user-answer-icon">
            <icon v-if="answer.userAnswer=='right'" name="check" width="1rem" />
            <icon v-if="answer.userAnswer=='wrong'" name="times" width="1rem" />
          </div>
          <checkbox
            :value="answer.correct"
            :disabled="true"
            :style="{'margin-left':'1.5rem'}"
          >
            {{answer.text}}
          </checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import Checkbox from './Checkbox.vue';

export default {
  name: 'UserReportQuestionCard',
  components: {
    Icon,
    Checkbox,
  },
  props: {
    question: Object,
    index: Number,
  },
  computed: {
    questionStyle() {
      return {
        background: this.question.correct ? '#FCFFF8' : '#FFF8F8',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.questions {
  margin-top: 2rem;
  border-radius: 6px;
}

.question-title {
  font-family: Roboto;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 1rem 0;
}

.question {
  margin-top: 0.5rem;
  color: $description-colour;
}

.answers {
  margin-top: 2rem;
}

.user-answer-icon {
  position: absolute;
}

.question-icon {
  margin-top: 1.5rem;
}

.deleted {
  color: $warning-colour;
}

</style>
