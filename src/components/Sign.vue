<template>
  <div class="sign">
    <div class="sign-icon">
      <icon :name="icon" width="3rem" />
    </div>
    <div class="message">
      <div class="value" :style="valueStyle">
        {{value}}
      </div>
      <div class="text">
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'Sign',
  components: {
    Icon,
  },
  props: {
    icon: String,
    text: String,
    colour: String,
    value: {
      default: () => (''),
      type: [String, Number],
    },
  },
  computed: {
    valueStyle() {
      return {
        color: this.colour,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.sign {
  background: $sign_box-colour;
  border: none;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  min-height: 5rem;
  margin: 0.4rem 0;
}

.sign-icon {
  width: 6rem;
  padding: 1rem;
}

.message {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: left;
}

.value {
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 0 0.2rem 0.5rem;
}

.text {
  color: $title-colour;
  font-family: Roboto;
  font-size: 1rem;
  padding: 0 0 1rem 0.6rem;
  font-size: 0.9rem;
}

</style>
