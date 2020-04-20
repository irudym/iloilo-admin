<template>
  <div>
    <div class="activate_quizzes row">
      <div class="col-lg-9">
          <p class="title">Отчеты</p>
          <div class="row">
            <div class="col-lg-3">
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
      <div class="col-lg-12">
        <active-quiz-info-card
          v-for="quiz in activeQuizzes"
          :key="quiz.id"
          :quiz="quiz"
          @click="report(quiz.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorMessage from '../components/ErrorMessage.vue';
import ActiveQuizInfoCard from '../components/ActiveQuizInfoCard.vue';
import { fetchActiveQuizzes } from '../lib/api';
import { serverUrl } from '../config/globals';

export default {
  name: 'Reports',
  components: {
    ErrorMessage,
    ActiveQuizInfoCard,
  },
  data() {
    return {
      errorMessage: null,
      activeQuizzes: [],
    };
  },
  async mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }

    try {
      const response = await fetchActiveQuizzes({ url: serverUrl, token: this.getToken });
      this.activeQuizzes = response.data;
    } catch (error) {
      this.errorMessage = error;
      if (error.detail === 'Not enough or too many segments') {
        this.$router.push('/admin/login');
      }
    }
  },
  methods: {
    report(id) {
      this.$router.push(`/admin/reports/${id}`);
    },
  },
  computed: {
    ...mapGetters(['getTimeInterval', 'isLogged', 'getToken']),
  },
};
</script>

<style lang="scss" scoped>

</style>
