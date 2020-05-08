<template>
  <div>
    <div class="activate_quizzes row">
      <page-header title="Начать тестирование">
        <div class="row">
          <div class="col-lg-3">
            <ok-button title="<< Назад" @click="back"/>
          </div>
        </div>
      </page-header>
    </div>
    <div class="row">
      <div class="col-lg-7">
        <error-message v-show="errorMessage" v-bind:message="errorMessage" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="pin-container">
          <div class="pin">PIN: <span>{{pin}}</span></div>
          <start-button v-if="!started" title="Начать" @click="start"/>
        </div>
      </div>
    </div>
    <div class="information">
      <div class="row ustify-content-center display-as-table">
        <div class="col-md-5">
          <div class="connected hidden-md-down">
            <h4>Подключенные пользователи</h4>
            <ul>
              <li v-for="user in connectedUsers" :key="user" >{{user}}</li>
            </ul>
          </div>
        </div>
        <div class="col-md-7">
          <h4>Информация о тестировании</h4>
          На тест ответили
          <ul>
            <li v-for="user in submittedUsers" :key="user.name+user.score" >
              {{user.name}} с результатом {{user.score}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OkButton from '../components/OkButton.vue';
import StartButton from '../components/StartButton.vue';
import PageHeader from '../components/PageHeader.vue';
import { fetchActiveQuiz, startQuiz } from '../lib/api';
import { serverUrl } from '../config/globals';

const ErrorMessage = () => import('../components/ErrorMessage.vue');

export default {
  name: 'ActivateQuiz',
  components: {
    OkButton,
    StartButton,
    ErrorMessage,
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
      errorMessage: null,
      pin: 'loading...',
      started: false,
      endedAt: null,
      connectedUsers: [],
      submittedUsers: [],
    };
  },
  methods: {
    ...mapActions(['setTimeInterval']),
    back() {
      this.$router.push('/admin/active_quizzes');
    },
    async start() {
      try {
        const response = await startQuiz({ url: serverUrl, token: this.getToken, id: this.id });
        console.log('Start response: ', response);
        this.started = response.data.attributes.started;
        this.endedAt = response.data.attributes.endedAt;
      } catch (error) {
        this.errorMessage = error;
      }
    },
    async updateUsers() {
      try {
        const response = await fetchActiveQuiz({
          url: serverUrl,
          token: this.getToken,
          id: this.id,
        });
        this.connectedUsers = response.data.attributes.connected_users;
        this.submittedUsers = response.data.attributes.submitted_users;
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
  async mounted() {
    clearInterval(this.getTimeInterval);
    try {
      const response = await fetchActiveQuiz({ url: serverUrl, token: this.getToken, id: this.id });
      this.pin = response.data.attributes.pin;
      this.started = response.data.attributes.started;
      this.endedAt = response.data.attributes.ended_at;
      this.connectedUsers = response.data.attributes.connected_users;
      this.submittedUsers = response.data.attributes.submitted_users;

      // start users update
      const tid = setInterval(this.updateUsers, 3000);
      this.setTimeInterval(tid);
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
  beforeDestroy() {
    clearInterval(this.getTimeInterval);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.pin-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pin {
  max-width: 50%;
  font-family: Oswald;
  font-weight: 400;
  font-size: 5rem;
  color: $title-colour;
  font-family: 'Oswald', sans-serif;
  text-align: center;

  span {
    font-weight: 600;
  }
}

.connected {
  height: 100%;
}

.information {
  margin-top: 2rem;

  h4 {
    font-family: Roboto;
    font-size: 1.1rem;
    font-weight: 500;
  }

  ul {
    list-style-type: none;
  }

  li {
    font-family: Roboto;
    font-size: 1rem;
    color: $description-colour;
  }
}

</style>
