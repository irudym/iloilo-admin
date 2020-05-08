<template>
  <div class="row groups" :style="groupClass">
    <div class="col-sm-7">
      <div class="tool-panel" >
        <icon name="edit" class="tool-button" @click="$emit('edit')" />
        <trash-button @click="remove" />
      </div>
      <div class="type-line" />
      <div class="main">
        <h1>{{group.attributes.name}}</h1>
        <div class="description">{{group.attributes.description}}</div>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="info-panel">
        <p>
          В группе {{amountOfStudents}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import TrashButton from './TrashButton.vue';
import { createCountFormatter } from '../lib/utils';

export default {
  name: 'QuizCard',
  components: {
    TrashButton,
    Icon,
  },
  props: {
    group: Object,
  },
  data() {
    return {
      groupClass: {},
      hiddenContent: {},
    };
  },
  methods: {
    remove() {
      // eslint-disable-next-line quote-props
      this.groupClass = {
        'max-height': '0px',
        opacity: 0,
      };
      this.hiddenContent = { display: 'none' };
      setTimeout(() => (this.$emit('delete')), 250);
    },
  },
  computed: {
    amountOfStudents() {
      const string = createCountFormatter({
        one: 'студент',
        two: 'студента',
        few: 'студентов',
      })(this.group.attributes.user_count);
      return `${this.group.attributes.user_count} ${string}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.groups {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
  max-height: 500px;
  height: auto;
  overflow: hidden;
  margin-top: 3rem;
}

.tool-panel {
  width: 4.2rem;
  position: absolute;
  top: 0;
  padding: 1rem;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s;
  transition-timing-function: ease-in-out;

  .tool-button {
    width: 1.7rem;
    height: 1.7rem;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .play-button {
    margin-top: 10px;
    margin-left: -2px;
  }
}

.groups:hover {
  .tool-panel {
    opacity: 1;
  }
}

@media (pointer:none), (pointer:coarse) {
  .groups {
    .tool-panel {
      opacity: 1;
    }
  }
}

.main {
  margin-left: 5rem;
  min-height: 10rem;

  h1 {
    font-family: Oswald;
  }

  .description {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1rem;
    color: $description-colour;
    overflow-x: hidden;
  }
}

.type-line {
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 4.7rem;
    width: 2px;
    background: $sign_box-colour;
    z-index: 2;
    padding: 1px;
    border-radius: 5px;
}

.info-panel {
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  color: $description-colour;
  overflow-x: hidden;

  p {
    margin-top: 1.6rem;
  }
}

</style>
