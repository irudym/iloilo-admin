<template>
  <div>
    <div class="groups row">
      <page-header title="Группы">
        <div class="row">
          <div class="col-lg-3">
            <add-button title="Создать" @click="add"/>
          </div>
        </div>
      </page-header>
      <div class="col-lg-3" />
    </div>
      <div class="row">
        <div class="col-lg-7">
          <error-message v-show="errorMessage" v-bind:message="errorMessage" />
        </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <group-card
          v-for="group in groups"
          :key="group.id"
          :group="group"
          @edit="edit(group.id)"
          @delete="remove(group.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddButton from '../components/AddButton.vue';
import GroupCard from '../components/GroupCard.vue';
import PageHeader from '../components/PageHeader.vue';
import { fetchGroups, deleteGroup } from '../lib/api';
import { serverUrl } from '../config/globals';

const ErrorMessage = () => import('../components/ErrorMessage.vue');

export default {
  name: 'Groups',
  components: {
    AddButton,
    ErrorMessage,
    GroupCard,
    PageHeader,
  },
  data() {
    return {
      groups: [],
      errorMessage: null,
    };
  },
  async mounted() {
    clearInterval(this.getTimeInterval);

    // check if user logged in
    if (!this.isLogged) {
      this.$router.push('/admin/login');
    }

    // fetch groups
    try {
      const response = await fetchGroups({ url: serverUrl, token: this.getToken });
      // console.log('Groups=> groups: ', response);
      this.groups = [...response.data];
    } catch (error) {
      this.errorMessage = error;
    }
  },
  methods: {
    add() {
      this.$router.push('/admin/groups/add');
    },
    edit(id) {
      this.$router.push(`/admin/groups/edit/${id}`);
    },
    async remove(id) {
      try {
        await deleteGroup({
          url: serverUrl,
          token: this.getToken,
          id,
        });
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
