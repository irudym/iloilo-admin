<template>
  <div>
    <div class="reports row">
      <div class="col-lg-9">
          <p class="title">Отчеты</p>
          <div class="row">
            <div class="col-lg-3">
              Зайдите, пожалуйста, позже. Идут работы...
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorMessage from '../components/ErrorMessage.vue';

export default {
  name: 'Reports',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      errorMessage: null,
    };
  },
  mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }
  },
  computed: {
    ...mapGetters(['getTimeInterval', 'isLogged']),
  },
};
</script>

<style lang="scss" scoped>

</style>
