<template>
  <div>
    <div class="quizzes row">
      <page-header title="Тесты">
        <div class="row">
          <div class="col-lg-3">
            <add-button title="Создать" @click="add"/>
          </div>
        </div>
      </page-header>
    </div>
      <div class="row">
        <div class="col-lg-7">
          <error-message v-show="errorMessage" v-bind:message="errorMessage" />
        </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <quiz-card
          v-for="quiz in quizzes"
          :key="quiz.id"
          :quiz="quiz"
          @edit="edit(quiz.id)"
          @delete="remove(quiz.id)"
          @start="start(quiz.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import '../assets/bootstrap-grid.css';
import AddButton from '../components/AddButton.vue';
import QuizCard from '../components/QuizCard.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import PageHeader from '../components/PageHeader.vue';
import { fetchQuizzes, deleteQuiz, activateQuiz } from '../lib/api';
import { serverUrl } from '../config/globals';

export default {
  name: 'Quizzes',
  components: {
    AddButton,
    QuizCard,
    ErrorMessage,
    PageHeader,
  },
  data() {
    return {
      quizzes: [],
      errorMessage: null,
    };
  },
  async mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }
    // console.log('Quizzes mounted');

    // send request to API server and download available quizzes
    try {
      const response = await fetchQuizzes({ url: serverUrl, token: this.getToken });
      this.quizzes = [...response.data];
    } catch (error) {
      // console.log('[Quizzes.vue]=> Cannot load quizzes due to error: ', error);
      this.errorMessage = error;
      if (error.detail === 'Not enough or too many segments'
          || error.detail === 'Signature verification raised') {
        // console.log('[Quizzes.vue]=> re-route to login: ');
        this.$router.push('/admin/login');
      }
    }
  },
  methods: {
    add() {
      this.$router.push('/admin/quizzes/add');
    },
    edit(id) {
      this.$router.push(`/admin/quizzes/edit/${id}`);
    },
    async remove(id) {
      try {
        await deleteQuiz({ url: serverUrl, token: '', id });
      } catch (error) {
        this.errorMessage = error;
      }
      this.quizzes = this.quizzes.filter((quiz) => (quiz.id !== id));
    },
    async start(id) {
      try {
        const response = await activateQuiz({ url: serverUrl, token: this.getToken, id });
        this.$router.push(`/admin/active_quizzes/${response.data.id}`);
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
  computed: {
    ...mapGetters(['getToken', 'getTimeInterval', 'isLogged']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

</style>
