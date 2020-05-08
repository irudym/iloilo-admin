<template>
  <div class="col-lg-12">
    <div class="profile-button">
      <popup-menu title="" :items="menuItems">
        <icon name="user" width="1.5rem" />
      </popup-menu>
    </div>
    <div class="title">{{title}}</div>
    <slot />
  </div>
</template>

<script>
import Icon from './Icon.vue';
import PopupMenu from './PopupMenu.vue';

export default {
  name: 'PageHeader',
  components: {
    Icon,
    PopupMenu,
  },
  data() {
    return {
      menuItems: [
        {
          id: 100,
          name: 'Профиль',
          link: '/admin/profile',
        },
        {
          id: 200,
          name: 'Выйти',
          link: '/logout',
        },
      ],
    };
  },
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/layout.scss';

.profile-button {
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 4rem;
}

</style>
