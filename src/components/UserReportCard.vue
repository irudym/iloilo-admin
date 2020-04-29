<template>
  <div class="row report-row">
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <button class="icon-button" @click="details">
            <icon name="listAlt" width="2rem" />
          </button>
        </div>
        <div class="col-3">
          <div class="table-cell">
            {{report.user}}
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

</style>
