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
      <div class="col-lg-12">
        <div class="quiz-info">
          <h4>{{title}}</h4>
          <div class="description">
            {{description}}
          </div>
        </div>
      </div>
    </div>
    <div class="row signs">
      <div class="col-md-4">
        <sign icon="users" text="человек прошло тест" :value="amountOfUsers" colour="#0990B3" />
      </div>
      <div class="col-md-4">
        <sign icon="clockAlt" text="завершилось тестирование" :value="endDate" colour="#E8C41C" />
      </div>
      <div class="col-md-4">
        <sign icon="listAlt" text="вопросов в тесте" :value="amountOfQuestions" colour="#FF005A" />
      </div>
    </div>
    <div class="row table-header">
      <div class="col-2">
        Детали
      </div>
      <div class="col-3">
        Имя
      </div>
      <div class="col-3">
        Оценка
      </div>
    </div>
    <user-report-card
      v-for="report in reports"
      :report="report"
      :key="report.user_id"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorMessage from '../components/ErrorMessage.vue';
import UserReportCard from '../components/UserReportCard.vue';
import OkButton from '../components/OkButton.vue';
import Sign from '../components/Sign.vue';
import { fetchReport, fetchActiveQuiz, fetchQuiz } from '../lib/api';
import { deSerializeQuiz } from '../lib/serializer';
import { serverUrl } from '../config/globals';


export default {
  name: 'QuizReport',
  components: {
    ErrorMessage,
    UserReportCard,
    OkButton,
    Sign,
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
      description: '',
      quiz: {
        questions: [],
      },
      userQuestions: [],
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
      this.description = activeQuiz.data.attributes.description;

      console.log('ActiveQuiz response: ', activeQuiz);

      const response = await fetchReport({ url: serverUrl, token: this.getToken, id: this.id });
      const reports = response.data.attributes.users;
      // this.reports = response.data.attributes.users;

      console.log('Report response: ', response);

      // load quiz info with questions
      const quizId = activeQuiz.data.relationships.quiz.data.id;
      this.quiz = deSerializeQuiz(await fetchQuiz({
        url: serverUrl, token: this.getToken, id: quizId,
      }));

      // console.log('Quiz response: ', this.quiz);

      // prepare list of questions for each user in report
      // TODO: it's memory consuming, however significantly increases UI performance
      const userQuestions = reports.map((user) => {
        const data = {
          questions: this.quiz.questions.map((question) => {
            // question.id
            let questionIsRight = true;
            const newQuestion = { ...question };
            const userQst = user.questions.find((qst) => (
              qst.id.toString() === question.id.toString()));
            if (userQst) {
              // go through answers
              const newAnswers = question.answers.map((ans) => {
                const userAns = userQst.answers.find((uans) => (
                  uans.id.toString() === ans.id.toString()));
                if (userAns) {
                  const userAnswer = userAns.correct && userAns.correct === ans.correct ? 'right' : 'wrong';
                  if (userAnswer === 'wrong') {
                    questionIsRight = false;
                  }
                  return {
                    ...ans,
                    userAnswer,
                  };
                }
                return ans;
              });
              newQuestion.answers = [...newAnswers];

              // check that amount of correct answers match with user's correct answers
              const amountOfCorrectAnswers = question.answers.reduce((total, answer) => (
                answer.correct ? total + 1 : total
              ), 0);

              const amountOfUserCorrectAnswers = userQst.answers.reduce((total, answer) => (
                answer.correct ? total + 1 : total
              ), 0);

              if (amountOfCorrectAnswers !== amountOfUserCorrectAnswers) {
                questionIsRight = false;
              }
            }
            // check that there is at least one user's answer
            const atLeastOneAnswer = newQuestion.answers.find((ans) => (ans.userAnswer));
            if (!atLeastOneAnswer) {
              questionIsRight = false;
            }
            return {
              ...newQuestion,
              correct: questionIsRight,
            };
          }),
        };
        const deletedQuestions = user.questions.filter((uq) => (uq.deleted));
        return {
          questions: [
            ...data.questions,
            ...deletedQuestions,
          ],
        };
      });

      // inject userQuestions to report
      this.reports = reports.map((report, index) => ({
        ...report,
        userQuestions: [...userQuestions[index].questions],
      }));
    } catch (error) {
      console.log(error);
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
    amountOfUsers() {
      return this.reports.length;
    },
    endDate() {
      if (this.isValid) {
        // return 'Тестирование в процессе...';
        return '...';
      }
      if (this.endedAt) {
        const date = new Date(this.endedAt);
        return `${date.getHours()}:${date.getMinutes()}`;
      }
      return '...';
    },
    amountOfQuestions() {
      return this.quiz.questions.length;
    },
    questions() {
      return this.quiz.questions;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

h4 {
  font-size: 1.5rem;
  font-family: Oswald;
  color: $title-colour;
  margin: 3rem 0 0.8rem 0;
}

.description {
  color: $description-colour;
  font-family: Roboto;
  font-size: 1rem;
}

.signs {
  margin-top: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid $sign_box-colour;
}

.table-header {
  margin-top: 2rem;
  background: $sign_box-colour;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  color:  $title-colour;
  font-weight: 500;
}

</style>
