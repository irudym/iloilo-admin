<template>
  <div class="row quizzes" :style="quizzesClass">
    <div class="col-sm-7">
      <div class="tool-panel" >
        <icon name="edit" class="tool-button" @click="$emit('edit')" />
        <trash-button @click="remove" />
      </div>
      <div class="type-line" />
      <div class="main">
        <div class="icon">
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
        </div>
        <h1 class="pin">{{quiz.attributes.pin}}</h1>
        <h4>{{quiz.attributes.title}}</h4>
        <div class="description">{{quiz.attributes.description}}</div>
        <button class="gray-button" @click="report">
          Отчет<span class="arrow">></span>
        </button>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="info-panel">
        <p>
          Время завершения {{endedDate}} {{remainedTime}}
        </p>
        <p>
          Продолжительность теста {{quiz.attributes.duration}} минут
        <p>
          {{submittedUsers}} человек прошло этот тест
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TrashButton from './TrashButton.vue';
import Icon from './Icon.vue';

export default {
  name: 'ActiveQuizCard',
  components: {
    TrashButton,
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
    report() {
      this.$router.push(`reports/${this.quiz.id}`);
    },
  },
  computed: {
    endedDate() {
      const date = new Date(this.quiz.attributes.ended_at);
      return `${date.getHours()}:${date.getMinutes()} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    remainedTime() {
      if (!this.quiz.attributes.is_valid) {
        return null;
      }
      const currentDate = new Date();
      const endedDate = new Date(this.quiz.attributes.ended_at);
      const remained = endedDate - currentDate;
      // const hours = Math.round(remained / 1000 / 60 / 60);
      const minutes = Math.round(remained / 1000 / 60);
      return `, осталось ${minutes} минут`;
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
    submittedUsers() {
      return this.quiz.attributes.submitted_users.length;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.quizzes {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
  max-height: 500px;
  height: auto;
  overflow: hidden;
  margin-top: 3rem;
  margin-bottom: 4.5rem;

  .tool-panel {
    width: 4.2rem;
    position: absolute;
    top: 0;
    padding: 1rem;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    transition-timing-function: ease-in-out;

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
}

.quizzes:hover {
  .tool-panel {
    opacity: 1;
  }
}

@media (pointer:none), (pointer:coarse) {
  .quizzes {
    .tool-panel {
      opacity: 1;
    }
  }
}

.main {
  margin-left: 5rem;
  min-height: 10rem;

  .icon {
    display: inline-block;
    margin-right: 1rem;
  }

  .pin {
    display: inline-block;
    color: $add_button-colour;
  }

  h1 {
    font-family: Oswald;
    margin: 0.3rem 0;
  }

  h4 {
    font-family: Roboto;
    font-size: 1.3rem;
    color: $title-colour;
    margin: 1rem 0;
    font-weight: 400;
  }

  .started {
    color: $ok_button-colour;
  }

  .description {
    font-family: Roboto;
    font-weight: 400;
    font-size: 0.9rem;
    color: $description-colour;
    overflow-x: hidden;
  }
}

.arrow {
  margin-left: 2rem;
}

.gray-button {
  outline: none;
  box-shadow: none;
  background: $sign_box-colour;
  border-radius: 6px;
  color: rgb(70, 75, 80);
  margin: 2rem 0 0 0;
  width: 6rem;
  height: 2rem;
  font-size: 0.9rem;
  font-weight: 400;
}

.gray-button:hover {
  background: #DEE5EC;
}

.type-line {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 4.7rem;
    width: 2px;
    background: $sign_box-colour;
    z-index: 2;
    padding: 1px;
    border-radius: 5px;
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
