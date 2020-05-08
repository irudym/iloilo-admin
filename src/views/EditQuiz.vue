<template>
  <div>
    <div class="quizzes row">
      <page-header :title="pageTitle">
        <div class="row">
          <div class="col-sm-10">
            <ok-button title="<< Назад" @click="back" />
          </div>
        </div>
      </page-header>
    </div>
    <div class="row">
      <div class="col-lg-6 edit-panel">
        <div class="row edit-form">
          <div class="col-lg-12">
            <error-message v-show="errorMessage" v-bind:message="errorMessage" />
            <float-label label="Название теста" v-bind:error="errors.title" :value="title">
                <input name="quiztitle" type="text" autocomplete="off" v-model="title" />
            </float-label>
            <float-label label="Описание" :error="errors.description" :value="description">
              <textarea name="description" rows="4" v-model="description" />
            </float-label>
          </div>
        </div>
        <div v-for="question in questions" :key="question.id" class="row">
          <div class="col-lg-12">
            <question-card
              v-if="question.id !== editQuestionID"
              :question="question"
              @edit="editQuestion(question.id)"
              @delete="deleteQuestion(question.id)"
            />
            <edit-question
              v-if="question.id === editQuestionID"
              :question="question"
              @update="updateQuestion"
              @cancel="cancelUpdateQuestion"
            />
          </div>
        </div>
        <add-question v-show="addQuestionForm" @click="saveQuestion" @cancel="cancelQuestion" />
        <div class="row">
          <div class="col-lg-12" v-show="!addQuestionForm">
            <add-button title="Добавить вопрос" @click="addQuestion"/>
          </div>
        </div>
      </div>
      <div class="col-lg-6 setup-panel">
        <h4>Настройки теста</h4>
        <div class="options">
          <option-input title="Длительность тестирования" v-model="duration" units="минут" />
          <option-input title="Максимальная оценка за тест" v-model="maxScore" units="баллов" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OkButton from '../components/OkButton.vue';
import AddButton from '../components/AddButton.vue';
import FloatLabel from '../components/FloatLabel.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import AddQuestion from '../components/AddQuestion.vue';
import QuestionCard from '../components/QuestionCard.vue';
import EditQuestion from '../components/EditQuestion.vue';
import OptionInput from '../components/OptionInput.vue';
import PageHeader from '../components/PageHeader.vue';
import {
  fetchQuiz,
  updateQuiz,
  updateQuestion,
  createQuestion,
  deleteQuestion,
} from '../lib/api';
import { serverUrl } from '../config/globals';
import { deSerializeQuiz, serializeQuestion } from '../lib/serializer';

export default {
  name: 'AddQuiz',
  components: {
    OkButton,
    AddButton,
    FloatLabel,
    ErrorMessage,
    AddQuestion,
    QuestionCard,
    EditQuestion,
    OptionInput,
    PageHeader,
  },
  props: {
    id: {
      type: String,
      default() { return null; },
    },
  },
  data() {
    return {
      pageTitle: 'Создать тест',
      title: '',
      description: '',
      errors: {
        title: null,
        description: null,
      },
      errorMessage: null,
      addQuestionForm: false,
      editQuestionID: null,
      questions: [],
      questionCount: 0,
      tempQuestion: null,
      duration: 0,
      maxScore: 0,
    };
  },
  methods: {
    validate() {
      const errors = {};
      if (!this.title.trim()) {
        errors.title = 'заголовок не может быть пустым';
      }
      if (Object.keys(errors).length !== 0) {
        // show errors
        this.errors = errors;
        return errors;
      }
      return null;
    },
    async back() {
      if (!this.validate()) {
        this.errors = {};

        // submit to the server
        if (this.id) {
          const quiz = {
            data: {
              type: 'quiz',
              id: this.id,
              attributes: {
                title: this.title,
                description: this.description,
                duration: this.duration,
                max_score: this.maxScore,
              },
            },
          };
          console.log(`UPDATE[${this.id}] with title and description: `, quiz);
          try {
            await updateQuiz({ url: serverUrl, token: this.getToken, quiz });
            this.errorMessage = null;
            this.$router.push('/admin/quizzes');
          } catch (error) {
            console.log('Cannot update quiz due to error: ', error);
            this.errorMessage = error.message;
          }
        }
      }
    },
    addQuestion() {
      if (!this.addQuestionForm) {
        this.addQuestionForm = !this.addQuestionForm;
      }
    },
    async saveQuestion(q) {
      const question = {
        ...q,
      };
      if (!question.id) {
        question.id = this.questionCount;
        this.questionCount += 1;
      }

      try {
        const newQuestion = {
          ...serializeQuestion(question.text, question.answers, this.id),
        };

        const response = await createQuestion({
          url: serverUrl,
          token: this.getToken,
          question: newQuestion,
        });

        question.id = response.data.id;
        this.questions.push(question);
        this.addQuestionForm = false;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    cancelQuestion() {
      this.addQuestionForm = false;
      // this.editQuestionID = null;
    },
    editQuestion(id) {
      this.editQuestionID = id;
      this.tempQuestion = { ...this.questions.find((question) => (question.id === id)) };
    },
    async deleteQuestion(id) {
      try {
        await deleteQuestion({ url: serverUrl, token: this.getToken, id });
        this.questions = this.questions.filter((question) => (question.id !== id));
      } catch (error) {
        console.log('CANNOT delete due to', error);
        this.errorMessage = error.detail;
      }
    },
    async updateQuestion(updQuestion) {
      // update question directly to server
      const question = { ...updQuestion };
      console.log('update question: ', question);
      const updatedQuestion = {
        ...serializeQuestion(
          question.text,
          question.answers,
        ),
      };
      updatedQuestion.data.id = question.id;
      console.log('Serialized question: ', updatedQuestion);

      try {
        await updateQuestion({
          url: serverUrl,
          token: this.getToken,
          question: updatedQuestion,
        });

        this.editQuestionID = null;
        this.questions = this.questions.map((qst) => {
          if (qst.id === question.id) return question;
          return qst;
        });
      } catch (error) {
        this.errorMessage = error.detail;
      }
    },
    cancelUpdateQuestion() {
      this.editQuestionID = null;
    },
  },
  async mounted() {
    clearInterval(this.getTimeInterval);
    if (this.id) {
      this.pageTitle = 'Редактировать тест';
      // load data from API server
      try {
        const response = await fetchQuiz({ url: serverUrl, token: this.getToken, id: this.id });
        const quiz = deSerializeQuiz(response);
        // console.log('RES: ', response);
        console.log('DESERIALIZE: ', quiz);

        this.title = quiz.title;
        this.description = quiz.description;
        this.questions = quiz.questions;
        this.duration = quiz.duration;
        this.maxScore = quiz.max_score;
        console.log('SET DURATION: ', quiz.duration);
      } catch (error) {
        console.log('Cannot load quiz due to: ', error);
        // show the error message
        this.errorMessage = error.detail;
      }
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getTimeInterval']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.edit-form {
  margin-top: 2rem;
}

.edit-panel {
  border-right: 1px solid $form_border-colour;
}

.setup-panel {
  h4 {
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.0rem;
    color: $title-colour;
  }

  .options {
    font-size: 1rem;
    color: $options-colour;
    line-height: 1.5rem;
    margin-top: 3rem;
  }
}

</style>
