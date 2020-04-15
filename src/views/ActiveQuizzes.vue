<template>
  <div>
    <div class="activate_quizzes row">
      <div class="col-lg-9">
          <p class="title">Текущие тестирования</p>
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
      <div class="col-lg-12">
        <active-quiz-card
          v-for="quiz in activeQuizzes"
          :key="quiz.id"
          :quiz="quiz"
          @edit="edit(quiz.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OkButton from '../components/OkButton.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import ActiveQuizCard from '../components/ActiveQuizCard.vue';
import { fetchActiveQuizzes } from '../lib/api';
import { serverUrl } from '../config/globals';

export default {
  name: 'ActiveQuizzes',
  components: {
    OkButton,
    ErrorMessage,
    ActiveQuizCard,
  },
  data() {
    return {
      errorMessage: null,
      activeQuizzes: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    edit(id) {
      this.$router.push(`/admin/active_quizzes/${id}`);
    },
  },
  async mounted() {
    clearInterval(this.getTimeInterval);
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
  computed: {
    ...mapGetters(['getToken', 'getTimeInterval']),
  },
};
</script>

<style lang="scss" scoped>

</style>
