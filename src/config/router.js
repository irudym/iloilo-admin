import Vue from 'vue';
import Router from 'vue-router';
import Admin from '../Admin.vue';
import Quizzes from '../views/Quizzes.vue';
import AddQuiz from '../views/AddQuiz.vue';
import EditQuiz from '../views/EditQuiz.vue';
import ActivateQuiz from '../views/ActivateQuiz.vue';
import ActiveQuizzes from '../views/ActiveQuizzes.vue';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Reports from '../views/Reports.vue';
import Groups from '../views/Groups.vue';
import AddGroup from '../views/AddGroup.vue';
import EditGroup from '../views/EditGroup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Admin,
      redirect: '/admin/quizzes',
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'quizzes',
          name: 'quizzes',
          component: Quizzes,
        },
        {
          path: 'quizzes/add',
          name: 'add_quiz',
          component: AddQuiz,
        },
        {
          path: 'quizzes/edit/:id',
          name: 'edit_quiz',
          component: EditQuiz,
          props: true,
        },
        {
          path: 'active_quizzes/:id',
          name: 'activate_quiz',
          component: ActivateQuiz,
          props: true,
        },
        {
          path: 'active_quizzes',
          name: 'active_quizzes',
          component: ActiveQuizzes,
        },
        {
          path: 'groups',
          name: 'groups',
          component: Groups,
        },
        {
          path: 'groups/add',
          name: 'add_group',
          component: AddGroup,
        },
        {
          path: 'groups/edit/:id',
          name: 'edit_group',
          component: EditGroup,
          props: true,
        },
        {
          path: 'reports',
          name: 'reports',
          component: Reports,
        },
      ],
    },
    {
      path: '/admin/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import(/* webpackChunkName: "about" */ '../views/Contacts.vue'),
    },
    {
      path: '/admin/signup',
      name: 'registration',
      component: Registration,
    },
  ],
});
