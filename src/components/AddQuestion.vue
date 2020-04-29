<template>
<div class="row add-question">
  <div class="col-12">
    <div class="add-form">
      <float-label label="Вопрос" :error="errors.question">
            <textarea name="description" rows="2" v-model="text" />
      </float-label>
      <div class="answer-block" v-for="answer in answers" :key="answer.id">
        <div class="answer-buttons">
          <checkbox id="answer.id" style="margin-bottom: 20px;" v-model="answer.correct" />
          <trash-button
            @click="removeAnswer(answer.id)"
            :width="'1.3rem'"
            :style="{'position': 'relative', 'margin-top': '3.3rem'}"
          />
        </div>
        <float-label
          class="fl"
          label="Ответ"
          :error="errors.answer">
              <textarea name="answer" rows="2" v-model="answer.text" />
        </float-label>
      </div>
      <add-answer-button @click="addAnswer"/>
    </div>
    <ok-button title="Добавить" @click="add" />
    <cancel-button title="Отменить" @click="cancel" />
  </div>
</div>
</template>

<script>
import FloatLabel from './FloatLabel.vue';
import AddAnswerButton from './AddAnswerButton.vue';
import OkButton from './OkButton.vue';
import CancelButton from './CancelButton.vue';
import Checkbox from './Checkbox.vue';
import TrashButton from './TrashButton.vue';


export default {
  name: 'AddQuestion',
  components: {
    FloatLabel,
    AddAnswerButton,
    OkButton,
    CancelButton,
    Checkbox,
    TrashButton,
  },
  data() {
    return {
      errors: {
        question: null,
        answer: null,
      },
      text: '',
      answer: '',
      answerCount: 1,
      answers: [{
        id: 'new-add-1',
        text: '',
        correct: false,
      }],
    };
  },
  methods: {
    addAnswer() {
      this.answerCount += 1;
      this.answers.push({
        id: `new-add-${this.answerCount}`,
        text: '',
        correct: false,
      });
      this.errors = {};
    },
    removeAnswer(id) {
      // remove answer from the array
      this.answers = this.answers.filter((answer) => (answer.id !== id));
    },
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
    clearFields() {
      this.text = '';
      this.answers = [{
        id: 'new-add-1',
        text: '',
        correct: false,
      }];
      this.errors = {};
    },
    add() {
      if (!this.validate()) {
        const question = {
          text: this.text,
          answers: [...this.answers],
        };
        this.errors = {};
        this.clearFields();
        this.$emit('click', question);
      }
    },
    cancel() {
      this.clearFields();
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
.add-question {
  margin-top: 2rem;
}

.add-form {
  margin-left: 2rem;
}

.fl {
  margin-left: 3rem;
}

.answer-buttons {
  width: 2.5rem;
  position: absolute;
  left: 0;
  padding: 1rem 4rem;
}

</style>
