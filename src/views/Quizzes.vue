<template>
  <div>
    <div class="quizzes row">
      <div class="col-lg-9">
          <p class="title">Тесты</p>
          <div class="row">
            <div class="col-lg-3">
              <add-button title="Создать" @click="add"/>
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
import { fetchQuizzes, deleteQuiz, activateQuiz } from '../lib/api';
import { serverUrl } from '../config/globals';

export default {
  name: 'Quizzes',
  components: {
    AddButton,
    QuizCard,
    ErrorMessage,
  },
  data() {
    return {
      quizzes: [],
      errorMessage: null,
    };
  },
  async mounted() {
    clearInterval(this.getTimeInterval);
    // console.log('Quizzes mounted');

    // send request to API server and download available quizzes
    try {
      const response = await fetchQuizzes({ url: serverUrl, token: this.getToken });
      this.quizzes = [...response.data];
    } catch (error) {
      console.log('Cannot load quizzes due to error: ', error.message);
      // TODO: show error
      this.errorMessage = error;
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
    ...mapGetters(['getToken', 'getTimeInterval']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

</style>
