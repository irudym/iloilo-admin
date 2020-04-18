<template>
  <button class="remove-button" v-on:click.stop.prevent="$emit('click')">
    <Icon name="trash" :width="width" />
  </button>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'RemoveButton',
  components: {
    Icon,
  },
  props: {
    width: String,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.remove-button {
  width: 18px;
  min-width: 0;
  height: 18px;
  box-shadow: none;
  margin-top: 0.8rem;
  padding: 0;
  background: transparent;
}
</style>
