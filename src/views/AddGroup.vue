<template>
  <div>
    <div class="groups row">
      <div class="col-lg-9">
          <p class="title">Создать группу</p>
          <div class="row">
            <div class="col-sm-10">
              <ok-button title="Сохранить" @click="submit" />
              <cancel-button @click="cancel" />
            </div>
          </div>
      </div>
      <div class="col-lg-3" />
    </div>
    <div class="row">
      <div class="col-lg-6 edit-panel">
        <div class="row edit-form">
          <div class="col-lg-12">
            <error-message v-show="errorMessage" v-bind:message="errorMessage" />
            <float-label label="Название группы" v-bind:error="errors.name" :value="name">
                <input name="name" type="text" autocomplete="off" v-model="name" />
            </float-label>
            <float-label label="Описание" :error="errors.description" :value="description">
              <textarea name="description" rows="4" v-model="description" />
            </float-label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OkButton from '../components/OkButton.vue';
import CancelButton from '../components/CancelButton.vue';
import FloatLabel from '../components/FloatLabel.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { createGroup } from '../lib/api';
import { serverUrl } from '../config/globals';
import { serializeGroup } from '../lib/serializer';

export default {
  name: 'AddGroup',
  data() {
    return {
      name: '',
      description: '',
      errors: {
        name: null,
        description: null,
      },
      errorMessage: null,
    };
  },
  components: {
    OkButton,
    CancelButton,
    FloatLabel,
    ErrorMessage,
  },
  mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }
  },
  methods: {
    cancel() {
      this.$router.push('/admin/groups');
    },
    validate() {
      const errors = {};

      if (!this.name.trim()) {
        errors.name = 'необходимо указать название группы';
      }
      if (Object.keys(errors).length !== 0) {
        // show errors
        this.errors = errors;
        return errors;
      }
      return null;
    },
    async submit() {
      this.errorMessage = null;
      if (!this.validate()) {
        try {
          await createGroup({
            url: serverUrl,
            token: this.getToken,
            group: { ...serializeGroup(this) },
          });
          this.$router.push('/admin/groups');
        } catch (error) {
          this.errorMessage = error;
        }
      }
    },
  },
  computed: {
    ...mapGetters(['getToken', 'getTimeInterval', 'isLogged']),
  },
};
</script>

<style lang="scss" scoped>

.edit-form {
  margin-top: 2rem;
}
</style>
