<template>
  <img alt="icon" :src="iconName" :style="iconStyle" @click="$emit('click')" />
</template>

<script>
import EditIcon from '../assets/icons/edit.svg';
import TrashIcon from '../assets/icons/trash-alt.svg';
import PlayIcon from '../assets/icons/play-circle.svg';
import ClockIcon from '../assets/icons/clock.svg';

export default {
  name: 'Icon',
  props: {
    name: String,
    width: {
      type: String,
      default: () => ('1.7rem'),
    },
  },
  data() {
    return {
      links: {
        edit: EditIcon,
        trash: TrashIcon,
        play: PlayIcon,
        clock: ClockIcon,
      },
    };
  },
  computed: {
    iconName() {
      return this.links[this.name];
    },
    iconStyle() {
      return {
        height: this.width,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.svg {
  height: 1.7rem;
}
</style>
