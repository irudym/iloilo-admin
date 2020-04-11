<template>
    <div>
    <app-header />
    <div class="blue-background mx-auto">
      <ilo-dialog width="80%" title="Контакты">
        <p>
            Так как ПО распространяется без каких-либо обязательст, то и контактов,
            соответственно, тоже нет.
          </p>
      </ilo-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '../components/AppHeader.vue';
import IloDialog from '../components/Dialog.vue';

export default {
  name: 'Contacts',
  components: {
    AppHeader,
    IloDialog,
  },
  mounted() {
    clearInterval(this.getTimeInterval);
  },
  computed: {
    ...mapGetters(['getTimeInterval']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.blue-background {
  background: $main-blue;
  height: 30rem;
}
</style>
