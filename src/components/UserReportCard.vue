<template>
  <div class="row report-card">
    <div class="col-12">
      <div class="row">
        <div class='col-12'>
          <div class="name">
            {{report.user}}
          </div>
            <p>
              Результат: {{report.score}}
            </p>
          <start-button :title="buttonTitle" @click="details" />
        </div>
      </div>

      <div v-show="showDetails" class="row">
        <div class="col-sm-12">
          <div class="row question-card" v-for="question in report.questions" :key="question.id">
            <div class="col-sm-12">
              <div class="question-text">
                {{question.text}}
                <div class="hint">
                  <p>
                    В этом вопросе всего ответов: {{question.answer_count}}
                  </p>
                  <p>
                    Из них правильных: {{question.correct_count}}
                  </p>
                </div>
              </div>
              <div class="row" v-for="answer in question.answers" :key="answer.id">
                <div class="col-12" :style="{'margin-top':'1rem'}">
                  <div class="mark">
                    <icon v-if="answer.correct" width="1rem" name="check" />
                    <icon v-else width="1rem" name="times" />
                  </div>
                  <div class='answer-text'>
                    {{answer.text}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StartButton from './StartButton.vue';
import Icon from './Icon.vue';

export default {
  name: 'UserReportCard',
  components: {
    StartButton,
    Icon,
  },
  props: {
    report: Object,
  },
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    details() {
      this.showDetails = !this.showDetails;
    },
  },
  computed: {
    buttonTitle() {
      return this.showDetails ? 'Скрыть детали' : 'Показать детали';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.report-card {
  margin-top: 2rem;
  border: 1px solid $form_border-colour;
  padding: 1rem;
  border-radius: 6px;
}

.name {
  font-size: 1.3rem;
}

.question-card {
  margin-top: 2.6rem;
  margin-bottom: 1rem;
}

.question-text {
  line-height: 1.5rem;
}

.mark {
  display: inline-flex;
  padding: 0 0.6rem;
  width: 2.4rem;
}

.answer-text {
  display: inline-flex;
}

.hint {
  line-height: 1rem;
  p {
    font-size: 0.8rem;
    color: $description-colour;
  }
}

</style>
