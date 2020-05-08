<template>
  <div>
    <div class="row profile">
      <page-header title="Профиль пользователя">
        <div class="row">
          <div class="col-lg-3">
            <ok-button
              title="<< Назад"
              :style="{'margin-bottom': '2rem'}"
              @click="exit"
            />
          </div>
        </div>
      </page-header>
    </div>
    <div class="row">
      <div class="col-lg-7">
        <error-message v-show="errorMessage" v-bind:message="errorMessage" />
        <info-message
          v-show="notificationMessage"
          :message="notificationMessage"
          @close="closeInfo"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7">
        <div class="row">
          <div class="col-sm-6">
            <float-label label="Имя" v-bind:error="errors.firstName" :value="firstName">
              <input name="first name" type="text" autocomplete="off" v-model="firstName" />
            </float-label>
          </div>
          <div class="col-sm-6">
            <float-label label="Фамилия" v-bind:error="errors.lastName" :value="lastName">
              <input name="last name" type="text" autocomplete="off" v-model="lastName" />
            </float-label>
          </div>
        </div>
        <float-label label="E-mail" v-bind:error="errors.email" :value="email">
          <input
            name="email"
            type="text"
            autocomplete="off"
            v-model="email"
            disabled
            class="email-input"
          />
        </float-label>
        <float-label label="Пароль" v-bind:error="errors.password" :value="password1">
          <input name="password" type="password" autocomplete="off" v-model="password1" />
        </float-label>
        <float-label label="Повторите пароль" v-bind:error="errors.password" :value="password2">
          <input name="password" type="password" autocomplete="off" v-model="password2" />
        </float-label>
        <ok-button title="Сохранить" @click="submit" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageHeader from '../components/PageHeader.vue';
import FloatLabel from '../components/FloatLabel.vue';
import OkButton from '../components/OkButton.vue';
import { getUserInfo, updateUser } from '../lib/api';
import { serverUrl } from '../config/globals';

const ErrorMessage = () => import('../components/ErrorMessage.vue');
const InfoMessage = () => import('../components/InfoMessage.vue');

export default {
  name: 'Profile',
  components: {
    PageHeader,
    ErrorMessage,
    FloatLabel,
    InfoMessage,
    OkButton,
  },
  data() {
    return {
      errorMessage: null,
      notificationMessage: null,
      firstName: '',
      lastName: '',
      password1: '',
      password2: '',
      email: '',
      errors: {},
    };
  },
  async mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      // console.log('Evaluation=> User should login! isLogged: ', this.isLogged);
      this.$router.push('/admin/login');
    }

    try {
      const response = await getUserInfo({
        url: serverUrl,
        token: this.getToken,
        id: this.getUserId,
      });
      this.firstName = response.data.attributes.first_name;
      this.lastName = response.data.attributes.last_name;
      this.email = response.data.attributes.email;
    } catch (error) {
      this.errorMessage = error;
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    closeInfo() {
      this.notificationMessage = null;
    },
    validate() {
      const errors = {};
      if (!this.firstName.trim()) {
        errors.firstName = ['поле имя не может быть пустым'];
      }
      if (!this.lastName.trim()) {
        errors.lastName = ['необходимо указать фамилию'];
      }
      if (this.password1 !== this.password2) {
        errors.password = ['введённые пароли не совпадают'];
      }

      if (Object.keys(errors).length !== 0) {
        // show errors
        this.errors = errors;
        return errors;
      }
      return null;
    },
    async submit() {
      this.notificationMessage = null;
      if (!this.validate()) {
        this.errors = {};

        try {
          const user = {
            data: {
              type: 'user',
              id: this.getUserId,
              attributes: {
                first_name: this.firstName,
                last_name: this.lastName,
                password: this.password1.trim() ? this.password1 : null,
              },
            },
          };
          const response = await updateUser({
            url: serverUrl,
            token: this.getToken,
            id: this.getUserId,
            user,
          });

          if (response.auth_token) {
            this.loginUser(response);
          }

          this.notificationMessage = {
            title: 'Успешно!',
            detail: 'Профиль пользователя обновлен',
          };
        } catch (error) {
          this.errorMessage = error;
        }
      }
    },
    exit() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapGetters(['getToken', 'isLogged', 'getTimeInterval', 'getUserId']),
  },
};
</script>

<style lang="scss" scoped>

</style>
