<template>
  <button
    class="add-button"
    :style="buttonStyle"
    v-on:click.stop.prevent="$emit('click')"
  >
      + {{title}}
  </button>
</template>

<script>
export default {
  name: 'AddButton',
  props: {
    title: String,
    buttonStyle: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/layout.scss';
@import '../styles/colours.scss';

.add-button {
  background: $add_button-colour;
  color: $add_button-text-colour;
  padding: 0.9rem 1.5rem;
  margin: 1rem 0;
}

.add-button:hover {
  background: $add_button-highlight;
}

.add-button:active {
  box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.5);
  //font-size: 0.99rem;
}

</style>
