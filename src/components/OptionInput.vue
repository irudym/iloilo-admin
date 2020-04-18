<template>
<div class="option-input">
  {{title}}:
  <div class="underlined">
    <div class="input" v-show="showInput">
      <input
        type="text"
        @input="input"
        @blur="blur"
        v-model="inputValue"
        v-on:keyup.enter="blur"
        ref="optioninput"
        :style="inputStyle"
        :disabled="!showInput"
      />
      {{units}}
    </div>
    <div v-show="!showInput" class="value" @click.stop.prevent="edit">
      {{value}} {{units}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'OptionInput',
  props: {
    title: String,
    value: {
      type: [String, Object, Number],
      default() { return null; },
    },
    units: {
      type: String,
      default() { return ''; },
    },
  },
  data() {
    return {
      showInput: false,
      inputValue: this.value,
    };
  },
  methods: {
    edit() {
      this.showInput = true;
      // setTimeout(this.setFocus, 100);
      this.$nextTick(this.setFocus);
    },
    setFocus() {
      this.$refs.optioninput.focus();
      this.$refs.optioninput.select();
    },
    blur() {
      this.showInput = false;
    },
    input() {
      this.$emit('input', this.inputValue);
    },
  },
  computed: {
    inputStyle() {
      return {
        width: this.showInput ? '3rem' : '0',
      };
    },
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.option-input {
  // display: inline;
  margin: 1.5rem 0;
}

.value {
  cursor: pointer;
  display: inline;
  color: $options_edit-color;
}

.input {
  display: inline;
  color: $options_edit-color;
  input {
    font-family: Roboto;
    font-size: 1rem;
    text-align: center;
    width: 3rem;
    border: none;
    outline: none;
    background: transparent;
  }
}

.underlined {
  display: inline;
  border-bottom: 1px dotted $options_edit-color;
}

</style>
