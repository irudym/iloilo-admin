<template>
  <div>
    <div class="groups row">
      <div class="col-lg-9">
          <p class="title">Редактирование группы</p>
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
            <div class="name">
              {{ name }}
            </div>
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
import { fetchGroup, updateGroup } from '../lib/api';
import { serverUrl } from '../config/globals';
import { serializeGroup } from '../lib/serializer';

export default {
  name: 'AddGroup',
  props: {
    id: Number,
  },
  data() {
    return {
      name: '',
      description: '',
      errors: {
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
  async mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }

    try {
      const response = await fetchGroup({
        url: serverUrl,
        token: this.getToken,
        id: this.id,
      });
      this.name = response.data.attributes.name;
      this.description = response.data.attributes.description;
    } catch (error) {
      this.errorMessage = error;
    }
  },
  methods: {
    cancel() {
      this.$router.push('/admin/groups');
    },
    async submit() {
      this.errorMessage = null;
      try {
        await updateGroup({
          url: serverUrl,
          token: this.getToken,
          group: { ...serializeGroup(this) },
        });
        this.$router.push('/admin/groups');
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
  computed: {
    ...mapGetters(['getToken', 'getTimeInterval', 'isLogged']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.edit-form {
  margin-top: 2rem;
}

.name {
  font-size: 1rem;
  font-weight: 400;
  color: $title-colour;
  padding: 2rem 1rem;
}
</style>
