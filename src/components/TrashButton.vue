<template>
  <div class="trash-button" @click="remove">
    <icon name="trash" :width="width" />
    <div class="trash-dialog" :style="dialogStyle">
      <div class="text">
        Удалить?
      </div>
      <div class="yes-field" @click="$emit('click')">
        Да
      </div>
      <div class="no-field">
        Нет
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'TrashButton',
  components: {
    Icon,
  },
  props: {
    width: String,
  },
  data() {
    return {
      showDialog: false,
      dialogStyle: {},
    };
  },
  methods: {
    remove() {
      if (this.dialogStyle.width) {
        this.dialogStyle = {};
      } else {
        this.dialogStyle = {
          width: '30rem',
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.trash-button {
  position: absolute;
  bottom: 1rem;
  height: 1.7rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  display: flex;
  z-index: 1000;
}

.trash-dialog {
  transition: all 0.2s;
  width: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  padding-left: 2.5rem;
  display: flex;
  height: 1.7rem;
  font-weight: 500;
  font-size: 1.1rem;

  .text {
    color: $title-colour;
    padding: 0.3rem 1rem;
  }

  .no-field {
    background: $ok_button-colour;
    padding: 0.2rem 1rem;
    color: #ffffff;
    width: 4rem;
    text-align: center;
  }

  .no-field:hover {
    background: $ok_button-highlight;
  }

  .yes-field {
    background: $yes_button-colour;
    padding: 0.2rem 1rem;
    color: #ffffff;
    width: 4rem;
    text-align: center;
  }

  .yes-field:hover {
    background: $remove_button-colour;
  }
}

</style>
