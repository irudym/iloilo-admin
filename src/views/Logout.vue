<template>
  <div />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Logout',
  mounted() {
    clearInterval(this.getTimeInterval);

    // logout user
    this.logoutUser();
    this.$router.push('/admin/login');
  },
  methods: {
    ...mapActions(['logoutUser']),
  },
  computed: {
    ...mapGetters(['getTimeInterval']),
  },
};
</script>
