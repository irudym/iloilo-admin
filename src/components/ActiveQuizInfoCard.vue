<template>
  <div class="row info-quizzes" :style="quizzesClass" @click="$emit('click')">
    <div class="col-sm-7">
      <div class="main">
        <h1>
          <icon
            v-if="quiz.attributes.is_valid"
            name="clock"
            :style="{'margin-right': '0.2rem', 'height': '1.3rem'}"
          />
          <icon
            v-else
            name="flag"
            :style="{'margin-right': '0.2rem', 'height': '1.3rem'}"
          />
          {{quiz.attributes.pin}}
        </h1>
        <h4>{{quiz.attributes.title}}</h4>
        <div class="started" :style="infoStyle">
            {{currentStatus}}
        </div>
        <div v-if="quiz.attributes.ended_at" class="timestamp">
          Время завершения {{endedDate}}, осталось {{remainedTime}}
        </div>
        <div class="description">{{quiz.attributes.description}}</div>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="info-panel">
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'ActiveQuizInfoCard',
  components: {
    Icon,
  },
  props: {
    quiz: Object,
  },
  data() {
    return {
      quizzesClass: {},
    };
  },
  methods: {
    remove() {
      // eslint-disable-next-line quote-props
      this.quizzesClass = {
        'max-height': '0px',
        opacity: 0,
      };
      this.hiddenContent = { display: 'none' };
      setTimeout(() => (this.$emit('delete')), 250);
    },
  },
  computed: {
    endedDate() {
      const date = new Date(this.quiz.attributes.ended_at);
      return `${date.getHours()}:${date.getMinutes()} / ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
    remainedTime() {
      const currentDate = new Date();
      const endedDate = new Date(this.quiz.attributes.ended_at);
      const remained = endedDate - currentDate;
      const hours = Math.round(remained / 1000 / 60 / 60);
      const minutes = Math.round((remained - hours * 60 * 60 * 1000) / 1000 / 60);
      return `${hours} часов, ${minutes} минут`;
    },
    currentStatus() {
      let status = 'Тест не активирован';
      if (this.quiz.attributes.started) {
        status = 'В процесcе...';
      }
      if (!this.quiz.attributes.is_valid) {
        status = 'Тест завершён';
      }
      return status;
    },
    infoStyle() {
      return this.quiz.attributes.is_valid ? null : { color: '#E8150C' };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.info-quizzes {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
  max-height: 500px;
  height: auto;
  overflow: hidden;
  margin-top: 3rem;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
}

.info-quizzes:hover {
  border: 1px solid $form_border-colour;
}

.main {
  margin-left: 5rem;
  min-height: 10rem;

  h1 {
    font-family: Oswald;
  }

  h4 {
    font-family: Oswald;
    font-size: 1.4rem;
    color: $description-colour;
    margin: 1rem 0;
    font-weight: 500;
  }

  .started {
    color: $ok_button-colour;
  }

  .description {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1.1rem;
    color: $description-colour;
    overflow-x: hidden;
  }
}

.type-line {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 4.7rem;
    width: 2px;
    background: $form_border-colour;
    z-index: 2;
    padding: 1px;
    border-radius: 5px;
}

.tool-panel {
  width: 4.2rem;
  position: absolute;
  top: 0;
  padding: 1rem;
  height: 100%;

  .tool-button {
    width: 1.7rem;
    height: 1.7rem;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .play-button {
    margin-top: 10px;
    margin-left: -2px;
  }
}

.timestamp {
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
  color: $description-colour;
}

.info-panel {
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  color: $description-colour;
  overflow-x: hidden;
}

</style>
