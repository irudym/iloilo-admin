<template>
  <div>
    <div class="activate_quizzes row">
      <page-header title="Отчеты" />
      <div class="col-lg-3" />
    </div>
    <div class="row">
      <div class="col-lg-7">
        <error-message v-show="errorMessage" v-bind:message="errorMessage" />
      </div>
    </div>
    <table-header :header="tableHeader" :style="{'margin-top': '6rem'}"/>
    <active-quiz-info-card
      v-for="quiz in reports"
      :key="quiz.id"
      :quiz="quiz"
      @click="report(quiz.id)"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ActiveQuizInfoCard from '../components/ActiveQuizInfoCard.vue';
import TableHeader from '../components/TableHeader.vue';
import PageHeader from '../components/PageHeader.vue';
import { fetchActiveQuizzes } from '../lib/api';
import { serverUrl } from '../config/globals';

const ErrorMessage = () => import('../components/ErrorMessage.vue');


export default {
  name: 'Reports',
  components: {
    ErrorMessage,
    TableHeader,
    ActiveQuizInfoCard,
    PageHeader,
  },
  data() {
    return {
      errorMessage: null,
      tableHeader: [
        {
          text: 'Статус',
          size: 'col-2',
        },
        {
          text: 'PIN',
          size: 'col-2',
        },
        {
          text: 'Название теста',
          size: 'col-5',
        },
        {
          text: 'Время завершения',
          size: 'col-3',
        },
      ],
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
      this.loadReports(response.data);
    } catch (error) {
      this.errorMessage = error;
      if (error.detail === 'Not enough or too many segments') {
        this.$router.push('/admin/login');
      }
    }
  },
  methods: {
    ...mapActions(['loadReports']),
    report(id) {
      this.$router.push(`/admin/reports/${id}`);
    },
  },
  computed: {
    ...mapGetters(['getTimeInterval', 'isLogged', 'getToken']),
    ...mapState(['reports']),
  },
};
</script>

<style lang="scss" scoped>

</style>
