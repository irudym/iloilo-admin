<template>
  <div>
    <div class="activate_quizzes row">
      <div class="col-lg-9">
          <p class="title">Отчеты по тесту {{pin}}</p>
          <div class="row">
            <div class="col-lg-3">
              <ok-button title="<< Назад" @click="back"/>
            </div>
          </div>
      </div>
      <div class="col-lg-3" />
    </div>
    <div class="row">
      <div class="col-lg-7">
        <error-message v-show="errorMessage" v-bind:message="errorMessage" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="quiz-info">
          <h4>{{title}}</h4>
          {{endDate}}
        </div>
        <user-report-card v-for="report in reports" :key="report.user_id" :report="report" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorMessage from '../components/ErrorMessage.vue';
import { fetchReport, fetchActiveQuiz } from '../lib/api';
import { serverUrl } from '../config/globals';
import UserReportCard from '../components/UserReportCard.vue';
import OkButton from '../components/OkButton.vue';

export default {
  name: 'QuizReport',
  components: {
    ErrorMessage,
    UserReportCard,
    OkButton,
  },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      errorMessage: null,
      reports: [],
      pin: '',
      title: '',
      endedAt: '',
      started: false,
      isValid: false,
    };
  },
  async mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }

    try {
      const activeQuiz = await fetchActiveQuiz({
        url: serverUrl,
        token: this.getToken,
        id: this.id,
      });
      this.pin = activeQuiz.data.attributes.pin;
      this.title = activeQuiz.data.attributes.title;
      this.started = activeQuiz.data.attributes.started;
      this.endedAt = activeQuiz.data.attributes.ended_at;
      this.isValid = activeQuiz.data.attributes.is_valid;

      const response = await fetchReport({ url: serverUrl, token: this.getToken, id: this.id });
      this.reports = response.data.attributes;
    } catch (error) {
      this.errorMessage = error;
      if (error.detail === 'Not enough or too many segments') {
        this.$router.push('/admin/login');
      }
    }
  },
  methods: {
    back() {
      this.$router.push('/admin/reports');
    },
  },
  computed: {
    ...mapGetters(['getTimeInterval', 'isLogged', 'getToken']),
    endDate() {
      if (this.isValid) {
        return 'Тестирование в процессе...';
      }
      if (this.endedAt) {
        const date = new Date(this.endedAt);
        return `Тестирование закончилось ${date.getHours()}:${date.getMinutes()} / ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      }
      return '...';
    },
  },
};
</script>

<style lang="scss" scoped>

h4 {
  font-size: 1.5rem;
  font-family: Oswald;
}

</style>
