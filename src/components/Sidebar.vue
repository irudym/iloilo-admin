<template>
  <div class="sidebar d-none d-sm-block">
    <logo width="120px" :style="{'margin-top':'3rem'}"/>
    <div class="sidebar-content">
      <ul class="side-menu">
        <router-link v-for="item in items" :key="item.id" v-bind:to="item.link">
          <li>
            {{item.name}}
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue';
import '../assets/bootstrap-grid.css';

export default {
  name: 'Sidebar',
  components: {
    Logo,
  },
  props: {
    items: {
      type: Array,
      default() { return []; },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/layout.scss';
@import '../styles/colours.scss';

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: $sidebar_width;
  overflow-x: hidden;
  overflow-y: auto;
  background: $sidebar-colour;

  .sidebar-content {
    margin-top: $topbar_height;
  }

  .side-menu {
    margin-top: 15rem;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;

    li {
      margin: 0.2rem 0;
      text-align: left;
      padding: 1rem 4rem;
      cursor: pointer;
      font-weight: 400;
      font-size: 1.1rem;
    }

    li:hover {
      //background: $sidemenu-highlight;
      border-right: 10px solid $sidemenu-highlight;
    }

    a {
      text-decoration: none;
      color: $sidemenu-colour;
      background: transparent;
    }
  }
}
</style>
