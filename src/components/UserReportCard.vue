<template>
  <div class="row report-row">
    <div class="col-12">
      <div class="row user-row" @click.prevent.stop="details">
        <div class="col-2">
          <button class="icon-button">
            <icon name="listAlt" width="2rem" />
          </button>
        </div>
        <div class="col-3">
          <div class="table-cell">
            <div class="circle" :style="userScoreStyle"/>{{report.user}}
          </div>
        </div>
        <div class="col-3">
          <div class="table-cell">
            {{report.score}} баллов
          </div>
        </div>
      </div>
      <div v-show="showDetails">
        <user-report-question-card
          v-for="(question, index) in report.userQuestions"
          :question="question"
          :index="index"
          :key="question.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import UserReportQuestionCard from './UserReportQuestionCard.vue';

export default {
  name: 'UserReportCard',
  components: {
    Icon,
    UserReportQuestionCard,
  },
  props: {
    report: Object,
    questions: Array,
    maxScore: {
      type: Number,
      default: () => (100),
    },
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
    userScoreStyle() {
      let color = '#FFCDC1';
      if (this.report.score > this.maxScore / 3) {
        color = '#F7EAAF';
      }
      if (this.report.score > (this.maxScore * 2) / 3) {
        color = '#B3EBA5';
      }
      return {
        background: color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.report-row {
  margin: 2rem 0;
}

.icon-button {
  border: none;
  background: transparent;
  outline: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  // width: 2rem;
  min-width: 0;
}

.table-cell {
  position: absolute;
  top: 25%;
}

.user-row {
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  padding: 0.2rem 0;
}

.user-row:hover {
  background: $sign_box-colour;
}

.circle {
  border-radius: 50%;
  width: 0.7rem;
  height: 0.7rem;
  background: transparent;
  display: inline-block;
  margin-right: 0.5rem;
}

</style>
