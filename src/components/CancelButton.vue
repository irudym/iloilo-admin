<template>
<div class="button-container">
  <button
    class="cancel-button"
    :style="buttonStyle"
    v-on:click.stop.prevent="$emit('click')"
  >
      {{title}}
  </button>
</div>
</template>

<script>
export default {
  name: 'OkButton',
  props: {
    title: {
      type: String,
      default: () => ('Отмена'),
    },
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

.button-container {
  height: 5rem;
   display: inline-flex;
}

.cancel-button {
  background: $cancel_button-colour;
  color: $cancel_button-text-colour;
  padding: 0.9rem 2rem;
  margin: 1rem 0;
  margin-left: 10rem;
}

.cancel-button:hover {
  background: $cancel_button-highlight;
}

.cancel-button:active {
  box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.5);
  font-size: 0.99rem;
  // padding-top:0.95rem;
  // padding-bottom: 0.85rem;
}

</style>
