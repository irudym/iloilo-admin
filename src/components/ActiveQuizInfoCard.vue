<template>
  <div class="row report-row">
    <div class="col-12">
      <div class="row user-row" @click.prevent.stop="$emit('click')">
        <div class="col-2 icon">
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
          <p class="status" :style="infoStyle">
            {{currentStatus}}
          </p>
        </div>
        <div class="col-2">
          <div class="table-cell pin">
            <div>
              {{quiz.attributes.pin}}
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="table-cell quiz-title">
            <div>
              {{quiz.attributes.title}}
              <p class="description">
                {{quiz.attributes.description}}
              </p>
            </div>
          </div>
        </div>
        <div class="col-3 timestamp">
          <div class="table-cell">
            {{endedDate}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import { dateTimeFormatter } from '../lib/utils';

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
      // return `${date.getHours()}:${(`0${date.getMinutes()}`).slice(-2)} |
      // ${(`0${date.getDate() + 1}`).slice(-2)}/${(`0${date.getMonth() + 1}`).slice(-2)}
      // /${date.getFullYear()}`;
      return dateTimeFormatter(date);
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
      let status = 'Не активирован';
      if (this.quiz.attributes.started) {
        status = 'В процесcе...';
      }
      if (!this.quiz.attributes.is_valid) {
        status = '';
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

.report-row {
  margin: 2rem 0;
}

.icon-button {
  border: none;
  background: transparent;
  outline: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  // width: 2rem;
  min-width: 0;
}

.table-cell {
  // position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pin {
  color: $add_button-colour;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
}

.quiz-title {
  font-size: 1.1rem;
  font-weight: 500;
  font-family: Roboto;
  padding: 0.5rem 0 ;
}

.user-row {
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  padding: 0.2rem 0;
}

.user-row:hover {
  background: $sign_box-colour;
}

.description {
  font-size: 0.8rem;
  color: $description-colour;
  display: block;
  align-self: flex-end;
}

.timestamp {
  padding: 0.5rem 0;
  font-weight: 500;
  font-size: 0.9rem;
}

.icon {
  padding: 0.5rem 1rem;
}

.status {
  font-size: 0.8rem;
  font-weight: 500;
  color: $checkbox_check-colour;
}

</style>
