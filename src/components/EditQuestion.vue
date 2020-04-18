<template>
<div class="edit-question">
  <div class="add-form">
    <float-label label="Вопрос" :error="errors.question">
        <textarea
          name="text"
          rows="4"
          v-model="question.text"
        />
    </float-label>
    <div class="answer-block" v-for="answer in question.answers" :key="answer.id">
      <div class="answer-buttons">
        <checkbox id="answer.id" style="margin-bottom: 20px;" v-model="answer.correct" />
        <remove-button @click="removeAnswer(answer.id)" :width="'1.3rem'" />
      </div>
      <float-label
        class="fl"
        label="Ответ"
        :error="errors.answer">
          <textarea
            name="answer"
            rows="2"
            v-model="answer.text"
          />
      </float-label>
    </div>
    <add-answer-button @click="addAnswer"/>
    <ok-button title="Обновить" @click="update" />
    <cancel-button title="Отменить" @click="$emit('cancel')" />
  </div>
</div>
</template>

<script>
import FloatLabel from './FloatLabel.vue';
import AddAnswerButton from './AddAnswerButton.vue';
import RemoveButton from './RemoveButton.vue';
import OkButton from './OkButton.vue';
import CancelButton from './CancelButton.vue';
import Checkbox from './Checkbox.vue';

export default {
  name: 'EditQuestion',
  components: {
    FloatLabel,
    AddAnswerButton,
    RemoveButton,
    OkButton,
    CancelButton,
    Checkbox,
  },
  props: {
    question: {
      type: Object,
      default() {
        return {
          text: '',
          answers: [],
        };
      },
    },
  },
  data() {
    return {
      errors: {
        question: null,
        answer: null,
      },
    };
  },
  methods: {
    validate() {
      const errors = {};
      if (!this.question.text.trim()) {
        errors.question = ['текст вопроса не может быть пустым'];
      }

      let hasCorrect = false;
      // eslint-disable-next-line array-callback-return
      this.question.answers.map((answer) => {
        hasCorrect = hasCorrect || answer.correct;
        if (!answer.text.trim()) {
          errors.answer = 'текст ответа не может быть пустым';
        }
      });
      if (!hasCorrect) {
        if (!errors.question) errors.question = [];
        errors.question.push('вопрос должен иметь хоть один верный ответ');
      }
      if (Object.keys(errors).length !== 0) {
        // show errors
        this.errors = errors;
        return errors;
      }
      return null;
    },
    update() {
      if (!this.validate()) {
        this.errors = {};
        this.$emit('update', { ...this.question });
      }
    },
    addAnswer() {
      this.question.answers.push({
        id: this.answerCount,
        text: '',
        correct: false,
      });
      this.errors = {};
    },
    removeAnswer(id) {
      console.log('answers: ', this.question.answers);

      // remove answer from the array
      this.question.answers = this.question.answers.filter((answer) => (answer.id !== id));
    },
  },
  computed: {
    answerCount() {
      return this.question.answers.length + 1;
    },
  },
};
</script>

<style lang="scss">
@import '../styles/colours.scss';

.edit-question {
  margin: 1rem 8px;
  background: $question_card-colour;
  border: none;
  border-radius: 6px;
  padding: 1rem 0;
}

.add-form {
  margin-left: 2rem;
}

.fl {
  margin-left: 32px;
}

.answer-buttons {
  width: 30px;
  position: absolute;
  left: 0;
  padding: 1rem 4rem;
}

</style>
