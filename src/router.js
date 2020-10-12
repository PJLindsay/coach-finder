import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches'  },
    { path: '/coaches', component: CoachList },
    { path: '/coaches/:id', component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // coaches/c1/contact
      ]
    },
    { path: '/register', component: CoachRegistration },
    { path: '/reqests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound }, // catchAll undefined route handler
  ]
})

export default router;