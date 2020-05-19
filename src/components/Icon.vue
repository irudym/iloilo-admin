<template>
  <img alt="icon" :src="iconName" :style="iconStyle" @click="$emit('click')" />
</template>

<script>
import EditIcon from '../assets/icons/edit.svg';
import TrashIcon from '../assets/icons/trash-alt.svg';
import PlayIcon from '../assets/icons/play-circle.svg';
import ClockIcon from '../assets/icons/clock.svg';
import Flag from '../assets/icons/flag-checkered.svg';
import Times from '../assets/icons/times.svg';
import Check from '../assets/icons/check.svg';
import Info from '../assets/icons/info-circle.svg';
import Cog from '../assets/icons/cog.svg';
import User from '../assets/icons/user-alt.svg';
import Users from '../assets/icons/users.svg';
import ClockIconAlt from '../assets/icons/clock-alt.svg';
import ListAlt from '../assets/icons/list-alt.svg';
import Ban from '../assets/icons/ban.svg';
import Comment from '../assets/icons/comment.svg';

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
        clockAlt: ClockIconAlt,
        times: Times,
        flag: Flag,
        check: Check,
        info: Info,
        cog: Cog,
        user: User,
        users: Users,
        listAlt: ListAlt,
        ban: Ban,
        comment: Comment,
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
