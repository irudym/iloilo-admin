<template>
  <div id="admin">
    <Sidebar v-bind:items="sidemenuItems"/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'Admin',
  components: {
    Sidebar,
  },
  data() {
    return {
      message: 'Hello Admin!',
      sidemenuItems: [
        {
          id: 100,
          name: 'Тесты',
          link: '/admin/quizzes',
        },
        {
          id: 300,
          name: 'Текущие',
          link: '/admin/active_quizzes',
        },
        {
          id: 101,
          name: 'Отчеты',
          link: '/admin/reports',
        },
        {
          id: 201,
          name: 'Группы',
          link: '/admin/groups',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import './styles/layout.scss';
@import './styles/colours.scss';
@import './styles/_variables.scss';

body {
  background: $background-colour;
  font-size: 12px;
}

#admin {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main {
  margin-top: 0px;
  padding-left: 1rem;
  padding-top: 0;
  margin-left: $sidebar_width+1rem;

  margin-right: 1rem;

  @media screen and (max-width: map-get($grid-breakpoints, sm)) {
    margin-left: 0;
  }

  p {
    padding: 0;
  }

  h1 {
    letter-spacing: 0.5px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.title {
    font-weight: 500;
    font-size: 2.5rem;
    color: $title-colour;
    font-family: 'Oswald', sans-serif;
}

button {
  font-weight: 500;
  font-size: 1rem;
  border-radius: 6px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
  outline: none;
  cursor: pointer;
  border: none;
  min-width: 8rem;
}

p {
  font-size: 1rem;
}

body {
  font-size: 14px;
}


</style>
