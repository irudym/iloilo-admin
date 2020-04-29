<template>
<div class="edit-question">
  <div class="add-form">
    <float-label label="Вопрос" :error="errors.question">
        <textarea
          name="text"
          rows="5"
          v-model="text"
          :style="{'line-height': '1.4rem'}"
        />
    </float-label>
    <div class="answer-block" v-for="answer in answers" :key="answer.id">
      <div class="answer-buttons-block">
        <checkbox id="answer.id" v-model="answer.correct" />
        <trash-button
          @click="removeAnswer(answer.id)"
          :width="'1.3rem'"
          :style="{'bottom': '0'}"
        />
      </div>
      <float-label
        class="fl"
        label="Ответ"
        :error="errors.answer">
          <textarea
            name="answer"
            rows="3"
            v-model="answer.text"
            :style="{'line-height': '1.4rem'}"
          />
      </float-label>
    </div>
    <add-answer-button @click="addAnswer"/>
    <ok-button title="Обновить" @click="update" />
    <cancel-button title="Отменить" @click="cancel" />
  </div>
</div>
</template>

<script>
import { cloneDeep } from 'lodash';
import FloatLabel from './FloatLabel.vue';
import AddAnswerButton from './AddAnswerButton.vue';
import TrashButton from './TrashButton.vue';
import OkButton from './OkButton.vue';
import CancelButton from './CancelButton.vue';
import Checkbox from './Checkbox.vue';


export default {
  name: 'EditQuestion',
  components: {
    FloatLabel,
    AddAnswerButton,
    TrashButton,
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
      text: this.question.text, // question text
      id: this.question.id,
      answers: cloneDeep(this.question.answers),
    };
  },
  methods: {
    validate() {
      const errors = {};
      if (!this.text.trim()) {
        errors.question = ['текст вопроса не может быть пустым'];
      }

      let hasCorrect = false;
      // eslint-disable-next-line array-callback-return
      this.answers.map((answer) => {
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
        const updated = {
          id: this.id,
          text: this.text,
          answers: this.answers,
        };
        this.$emit('update', updated);
      }
    },
    cancel() {
      this.id = this.question.id;
      this.text = this.question.text;
      this.answers = cloneDeep(this.question.answers);
      this.$emit('cancel');
    },
    addAnswer() {
      this.answers.push({
        id: `new-${this.answerCount}`, // are you stupid?
        text: '',
        correct: false,
      });
      this.errors = {};
    },
    removeAnswer(id) {
      console.log('answers: ', this.answers);

      // remove answer from the array
      this.answers = this.answers.filter((answer) => (answer.id !== id));
    },
  },
  computed: {
    answerCount() {
      return this.answers.length + 1;
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

.answer-buttons-block {
  position: absolute;
  padding: 1rem 0 0 0;
  width: 3rem;
  height: 5rem;
}

</style>
